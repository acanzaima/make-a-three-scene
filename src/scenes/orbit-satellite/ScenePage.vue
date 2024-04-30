<template>
  <SceneContainer v-slot="{ theme }">
    <div class="oribit-wrapper" :class="theme" @satellite="getSelectName"></div>
  </SceneContainer>
</template>

<script setup lang="ts">
import SceneContainer from "@/components/scenes/SceneContainer.vue";
import { watch, onMounted, onUnmounted } from "vue";
import OrbitSatellitesEffect from "./scene";

// 卫星触发事件类型
interface SatelliteEvent extends Event {
  detail: {
    spriteName: string;
  };
}

// 菜单折叠
const sceneProps = defineProps<{
  foldChange: boolean;
}>();

const keywords = [
  "HTML5",
  "CSS3",
  "Less",
  "Sass",
  "JavaScript",
  "TypeScript",
  "Node.js",
  "npm",
  "yarn",
  "Nuxt.js",
  "next.js",
  "Express",
  "Lodash",
  "Vue 3",
  "Vue 2",
  "React",
  "Angular",
  "Svelte",
  "Threejs",
  "ECharts",
  "AntV",
  "Element Plus",
  "Ant Design",
  "Vant",
  "ESlint",
  "VSCode",
  "webpack",
  "Babel",
  "Vite",
  "Rollup",
  "Python",
  "Taichi",
  "PyCharm",
  "Java",
  "IntelliJ IDEA",
  "Web 3D",
  "qiankun",
  "WuJie",
  "微前端",
  "大前端",
  "小程序",
  "现代 JavaScript 教程",
  "CSS SECRETS",
];

// 场景实例
let orbitScene: OrbitSatellitesEffect;
// 挂载渲染
onMounted(() => {
  orbitScene = new OrbitSatellitesEffect(".oribit-wrapper", {
    textData: keywords,
    radius: "height",
    scaleNum: 0.5,
  });
  orbitScene.run();
});
// 卸载
onUnmounted(() => {
  orbitScene.stop();
});

function getSelectName(event: SatelliteEvent) {
  console.log(event.detail.spriteName);
}

// 监听菜单折叠、展开重新运行
watch(
  () => sceneProps.foldChange,
  () => {
    setTimeout(() => {
      orbitScene.resize();
    }, 350);
  }
);
</script>

<style lang="less" scoped>
.oribit-wrapper {
  width: 100%;
  height: 100%;
  &.light {
    background: radial-gradient(circle, #729ecc 0%, #00456b 60%);
  }
}
</style>
