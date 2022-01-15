import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/admin/login.vue";
Vue.use(VueRouter);

const routes = [
  {
    path:'/',
    redirect:'/login'
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/admin",
    name: "admin",
    component: () =>
    import(/* webpackChunkName: "admin" */ "../views/admin/index.vue"),
    children:[
      {
        path:'users',
        name:'users',
        component:()=>import('../views/admin/users/index.vue')
      },
      {
        path:'students',
        name:'users',
        component:()=>import('../views/admin/users/index.vue')
      },
      {
        path:'hotel',
        name:'users',
        component:()=>import('../views/admin/users/index.vue')
      },
      {
        path:'finance',
        name:'users',
        component:()=>import('../views/admin/users/index.vue')
      },
      {
        path:'college',
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
