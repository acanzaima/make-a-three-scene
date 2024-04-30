/** 创建卫星环绕效果 */
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import ResourceTracker from "@/utils/resource-tracker";
import earthImg from "./img/earth.jpg?url";
import earthOutLine from "./img/earth_outline.png?url";

interface DefaultCfg {
  textData: Array<string>;
  colors: Array<string>;
  speed: number;
  radius: string;
  scaleNum: number;
  [propName: string]: any;
}

interface ConstructorCfg {
  textData: Array<string>;
  colors?: Array<string>;
  speed?: number;
  radius?: string;
  scaleNum?: number;
  // [propName: string]: any;
}

interface XYZRotation {
  x?: number;
  y?: number;
  z?: number;
}

interface PivotPointObject3D extends THREE.Object3D {
  children: [THREE.Sprite, THREE.Mesh];
}

// interface CustomMesh extends THREE.Mesh {
//   selfSpeed?: number | undefined;
//   children: Array<PivotPointObject3D>;
// }

class CustomMesh extends THREE.Mesh {
  selfSpeed?: number | undefined;
  declare children: Array<PivotPointObject3D>;
}

interface hoverColor {
  r: number;
  g: number;
  b: number;
}

class CustomGroup extends THREE.Group {
  declare children: Array<CustomMesh>;
}

class OrbitSatellitesEffect {
  sceneDom: HTMLElement;
  intersects: Array<THREE.Intersection<THREE.Sprite>>;
  raycaster: THREE.Raycaster;
  pointer: THREE.Vector2;
  hoverSprite: THREE.Sprite | null;
  hoverColor: hoverColor | null;
  hoverName: string | null;
  clickSprite: string | null;
  textData: Array<string>;
  textCount: number;
  colors: Array<string>;
  speed: number;
  radius: number;
  animationId: number | null;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  controls: OrbitControls;
  Earth: THREE.Mesh;
  EarthOut: THREE.Sprite;
  group: CustomGroup;
  satelliteTrack: ResourceTracker;
  pointerMoveCopy: any;
  meshOnclickCopy: any;

  /**
   * @param { String | Element } selector 场景挂载dom元素
   * @param { Object } config 配置
   */
  constructor(selector: string | HTMLElement, config: ConstructorCfg) {
    if (typeof selector === "string") {
      this.sceneDom =
        document.querySelector(selector) || document.createElement("div");
    } else {
      this.sceneDom = selector;
    }

    // 默认配置
    const defaultConfig: DefaultCfg = {
      textData: new Array(100).fill("默认文字"), // 文字内容
      colors: [], // 颜色池，设置此项，将随机从颜色池中抽取卫星材质颜色
      speed: 0.001, // 环绕速度基准（最小值）
      radius: "width", // 可使用width，height，具体数值，分别使用宽度/高度/设置值作为球半径
      scaleNum: 1, // 缩放值
    };

    // 传参包含配置，使用参数传递的配置
    if (config) {
      Object.keys(config).forEach((k) => {
        if (k in defaultConfig) {
          defaultConfig[k as keyof typeof defaultConfig] =
            config[k as keyof typeof config];
        }
      });
    }

    // 几何体数组 （用于存储Raycaster类获取到的几何体）
    this.intersects = [];
    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();

    // 鼠标经过卫星及颜色值
    this.hoverSprite = null;
    this.hoverName = null;

    // 鼠标点击卫星名称
    this.clickSprite = null;

    // 配置内容
    this.textData = defaultConfig.textData;
    this.textCount = defaultConfig.textData.length;
    this.colors = defaultConfig.colors;
    this.speed = defaultConfig.speed;
    if (defaultConfig.radius === "width") {
      this.radius = (this.sceneDom.clientWidth * defaultConfig.scaleNum) / 2;
    } else if (defaultConfig.radius === "height") {
      this.radius = (this.sceneDom.clientHeight * defaultConfig.scaleNum) / 2;
    } else {
      if (typeof defaultConfig.radius === "number") {
        this.radius = defaultConfig.radius;
      } else {
        this.radius = (this.sceneDom.clientHeight * defaultConfig.scaleNum) / 2;
      }
    }

    // 事件绑定实例， 用于监听和移除监听处理
    this.pointerMoveCopy = this.pointerMove.bind(this);
    this.meshOnclickCopy = this.meshOnclick.bind(this);

    // 动画id
    this.animationId = null;

    // 资源跟踪类
    this.satelliteTrack = new ResourceTracker();
  }

