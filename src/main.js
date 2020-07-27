import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { isEmptyObject } from "./JS/methods/";

Vue.config.productionTip = false;
Vue.prototype.isEmptyObject = isEmptyObject;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
