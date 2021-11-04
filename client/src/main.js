import { createApp } from "vue";
import store from "./store";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/theme-chalk/index.css";
import App from "./App.vue";

createApp(App)
  .use(ElementPlus)
  .use(store)
  .use(router)
  .mount("#app");
