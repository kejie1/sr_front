import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/admin/index.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/admin/login.vue"),
  },
  {
    path: "/",
    name: "index",
    component: Index,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
