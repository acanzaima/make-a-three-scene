<script setup lang="ts">
import { ref, shallowRef, watch, defineAsyncComponent } from "vue";
import {
  CloseCircleOutlined,
  DoubleRightOutlined,
  DoubleLeftOutlined,
} from "@ant-design/icons-vue";
import type { Ref } from "vue";
import type sceneInfo from "@/types/scene-info.d";
import menusJson from "@/scripts/menus";

// 预览图片
const previewModules = import.meta.glob(
  "../../scenes/**/*.{png, svg, jpg, jpeg, gif, webp}",
  { eager: true }
);

// 转换JSON
const SCENE_MENUS = menusJson.map((i) => JSON.parse(i));

/** @功能 菜单区域 */
// 菜单数组
const tplMenus: Ref<Array<sceneInfo>> = ref([]);
// 搜索场景
const keyword: Ref<string> = ref("");

// 搜索框无内容时直接赋值
watch(
  keyword,
  (val) => {
    if (!val) {
      tplMenus.value = SCENE_MENUS;
    }
  },
  { immediate: true }
);

// 搜索菜单项
function executeSearch() {
  tplMenus.value = SCENE_MENUS.filter((row: sceneInfo) =>
    row.name.includes(keyword.value)
  );
}

// 折叠菜单栏
const menusFold: Ref<boolean> = ref(false);

// 默认激活菜单第一项
const activeExample: Ref<sceneInfo> = ref(SCENE_MENUS[0]);
const activeComponent = shallowRef();
activeComponent.value = defineAsyncComponent(
  () => import(`../../scenes/${activeExample.value.value}/ScenePage.vue`)
);

interface eagerModule {
  default: string;
}

// 获取预览图片
function getPreviewImg(menu: sceneInfo) {
  const imgUrl = `../../scenes/${menu.value}/${menu.img}`;
  if (previewModules[imgUrl]) {
    return (previewModules[imgUrl] as eagerModule).default;
  }
}

/**
 * 切换场景
 * @param menu 菜单项
 */
function changeActive(menu: sceneInfo): void {
  activeExample.value = menu;
  activeComponent.value = defineAsyncComponent(
    () => import(`../../scenes/${menu.value}/ScenePage.vue`)
  );
}
</script>

<template>
  <div class="scene-example">
    <div class="example-menus" :class="{ fold: menusFold }">
      <div class="menus-wrapper">
        <div class="input-wrapper">
          <input
            v-model="keyword"
            @keydown.enter="executeSearch"
            type="text"
            maxlength="30"
            class="glass-input"
            placeholder="Type here!"
          />
          <close-circle-outlined
            @click="keyword = ''"
            class="glass-input-close"
            v-show="keyword"
          />
        </div>
        <ul class="menu-content">
          <li
            class="menu-item"
            :class="{ 'is-active': menu.value === activeExample.value }"
            v-for="menu in tplMenus"
            :key="menu.value"
            @click.stop="changeActive(menu)"
          >
            <div class="menu-item-img">
              <img
                :src="getPreviewImg(menu)"
                :alt="menu.desc"
                :title="menu.desc"
              />
            </div>
            <p class="menu-item-name">{{ menu.name }}</p>
          </li>
        </ul>
      </div>
      <div class="toggle-menu" @click.stop="menusFold = !menusFold">
        <double-right-outlined v-if="menusFold" />
        <double-left-outlined v-else />
      </div>
    </div>
    <div class="example-wrapper">
      <transition name="fade" mode="out-in" appear>
        <component :is="activeComponent" :fold-change="menusFold"></component>
      </transition>
    </div>
  </div>
</template>

<style lang="less" scoped>
.scene-example {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
}

.example-menus {
  position: relative;
  width: 315px;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  justify-content: space-between;
  transition: width 0.3s;
}

.example-menus.fold {
  width: 25px;
}

.example-menus.fold .menus-wrapper {
  width: 0;
  border: none;
  opacity: 0;
}

.menus-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--color-border);
  transition: opacity 0.3s;
  opacity: 1;
}

.input-wrapper {
  width: 100%;
  height: 60px;
  padding: 10px;
  border-bottom: 1px solid var(--color-border);
}

.glass-input {
  width: 100%;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  color: var(--color-text);
  background-color: var(--color-background-mute);
  font-size: medium;
  font-weight: bold;
  &:focus {
    outline: none;
  }
}

.glass-input-close {
  color: var(--color-text);
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: var(--color-text-hover);
  }
}

.menu-content {
  flex: 1;
  overflow: hidden;
  overflow-y: auto;
  padding: 10px !important;
}

.menu-item {
  width: 100%;
  height: 200px;
  max-height: 200px;
  border: 1px solid var(--color-border);
  border-radius: 5px;
  transition: border 0.3s, color 0.3s;
  cursor: pointer;
  &.is-active,
  is-active:hover {
    border-width: 2px;
    border-color: #42b883 !important;
    color: var(--color-text-hover);
  }
  &:hover {
    border-color: var(--color-border-hover);
  }
  &:not(:last-child) {
    margin-bottom: 20px;
  }
}

.menu-item-img {
  border-radius: 5px 5px 0 0;
  width: 100%;
  height: calc(100% - 37px);
  img {
    width: 100%;
    height: 100%;
    border-radius: 5px 5px 0 0;
  }
}

.menu-item-name {
  height: 37px;
  line-height: 37px;
  font-size: 15px;
  padding: 5px 0;
  font-weight: 500;
  text-align: center;
  border-radius: 0 0 5px 5px;
  background-color: var(--color-background-mute);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.toggle-menu {
  width: 25px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-background-soft-opacity);
  :deep(.anticon) {
    color: var(--color-text);
    font-size: 20px;
    > svg {
      fill: currentColor;
    }
  }
}

.example-wrapper {
  position: relative;
  flex: 1;
  height: 100%;
  min-width: 700px;
}
</style>
