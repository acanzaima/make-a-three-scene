import NProgress from "nprogress";
import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";

NProgress.configure({
  speed: 200,
  minimum: 0.02,
  trickleSpeed: 200,
  showSpinner: false,
});

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(() => {
  NProgress.start();
});

router.afterEach(() => {
  setTimeout(() => {
    NProgress.done(true);
  }, 200);
});

export default router;
