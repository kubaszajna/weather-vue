import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Signup from "./components/auth/Signup.vue";
import Login from "./components/auth/Login.vue";
import Profile from "./components/auth/Profile.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/city/:id",
      name: "city",
      component: () => import("./views/City.vue")
    },
    {
      path: "/settings",
      name: "Settings",
      component: Profile
    },
    {
      path: "/signup",
      name: "Signup",
      component: Signup
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/chart/:id",
      name: "CityCharts",
      component: () => import("./views/Chart.vue")
    }
  ]
});
