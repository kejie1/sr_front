import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/css/global.css";
import less from "less";
import "nprogress/nprogress.css";
import XLSX from 'xlsx'
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(less);
Vue.prototype.$message = ElementUI.Message;
Vue.prototype.XLSX = XLSX
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
