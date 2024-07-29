<template>
  <SceneContainer v-slot="{ theme }">
    <div class="rotation-wrapper" :class="theme"></div>
  </SceneContainer>
</template>

<script setup>
import SceneContainer from "@/components/scenes/SceneContainer.vue";
import { watch, onMounted, onUnmounted } from "vue";
import RotationEffect from "./scene";

// 菜单折叠
const sceneProps = defineProps({
  foldChange: {
    type: Boolean,
  },
});

let rotationScene = {};
onMounted(() => {
  rotationScene = new RotationEffect(".rotation-wrapper");
  rotationScene.run();
});

onUnmounted(() => {
  rotationScene.stop();
});

// 监听菜单折叠
watch(
  () => sceneProps.foldChange,
  () => {
    // TODO
    setTimeout(() => {
      rotationScene.onWindowResize();
    }, 350);
  }
);
</script>

<style lang="less" scoped>
.rotation-wrapper {
  width: 100%;
  height: 100%;
  &.light {
    background: radial-gradient(circle, #729ecc 0%, #00456b 60%);
  }
}
</style>
