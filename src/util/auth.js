import router from "../router/index";

router.beforeEach((to, from, next) => {
  if (to.path !== "/login") {
    if (!sessionStorage.getItem("token")) {
      return next("/login");
    }
  } else {
    return next();
  }
});
