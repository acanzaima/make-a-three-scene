import * as THREE from "three";

class WavesEffect {
  /**
   * @description 波浪特效
   * @param {String|Element} selector 特效需要添加到的容器
   */
  constructor(selector, amountX, amountY, color, top) {
    if (typeof selector === "string") {
      this.sceneDom = document.querySelector(selector);
    } else {
      this.sceneDom = selector;
    }
    this.amountX = amountX || 50;
    this.amountY = amountY || 50;
    this.color = color || "#00bfff";
    this.top = top || 350;
    this.count = 0;
    // 用来跟踪鼠标水平位置
    this.mouseX = 0;
    this.windowHalfX = window.innerWidth / 2;
    // 相机
    this.camera = null;
    // 场景
    this.scene = null;
    // 批量管理粒子
    this.particles = null;
    // 渲染器
    this.renderer = null;
    // 是否已经初始化
    this.isInit = false;
  }
  // 初始化
  init() {
    const SEPARATION = 100;
    const SCREEN_WIDTH = window.innerWidth;
    const SCREEN_HEIGHT = window.innerHeight;
    const container = document.createElement("div");
    container.style.position = "relative";
    container.style.top = `${this.top}px`;
    container.style.height = `${SCREEN_HEIGHT - this.top}px`;
    this.sceneDom.appendChild(container);

    this.camera = new THREE.PerspectiveCamera(
      60,
      SCREEN_WIDTH / SCREEN_HEIGHT,
      1,
      10000
    );

    this.camera.position.z = 1000;
    this.scene = new THREE.Scene();

    const numParticles = this.amountX * this.amountY;
    const positions = new Float32Array(numParticles * 3);
    const scales = new Float32Array(numParticles);
    // 初始化粒子位置和大小
    let i = 0;
    let j = 0;
    for (let ix = 0; ix < this.amountX; ix++) {
      for (let iy = 0; iy < this.amountY; iy++) {
        positions[i] = ix * SEPARATION - (this.amountX * SEPARATION) / 2;
        positions[i + 1] = 0;
        positions[i + 2] = iy * SEPARATION - (this.amountY * SEPARATION) / 2;
        scales[j] = 1;
        i += 3;
        j++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1));
    // 初始化粒子材质
    const material = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(this.color) },
      },
      vertexShader: `
        attribute float scale;
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4( position, 2.0 );
          gl_PointSize = scale * ( 370.0 / - mvPosition.z );
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        void main() {
          if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;
          gl_FragColor = vec4( color, 1.0 );
        }
      `,
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearAlpha(0);
    container.appendChild(this.renderer.domElement);

    // 处理监听和移除thi指向问题
    this.onWindowResizeCopy = this.onWindowResize.bind(this);
    this.onDocumentMouseMoveCopy = this.onDocumentMouseMove.bind(this);
    this.onDocumentTouchStartCopy = this.onDocumentTouchStart.bind(this);
    this.onDocumentTouchMoveCopy = this.onDocumentTouchMove.bind(this);
    this.addListeners();
  }
  // 渲染
  render() {
    this.camera.position.x += (this.mouseX - this.camera.position.x) * 0.05;
    this.camera.position.y = 400;
    this.camera.lookAt(this.scene.position);
    const positions = this.particles.geometry.attributes.position.array;
    const scales = this.particles.geometry.attributes.scale.array;
    // 计算粒子位置及大小
    let i = 0;
    let j = 0;
    for (let ix = 0; ix < this.amountX; ix++) {
      for (let iy = 0; iy < this.amountY; iy++) {
        positions[i + 1] =
          Math.sin((ix + this.count) * 0.3) * 100 +
          Math.sin((iy + this.count) * 0.5) * 100;
        scales[j] =
          (Math.sin((ix + this.count) * 0.3) + 1) * 8 +
          (Math.sin((iy + this.count) * 0.5) + 1) * 8;
        i += 3;
        j++;
      }
    }
    // 重新渲染粒子
    this.particles.geometry.attributes.position.needsUpdate = true;
    this.particles.geometry.attributes.scale.needsUpdate = true;
    this.renderer.render(this.scene, this.camera);
    this.count += 0.1;
  }

  // 容器大小变化时更新尺寸
  resize() {
    // 修改相机的参数，宽高比
    this.camera.aspect = this.sceneDom.clientWidth / this.sceneDom.clientHeight;
    // 更新投影的变换矩阵
    this.camera.updateProjectionMatrix();
    // 重新设置渲染器尺寸
    this.renderer.setSize(
      this.sceneDom.clientWidth,
      this.sceneDom.clientHeight
    );
  }

  // 监听器
  addListeners() {
    window.addEventListener("resize", this.onWindowResizeCopy, {
      passive: false,
    });
    document.addEventListener("mousemove", this.onDocumentMouseMoveCopy, {
      passive: false,
    });
    document.addEventListener("touchstart", this.onDocumentTouchStartCopy, {
      passive: false,
    });
    document.addEventListener("touchmove", this.onDocumentTouchMoveCopy, {
      passive: false,
    });
  }
  // 移除监听器
  removeListeners() {
    window.removeEventListener("resize", this.onWindowResizeCopy, {
      passive: false,
    });
    document.removeEventListener("mousemove", this.onDocumentMouseMoveCopy, {
      passive: false,
    });
    document.removeEventListener("touchstart", this.onDocumentTouchStartCopy, {
      passive: false,
    });
    document.removeEventListener("touchmove", this.onDocumentTouchMoveCopy, {
      passive: false,
    });
  }
  // 文档鼠标移动
  onDocumentMouseMove(event) {
    this.mouseX = event.clientX - this.windowHalfX;
  }
  // 移动端适配
  onDocumentTouchStart(event) {
    if (event.touches.length === 1) {
      this.mouseX = event.touches[0].pageX - this.windowHalfX;
    }
  }
  // 移动端适配
  onDocumentTouchMove(event) {
    if (event.touches.length === 1) {
      event.preventDefault();
      this.mouseX = event.touches[0].pageX - this.windowHalfX;
    }
  }
  // 窗口尺寸变化
  onWindowResize() {
    this.windowHalfX = window.innerWidth / 2;
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
  // 运行
  run() {
    if (!this.isInit) {
      this.init();
      this.isInit = true;
    }
    this.intervalFrameId = requestAnimationFrame(this.run.bind(this));
    this.render();
  }
  // 停止
  stop() {
    this.removeListeners();
    cancelAnimationFrame(this.intervalFrameId);
  }
}

export default WavesEffect;
