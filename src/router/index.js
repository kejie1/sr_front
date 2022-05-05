import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/admin/login.vue";
import Index from "@/views/index/index.vue";
import { TabPane } from "element-ui";
Vue.use(VueRouter);

const router = new VueRouter({
  routes : [
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/login",
      component: Login,
    },
    {
      path: "/index",
      component: Index,
    },
    {
      path: "/admin",
      name: "admin",
      component: () =>
        import(/* webpackChunkName: "admin" */ "@/views/admin/index.vue"),
      children: [
        {
          path: "dashboard",
          name: "dashboard",
          component: () => import("@/views/admin/dashboard/index.vue"),
        },
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
          path: "financial",
          name: "financial",
          component: () => import("@/views/admin/financial/index.vue"),
        },
        // 教务管理
        {
          path: "EducationalAffairs",
          name: "EducationalAffairs",
          component: () =>
            import(
              /* webpackChunkName: "EducationalAffairs" */ "@/views/admin/EducationalAffairs/index.vue"
            ),
          children: [
            {
              path: "class",
              name: "class",
              component: () =>
                import("@/views/admin/EducationalAffairs/class/index.vue"),
            },
            {
              path: "college",
              name: "college",
              component: () =>
                import("@/views/admin/EducationalAffairs/college/index.vue"),
            },
            {
              path: "counselor",
              name: "counselor",
              component: () =>
                import("@/views/admin/EducationalAffairs/counselor/index.vue"),
            },
            {
              path: "vocational",
              name: "vocational",
              component: () =>
                import("@/views/admin/EducationalAffairs/vocational/index.vue"),
            },
          ],
        },
      ],
    },
  ]
});
// 定义全局前置导航守卫
router.beforeEach((to, from, next) => {
  // 处理访问权限
  if (to.path === '/login') {
    next()
  }
  else {
    const token = sessionStorage.getItem('token')
    if (token) {
      next()
    }
    else {
      if(to.path === '/index'){next()}
      else{
        alert('请登录账号')
        next('/login')
      }
      
    }
  }
})

export default router;
