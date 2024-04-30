import LayoutIndex from "@/layout/LayoutIndex.vue";
import HomeView from "../views/home/HomeView.vue";
import type { RouteRecordRaw } from "vue-router";

/**
 * 静态路由
 */
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "layout",
    component: LayoutIndex,
    redirect: "/home",
    children: [
      {
        path: "home",
        name: "home",
        component: HomeView,
      },
      {
        path: "scene",
        name: "scene",
        component: () => import("../views/scene/SceneView.vue"),
      },
    ],
  },
  {
    path: `/:path(.*)*`,
    component: () => import("../views/exception/404/index.vue"),
  },
];

export default routes;
