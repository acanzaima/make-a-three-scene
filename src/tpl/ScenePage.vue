<template>
  <SceneContainer v-slot="{ theme }">
    <div class="scene-wrapper" :class="theme"></div>
  </SceneContainer>
</template>

<script setup lang="ts">
import SceneContainer from "@/components/scenes/SceneContainer.vue";
import { watch } from "vue";

// 菜单折叠
const sceneProps = defineProps<{
  foldChange: boolean;
}>();

// 监听菜单折叠
watch(
  () => sceneProps.foldChange,
  () => {
    // TODO
  }
);
</script>

<style lang="less" scoped>
.scene-wrapper {
  width: 100%;
  height: 100%;
  &.light {
    background: radial-gradient(circle, #729ecc 0%, #00456b 60%);
  }
}
</style>
