<template>
  <SceneContainer v-slot="{ theme }">
    <div class="wave-wrapper" :class="theme" @satellite="getSelectName"></div>
  </SceneContainer>
</template>

<script setup>
import SceneContainer from "@/components/scenes/SceneContainer.vue";
import { watch, onMounted, onUnmounted } from "vue";
import WavesEffect from "./scene";

// 菜单折叠
const sceneProps = defineProps({
  foldChange: {
    type: Boolean,
  },
});

let waveScene = {};
onMounted(() => {
  waveScene = new WavesEffect(".wave-wrapper");
  waveScene.run();
});

onUnmounted(() => {
  waveScene.stop();
});

// 监听菜单折叠、展开重新运行
watch(
  () => sceneProps.foldChange,
  () => {
    setTimeout(() => {
      waveScene.resize();
    }, 350);
  }
);
</script>

<style lang="less" scoped>
.wave-wrapper {
  width: 100%;
  height: 100%;
  &.light {
    background: linear-gradient(#13194b 0%, #164687 50%, #13194b 100%);
  }
}
</style>
