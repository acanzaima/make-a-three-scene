<script setup lang="ts">
import { watch, onMounted } from "vue";
import { useDark, useToggle } from "@vueuse/core";
import { useThemeStore } from "@/stores/modules/theme";
import { GithubOutlined } from "@ant-design/icons-vue";

// 主题切换
const isDark = useDark({
  selector: "body",
  storageKey: "make-a-three-scene",
  valueDark: "dark",
  valueLight: "light",
});
const toggleDark = useToggle(isDark);
// 更新主题
const themeStore = useThemeStore();

onMounted(() => {
  themeStore.setCurTheme(isDark.value ? "dark" : "light");
});

watch(isDark, (val) => {
  const theme = val ? "dark" : "light";
  themeStore.setCurTheme(theme);
});
</script>

<template>
  <header class="nav-bar">
    <div class="nav-container">
      <h1
        class="nav-title"
        @click.stop="$router.push('/home')"
        title="可直接复用的three.js业务场景收藏夹"
      >
        <em>Make A Three Scene</em>
      </h1>
      <div class="nav-content">
        <label class="theme-switch" title="切换主题">
          <input type="checkbox" v-model="isDark" @click.stop="toggleDark()" />
          <span class="slider"></span>
        </label>
        <a
          class="external-link three-js"
          title="Three.js"
          href="https://threejs.org/"
          target="_blank"
        >
          <img src="../../assets/images/three.ico" alt="three.js" />
        </a>
        <a
          class="external-link github"
          title="GitHub"
          href="https://gitee.com/space-earth/make-a-three-scene"
          target="_blank"
        >
          <GithubOutlined />
        </a>
      </div>
    </div>
  </header>
</template>

<style lang="less" scoped>
.nav-bar {
  width: 100%;
  height: var(--header-nav-height);
  color: var(--color-text);
  padding: 0 30px;
  border-bottom: 1px solid var(--color-border);
  cursor: default;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 0 auto;
}

.nav-title {
  font-size: 20px;
  cursor: pointer;
}

.nav-content {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.theme-switch {
  --width-of-switch: 47px;
  --height-of-switch: 25px;
  --size-of-icon: 18px;
  --slider-offset: 5px;
  position: relative;
  display: inline-block;
  width: var(--width-of-switch);
  height: var(--height-of-switch);
  margin-right: 10px;
  > input {
    opacity: 0;
    width: 0;
    height: 0;
    &:checked + .slider {
      background-color: #303136;
    }
    &:checked + .slider:before {
      left: calc(100% - (var(--size-of-icon) + var(--slider-offset)));
      background: #303136;
      box-shadow: inset -3px -2px 5px -2px #8983f7, inset -10px -4px 0 0 #a3dafb;
    }
  }
  > .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f4f4f5;
    transition: 0.4s;
    border-radius: 30px;
    &:before {
      position: absolute;
      content: "";
      height: var(--size-of-icon, 1.4em);
      width: var(--size-of-icon, 1.4em);
      border-radius: 20px;
      left: var(--slider-offset, 0.3em);
      top: 50%;
      transform: translateY(-50%);
      background: linear-gradient(40deg, #ff0080, #ff8c00 70%);
      transition: 0.4s;
    }
  }
}

.external-link {
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: auto;
    height: 75%;
  }
  :deep(.anticon.anticon-github) {
    font-size: 25px;
  }
}

// 针对three.js图标单独处理
.external-link.three-js img {
  transition: all 0.3s;
  &:hover {
    filter: invert(0.3) hue-rotate(0.5turn) !important;
  }
}

@media (prefers-color-scheme: dark) {
  .external-link.three-js img {
    filter: invert(0.8) hue-rotate(0.5turn) !important;
    transition: all 0.3s;
    &:hover {
      filter: invert(1) hue-rotate(0.5turn) !important;
    }
  }
}
</style>
