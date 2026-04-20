import { createApp } from "vue";
import "vant/es/toast/style";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
app.use(router);
app.mount("#app");