  // 初始化
  init() {
    const sWidth = this.sceneDom.clientWidth;
    const sheight = this.sceneDom.clientHeight;

    // 相机
    this.camera = new THREE.PerspectiveCamera(60, sWidth / sheight, 1, 1000);
    this.camera.position.z = 300;

    // 渲染器
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(sWidth, sheight);
    this.renderer.outputEncoding = THREE.sRGBEncoding;

    // 挂载
    this.sceneDom.appendChild(this.renderer.domElement);

    // 场景
    this.scene = new THREE.Scene();
    // 雾
    // this.scene.fog = new THREE.Fog( '0x000000', 400, 2100 );

    // 平行光
    const directionalLight = new THREE.DirectionalLight(0xf0ffff, 1);
    directionalLight.position.set(-250, 250, 100);
    this.scene.add(directionalLight);

    // 点光
    const pointLight = new THREE.PointLight(0xf0ffff, 1);
    pointLight.position.set(-250, 250, 100);
    this.scene.add(pointLight);

    // 半球光
    const hemisphereLight = new THREE.HemisphereLight(0x00456b, 0xf0ffff, 1);
    hemisphereLight.position.set(-250, 250, 100);
    this.scene.add(hemisphereLight);

    //环境光
    const ambient = new THREE.AmbientLight(0xf0ffff, 0.8);
    this.scene.add(ambient);

    // 轨道控制器
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.autoRotate = true;
  }

  // 创建地球, 地球外圈
  initEarth() {
    // 地球
    // 精灵
    // const EarhTexture = new THREE.TextureLoader().load(earthImg);
    // const Earth = new THREE.Sprite(new THREE.SpriteMaterial({ map: EarhTexture, color: '#2e4eea' }));
    // Earth.scale.x = Earth.scale.y = Earth.scale.z = this.radius * 1.3;
    // Earth.name = '地球';
    // Earth.position.set(0, 0, 0);
    // this.Earth = Earth;
    // this.scene.add(Earth);
    // 球体
    const EarhTexture = new THREE.TextureLoader().load(earthImg);
    const Earth = new THREE.Mesh(
      new THREE.SphereGeometry(this.radius / 2, 100, 100),
      new THREE.MeshLambertMaterial({ map: EarhTexture })
    );
    Earth.name = "地球";
    this.Earth = Earth;
    this.scene.add(Earth);

    // 地球外圈
    const ErathOutTexture = new THREE.TextureLoader().load(earthOutLine);
    const EarthOut = new THREE.Sprite(
      new THREE.SpriteMaterial({ map: ErathOutTexture })
    );
    EarthOut.scale.x = EarthOut.scale.y = EarthOut.scale.z = this.radius * 1.2;
    EarthOut.name = "地球外圈";
    EarthOut.position.set(0, 0, 0);
    this.EarthOut = EarthOut;
    this.scene.add(EarthOut);
  }

  // 创建文字实体
  initSatellites() {
    this.group = new CustomGroup();
    this.group.name = "文字实体";
    for (let i = 0; i < this.textCount; i++) {
      const resMesh = this.initSatellite(
        this.radius / 1.6,
        {
          x: -Math.PI * Math.random() * 2,
          y: Math.PI * Math.random() * 2,
          z: 0,
        },
        Math.random() * 0.005 + this.speed,
        this.textData[i]
      );
      this.group.add(resMesh);
    }
    this.scene.add(this.group);
  }

  // 生成文字卫星和轨道
  initSatellite(
    satelliteRadius: number,
    rotation: XYZRotation,
    speed: number,
    text: string
  ): CustomMesh {
    // 轨道（圆环模拟）
    const Orbit = new THREE.Mesh(
      new THREE.RingGeometry(satelliteRadius, satelliteRadius + 0.1, 100, 1),
      new THREE.MeshBasicMaterial({
        color: "#51d9ff",
        transparent: true,
        opacity: 0.3,
      })
    );
    // 球缓冲几何体
    const SphereMesh: CustomMesh = new CustomMesh(
      new THREE.SphereGeometry(1, 1, 1),
      new THREE.MeshLambertMaterial({ transparent: true, opacity: 0 })
    );
    // 文字canvas
    const TextCanva = this.initTextCanvas(text);
    // 计算颜色精灵材质颜色值
    let tmpColor;
    const colorslen = this.colors.length;
    if (colorslen > 0) {
      tmpColor = this.colors[THREE.MathUtils.randInt(0, colorslen - 1)];
    } else {
      tmpColor =
        "rgb(" +
        [
          Math.round(Math.random() * 200 + 55),
          Math.round(Math.random() * 200 + 55),
          Math.round(Math.random() * 200 + 55),
        ].join(",") +
        ")";
    }
    // 精灵材质
    const textSprite = new THREE.SpriteMaterial({
      map: new THREE.CanvasTexture(TextCanva),
      color: tmpColor,
    });
    // 创建精灵几何体
    const Satellite = new THREE.Sprite(textSprite);
    // 设置缩放，位置，名称
    Satellite.scale.x = 90;
    Satellite.scale.y = 20;
    Satellite.scale.z = 20;
    Satellite.position.set(satelliteRadius, 0, 0);
    Satellite.name = text;

    // 将轨道和精灵卫星放置于同一局部空间
    const PivotPoint = new THREE.Object3D();
    PivotPoint.add(Satellite);
    PivotPoint.add(Orbit);

    // 设置球形几何体
    SphereMesh.add(PivotPoint);
    SphereMesh.rotation.set(
      rotation?.x || 0,
      rotation?.y || 0,
      rotation?.z || 0
    );
    SphereMesh.name = text;
    SphereMesh.selfSpeed = speed;

    return SphereMesh;
  }

