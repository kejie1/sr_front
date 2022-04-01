import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/css/global.css";
import less from "less";
import echarts from "echarts";
import "echarts/map/js/china.js";
import "nprogress/nprogress.css";
import XLSX from "xlsx";
import "lib-flexible";
import "echarts/map/js/china.js";
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(less);
Vue.prototype.$message = ElementUI.Message;
Vue.prototype.XLSX = XLSX;
Vue.prototype.$echarts = echarts;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
