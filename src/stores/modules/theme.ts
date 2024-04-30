import { defineStore } from "pinia";
// 主题类型
type theme = string | null;
export const useThemeStore = defineStore({
  id: "theme",
  state: () => ({
    // 主题
    theme: <theme>"auto",
  }),
  actions: {
    setCurTheme(val: theme) {
      this.theme = val;
    },
  },
});
