import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
Vue.prototype.isEmptyObject = (object) => {
  if (object === null || object === undefined) {
    return true;
  } else {
    if (Object.entries(object).length === 0) {
      return true;
    } else {
      return false;
    }
  }
};

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
