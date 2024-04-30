import { createApp } from "vue";
import stores from "./stores";
import App from "./App.vue";
import router from "./router";
import "./assets/main.less";
import Icon from "@ant-design/icons-vue";

const app = createApp(App);

app.use(stores);
app.use(router);

app.component("Icon", Icon);

app.mount("#app");
