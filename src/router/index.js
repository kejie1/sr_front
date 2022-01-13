import Vue from "vue";
import VueRouter from "vue-router";
import Admin from "../views/admin/index.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/admin/login.vue"),
  },
  {
    path: "/admin",
    name: "admin",
    component: Admin,
    children:[
      {
        path:'users',
        name:'users',
        component:()=>import('../views/admin/users/index.vue')
      }
    ]
  },
  
];

const router = new VueRouter({
  routes,
});

export default router;