  // 生成文字精灵实体
  initTextCanvas(text: string): HTMLCanvasElement {
    // 通过canvas生成图片，作为精灵材质贴图
    const canvas = document.createElement("canvas");
    canvas.width = 450;
    canvas.height = 100;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.fillStyle = "#fff";
    const tmpText = text;
    const ctxText =
      tmpText.length > 13 ? tmpText.slice(0, 13) + "..." : tmpText;
    const textSize = Math.floor(Math.random() * 20) + 30;
    ctx.font = `700 ${textSize}px sans-serif`;
    ctx.fillText(ctxText, 10, 50);
    return canvas;
  }

  // 鼠标点移动函数
  pointerMove(event: THREE.Event) {
    const sceneDomPos = this.sceneDom.getBoundingClientRect();
    this.pointer.x =
      ((event.clientX - sceneDomPos.left) / this.sceneDom.offsetWidth) * 2 - 1;
    this.pointer.y =
      -((event.clientY - sceneDomPos.top) / this.sceneDom.offsetHeight) * 2 + 1;
    this.raycaster.setFromCamera(this.pointer, this.camera);
    if (this.scene.children && Array.isArray(this.scene.children)) {
      const target = this.scene.children.find(
        (item) => item.name === "文字实体"
      );
      this.intersects = this.raycaster.intersectObjects(
        target ? target?.children : []
      );
    }
  }

  // 点击事件
  meshOnclick() {
    if (this.intersects[0]) {
      this.clickSprite = this.intersects[0].object.name;
      // 通过自定义事件触发暴露点击的卫星名称
      this.sceneDom.dispatchEvent(
        new CustomEvent("satellite", {
          detail: { spriteName: this.clickSprite },
        })
      );
    }
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
    this.sceneDom.addEventListener("pointermove", this.pointerMoveCopy);
    this.sceneDom.addEventListener("click", this.meshOnclickCopy);
  }

  // 移除监听器
  removeListeners() {
    this.sceneDom.addEventListener("pointermove", this.pointerMoveCopy);
    this.sceneDom.removeEventListener("click", this.meshOnclickCopy);
  }

  // 动画
  animate() {
    this.animationId = requestAnimationFrame(this.animate.bind(this));
    this.render();
  }

  // 渲染
  render() {
    this.renderer.clear();
    this.renderer.render(this.scene, this.camera);

    // 地球外圈光晕旋转
    this.EarthOut.material.rotation += 0.01;

    // 记录鼠标悬浮精灵对象
    // 悬浮对象变更时将颜色还原
    if (this.intersects.length > 0) {
      if (this.hoverSprite) {
        this.hoverSprite.material.color = new THREE.Color(
          this.hoverColor?.r || 0,
          this.hoverColor?.g || 0,
          this.hoverColor?.b || 0
        );
      }
      this.hoverSprite = this.intersects[0].object;
      const tmpColor = this.intersects[0].object.material.color;
      this.hoverColor = {
        r: tmpColor.r,
        g: tmpColor.g,
        b: tmpColor.b,
      };
    } else {
      if (this.hoverSprite) {
        this.hoverSprite.material.color = new THREE.Color(
          this.hoverColor?.r || 0,
          this.hoverColor?.g || 0,
          this.hoverColor?.b || 0
        );
      }
      this.hoverSprite = null;
      this.hoverColor = null;
      // 控制器更新
      this.controls.update();
    }

    // 文字环绕
    this.group.children.forEach((sate) => {
      // 鼠标悬浮精灵颜色设置为白色
      if (
        this.hoverSprite &&
        this.hoverSprite.uuid === sate.children[0].children[0].uuid
      ) {
        sate.children[0].children[0].material.color = new THREE.Color(1, 1, 1);
      } else {
        sate.rotation.z -= sate.selfSpeed || 0.01;
      }
    });
  }

  // 执行
  run() {
    this.init();
    this.initEarth();
    this.initSatellites();
    this.satelliteTrack.track(this.camera);
    this.satelliteTrack.track(this.renderer);
    this.satelliteTrack.track(this.scene);
    this.satelliteTrack.track(this.controls);
    this.addListeners();
    this.animate();
  }

  // 停止
  stop() {
    this.removeListeners();
    this.satelliteTrack.dispose();
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

export default OrbitSatellitesEffect;
