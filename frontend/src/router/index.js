import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/HomeView.vue";
import LocalStorage from "../services/storage";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: "/oauth-redirect",
    name: "oauthRedirect",
    component: () => import("../views/OauthRedirect.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (isLoggedIn()) next();
    else {
      next({
        name: "login",
      });
    }
  } else {
    if (isLoggedIn()) next({ name: "home" });
    else next();
  }
});

function isLoggedIn() {
  const user = LocalStorage.getUser();
  return user && user?.facebookToken;
}

export default router;
