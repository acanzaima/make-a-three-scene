<script setup lang="ts">
import HeaderArea from "./components/HeaderArea.vue";
import { toRef } from "vue";
import { useThemeStore } from "@/stores/modules/theme";

// 主题
const useTheme = toRef(useThemeStore(), "theme");
</script>
<template lang="">
  <div id="make-a-three-scene" :class="useTheme">
    <HeaderArea />
    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in" appear>
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>
<style lang="less" scoped>
#make-a-three-scene {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

#make-a-three-scene.light {
  background: linear-gradient(0deg, #42d39277, transparent);
}

#make-a-three-scene main {
  width: 100%;
  height: calc(100% - var(--header-nav-height));
  overflow: hidden;
}
</style>
