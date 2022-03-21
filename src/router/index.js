import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/admin/login.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/admin",
    name: "admin",
    component: () =>
      import(/* webpackChunkName: "admin" */ "@/views/admin/index.vue"),
    children: [
      {
        path: "users",
        name: "users",
        component: () => import("@/views/admin/users/index.vue"),
      },
      {
        path: "students",
        name: "students",
        component: () => import("@/views/admin/student/index.vue"),
      },
      {
        path: "hotel",
        name: "hotel",
        component: () => import("@/views/admin/hostel/index.vue"),
      },
      {
        path: "finance",
        name: "finance",
        component: () => import("@/views/admin/users/index.vue"),
      },
      // 教务管理
      {
        path: "EducationalAffairs",
        name: "EducationalAffairs",
        component: () => import(/* webpackChunkName: "EducationalAffairs" */ "@/views/admin/EducationalAffairs/index.vue"),
        children: [
          {
            path: "class",
            name: "class",
            component: () => import("@/views/admin/EducationalAffairs/class/index.vue"),
          },
          {
            path: "college",
            name: "college",
            component: () => import("@/views/admin/EducationalAffairs/college/index.vue"),
          },
          {
            path: "counselor",
            name: "counselor",
            component: () => import("@/views/admin/EducationalAffairs/counselor/index.vue"),
          },
          {
            path: "vocational",
            name: "vocational",
            component: () => import("@/views/admin/EducationalAffairs/vocational/index.vue"),
          },
        ]
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
