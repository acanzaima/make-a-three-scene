/**
 * pinia
 */
import { createPinia } from "pinia";
import piniaPluginPersist from "@/plugins/pinia-persist";

const pinia = createPinia();
pinia.use(piniaPluginPersist);

export default pinia;
