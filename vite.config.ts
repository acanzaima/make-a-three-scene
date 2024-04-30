import { fileURLToPath, URL } from "node:url";
import { BASE_PATH } from "./src/config/setting";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import legacy from "@vitejs/plugin-legacy";
import ViteCompression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const isBuild = command.includes("build");
  return {
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    plugins: [
      vue(),
      vueJsx(),
      // gzip 压缩
      ViteCompression({
        disable: !isBuild,
        threshold: 10240,
        algorithm: "gzip",
        ext: ".gz",
      }),
      // 兼容低版本浏览器
      legacy({
        targets: ["Chrome 63"],
        modernPolyfills: true,
      }),
    ],
    base: BASE_PATH === "/" ? "/" : `${BASE_PATH}/`,
    build: {
      target: "es2015",
      outDir: "public",
    },
  };
});
