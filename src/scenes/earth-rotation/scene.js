/** 创建卫星环绕效果 */

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import ResourceTracker from "@/utils/resource-tracker";
import earthImg from "./img/earth3.jpg";
import earthOutAureole from "./img/halo.png";

class RotationEffect {
  /**
   * @param { String | Element } selector 场景挂载dom元素
   * @param { Object } config 配置
   */
  constructor(selector, config) {
    if (typeof selector === "string") {
      this.sceneDom = document.querySelector(selector);
    } else {
      this.sceneDom = selector;
    }

    // 默认配置
    const defaultConfig = {
      satelliteData: new Array(5).fill({
        name: "默认内容",
        count: 100,
        funding: 200,
      }), // 文字内容
      colors: ["#ff7920", "#ffc50f", "#02ebe9"], // 颜色池，设置此项，将随机从颜色池中抽取卫星材质颜色
      speed: 0.001, // 环绕速度基准（最小值）
      radius: "width", // 可使用width，height，具体数值，分别使用宽度/高度/设置值作为球半径
      scaleNum: 1, // 缩放值
    };

    // 传参包含配置，使用参数传递的配置
    if (config) {
      Object.keys(config).forEach((k) => {
        if (k in defaultConfig) {
          defaultConfig[k] = config[k];
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
    this.satelliteData = defaultConfig.satelliteData;
    this.satelliteCount = defaultConfig.satelliteData.length;
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
    this.meshMouseDownCopy = this.meshMouceDown.bind(this);
    this.meshMouseUpCopy = this.meshMouceUp.bind(this);
    this.onWindowResizeCopy = this.onWindowResize.bind(this);

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
    this.camera = new THREE.PerspectiveCamera(60, sWidth / sheight, 1, 2000);
    this.camera.position.z = this.radius * 1.3;

    // 渲染器
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(sWidth, sheight);
    this.renderer.outputEncoding = THREE.sRGBEncoding;

    // 挂载
    this.sceneDom.appendChild(this.renderer.domElement);

    // 场景
    this.scene = new THREE.Scene();

    // 太阳光源
    const sunLight = new THREE.DirectionalLight(0xffffff, 7);
    sunLight.position.set(this.radius * 5, this.radius * 2, this.radius);
    const lightGroup = new THREE.Group();
    lightGroup.add(sunLight);
    this.lightGroup = lightGroup;
    this.scene.add(lightGroup);

    //环境光
    const ambient = new THREE.AmbientLight(0x87ceeb, 0.7);
    this.scene.add(ambient);

    // 轨道控制器
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
  }

  // 创建地球, 地球外圈
  initEarth() {
    this.mainGroup = new THREE.Group(); // 主要组 存储地球和卫星
    this.mainGroup.name = "地球和卫星"; // 主要组 存储地球和卫星
    // 地球 球体
    const EarhTexture = new THREE.TextureLoader().load(earthImg);
    const Earth = new THREE.Mesh(
      new THREE.SphereGeometry(this.radius / 2, 100, 100),
      new THREE.MeshLambertMaterial({ map: EarhTexture })
    );
    Earth.name = "地球";
    this.Earth = Earth;
    this.mainGroup.add(Earth);

    // 地球光晕
    const earthAureoleTexture = new THREE.TextureLoader().load(earthOutAureole);
    const EarthAureole = new THREE.Sprite(
      new THREE.SpriteMaterial({ map: earthAureoleTexture })
    );
    EarthAureole.scale.x =
      EarthAureole.scale.y =
      EarthAureole.scale.z =
        this.radius * 1.3;
    EarthAureole.name = "地球光晕";
    this.EarthAureole = EarthAureole;
    this.scene.add(EarthAureole);
  }

  // 创建卫星实体
  initSatellites() {
    this.rotaionMap = {};
    this.satelliteGroup = new THREE.Group();
    this.satelliteGroup.name = "卫星实体";
    for (let i = 0; i < this.satelliteCount; i++) {
      const { resX, resY } = this.getRotationPos();
      const resMesh = this.initSatellite(
        this.radius / 1.6,
        { x: resX, y: resY, z: 0 },
        Math.random() * 0.005 + this.speed,
        this.satelliteData[i]
      );
      this.satelliteGroup.add(resMesh);
    }
    this.mainGroup.add(this.satelliteGroup);

    this.scene.add(this.mainGroup);
  }

  // 获取旋转位置，尽量避免重叠
  getRotationPos() {
    let resX, resY;
    for (let i = 0; i < 100; i++) {
      let tmpX = Number((-Math.PI * Math.random() * 2).toFixed(2));
      let tmpY = Number((Math.PI * Math.random() * 2).toFixed(2));
      resX = tmpX;
      resY = tmpY;
      let tmpComb = String(tmpX) + "&" + String(tmpY);

      // 该位置已经存在时，下一次循环
      if (tmpComb in this.rotaionMap) {
        continue;
      }

      // 当前随机位置是否有效（距离太近认为不生效）
      let tmpFlag = true;
      for (const k in this.rotaionMap) {
        if (
          Math.abs(this.rotaionMap[k][0] - tmpX) < 0.5 &&
          Math.abs(this.rotaionMap[k][1] - tmpY) < 0.5
        ) {
          tmpFlag = false;
          break;
        }
      }
      if (tmpFlag) {
        this.rotaionMap[tmpComb] = [tmpX, tmpY];
        break;
      }
    }
    return { resX, resY };
  }

  // 生成卡片
  initSatellite(satelliteRadius, rotation, speed, moon) {
    // 球缓冲几何体
    const SphereMesh = new THREE.Mesh(
      new THREE.SphereGeometry(1, 1, 1),
      new THREE.MeshLambertMaterial({ transparent: true, opacity: 0 })
    );
    // 文字canvas
    const TextCanva = this.initDomCanvas(moon);
    // 精灵材质
    const textSprite = new THREE.SpriteMaterial({
      map: new THREE.CanvasTexture(TextCanva),
      // color: tmpColor,
    });
    // 创建精灵几何体
    const Satellite = new THREE.Sprite(textSprite);
    // 设置缩放，位置，名称
    Satellite.scale.x = TextCanva.width / 2;
    Satellite.scale.y = TextCanva.height / 2;
    Satellite.scale.z = TextCanva.height / 2;
    Satellite.position.set(satelliteRadius, 0, 0);
    Satellite.name = moon.name;

    // 将轨道和精灵卫星放置于同一局部空间
    const PivotPoint = new THREE.Object3D();
    PivotPoint.add(Satellite);
    // PivotPoint.add(Orbit);

    // 设置球形几何体
    SphereMesh.add(PivotPoint);
    SphereMesh.rotation.set(rotation.x, rotation.y, rotation.z);
    SphereMesh.name = moon.name;
    SphereMesh.selfSpeed = speed;

    return SphereMesh;
  }

  // 生成精灵实体
  initDomCanvas(item) {
    // 通过canvas生成图片，作为精灵材质贴图
    const canvas = document.createElement("canvas");
    // 字体设置
    const fontSize = this.calcCurFontSize();
    const padding = 10;
    const borderWidth = 2;
    const maxFontNum = 12; //一行最多显示的文字
    const contentWidth = fontSize * maxFontNum;

    canvas.width = contentWidth + 2 * padding + 2 * borderWidth;
    canvas.height = fontSize * 4 + 2 * padding + 2 * borderWidth;
    const ctx = canvas.getContext("2d");

    // 配置信息
    const borderColor = "rgba(71, 166, 255, 0.7)";
    const backgroundColor = "rgba(15, 106, 217, 0.2)";
    const titleColor = "#c8daff";
    const infoColor = "#00d4ff";

    // 绘制背景和边框
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = borderColor;
    ctx.strokeRect(
      borderWidth,
      borderWidth,
      canvas.width - borderWidth * 2,
      canvas.height - borderWidth * 2
    );

    // 字体
    ctx.font = `normal ${fontSize}px YouSheBiaoTiHei`;

    // 单位名称
    let titleLine = "";
    for (let s of item.name) {
      titleLine += s;
      if (ctx.measureText(titleLine).width > contentWidth) {
        titleLine = titleLine.slice(0, titleLine.length - 3) + "...";
        break;
      }
    }
    ctx.fillStyle = titleColor;
    ctx.fillText(titleLine, padding, fontSize + padding);

    // 数量
    ctx.fillStyle = infoColor;
    let countLine = "";
    let countWidth = contentWidth - 5 * fontSize - 2 * padding;
    for (let s of String(item.count)) {
      countLine += s;
      if (ctx.measureText(countLine).width > countWidth) {
        countLine = countLine.slice(0, countLine.length - 3) + "...";
        break;
      }
    }
    ctx.fillText("数量", padding, 2 * fontSize + 2 * padding);
    ctx.fillText(
      countLine,
      5 * fontSize + 2 * padding,
      2 * fontSize + 2 * padding
    );

    // 金额
    let fundLine = "";
    let fundWidth = contentWidth - 5 * fontSize - 2 * padding;
    for (let s of String(item.funding)) {
      fundLine += s;
      if (ctx.measureText(fundLine).width > fundWidth) {
        fundLine = fundLine.slice(0, fundLine.length - 3) + "...";
        break;
      }
    }
    ctx.fillText("金额（万）", padding, 3 * fontSize + 3 * padding);
    ctx.fillText(
      fundLine,
      5 * fontSize + 2 * padding,
      3 * fontSize + 3 * padding
    );
    return canvas;
  }

  // 应用字体大小计算
  calcCurFontSize() {
    let clientWidth = window.innerWidth;
    if (clientWidth >= 3840) {
      return 40;
    } else if (clientWidth >= 2560) {
      return 30;
    } else if (clientWidth >= 1920) {
      return 26;
    } else if (clientWidth >= 1600) {
      return 20;
    } else if (clientWidth >= 1280) {
      return 18;
    } else {
      return 16;
    }
  }

  // 重新渲染环绕实体
  reRenderSatellites(data) {
    if (this.satelliteGroup) {
      this.satelliteData = data;
      this.satelliteCount = data.length;
      // 清除资源
      this.satelliteGroup.clear();
      this.mainGroup.remove(this.satelliteGroup);
      this.initSatellites();
      this.render();
    }
  }

  // 鼠标点移动函数
  pointerMove(event) {
    const sceneDomPos = this.sceneDom.getBoundingClientRect();
    this.pointer.x =
      ((event.clientX - sceneDomPos.left) / this.sceneDom.offsetWidth) * 2 - 1;
    this.pointer.y =
      -((event.clientY - sceneDomPos.top) / this.sceneDom.offsetHeight) * 2 + 1;
    this.raycaster.setFromCamera(this.pointer, this.camera);
    if (this.scene.children && Array.isArray(this.scene.children)) {
      const targetGroup = this.scene.children.find(
        (item) => item.name === "地球和卫星"
      );
      const target = targetGroup
        ? targetGroup.children.find((item) => item.name === "卫星实体")
        : undefined;

      this.intersects = this.raycaster.intersectObjects(
        target ? target.children : []
      );
    }
  }

  // 点击事件
  meshOnclick() {
    if (this.UpEndTime - this.downStartTime > 150) return;
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

  meshMouceDown() {
    this.downStartTime = Date.now();
  }

  meshMouceUp() {
    this.UpEndTime = Date.now();
  }

  onWindowResize() {
    const sWidth = this.sceneDom.clientWidth;
    const sheight = this.sceneDom.clientHeight;
    this.camera.aspect = sWidth / sheight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(sWidth, sheight);
    this.render();
  }

  // 监听器
  addListeners() {
    this.sceneDom.addEventListener("pointermove", this.pointerMoveCopy);
    this.sceneDom.addEventListener("click", this.meshOnclickCopy);
    this.sceneDom.addEventListener("mousedown", this.meshMouseDownCopy);
    this.sceneDom.addEventListener("mouseup", this.meshMouseUpCopy);
    window.addEventListener("resize", this.onWindowResizeCopy, false);
  }

  // 移除监听器
  removeListeners() {
    this.sceneDom.addEventListener("pointermove", this.pointerMoveCopy);
    this.sceneDom.removeEventListener("click", this.meshOnclickCopy);
    this.sceneDom.removeEventListener("mousedown", this.meshMouseDownCopy);
    this.sceneDom.removeEventListener("mouseup", this.meshMouseUpCopy);
    this.sceneDom.removeEventListener("resize", this.onWindowResizeCopy);
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

    if (this.intersects.length > 0) {
      this.hoverSprite = this.intersects[0].object;
    } else {
      // 地球旋转
      this.mainGroup.rotation.y += 0.003;
      this.controls.update();
      this.lightGroup.quaternion.copy(this.camera.quaternion);
    }
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
    cancelAnimationFrame(this.animationId);
  }
}

export default RotationEffect;
