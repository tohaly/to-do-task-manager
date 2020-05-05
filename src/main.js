import Vue from "vue";
import App from "./components/App";

import router from "./routes";
import store from "./store";
import helpers from "./helpers/helpers";

const helpersPlugin = {
  install() {
    Vue.helpers = helpers;
    Vue.prototype.$helpers = helpers;
  },
};

Vue.use(helpersPlugin);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
