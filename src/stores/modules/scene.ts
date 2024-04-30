import { defineStore } from "pinia";
import type sceneInfo from "@/types/scene-info.d";

export const useSceneStore = defineStore({
  id: "scene",
  state: () => ({
    // 主题
    sceneInfo: <sceneInfo>{
      author: "默认作者",
      value: "默认场景",
      name: "默认名称",
      img: "scene.png",
      desc: "默认描述",
    },
  }),
  actions: {
    setCurTheme(val: sceneInfo) {
      this.sceneInfo = val;
    },
  },
});
