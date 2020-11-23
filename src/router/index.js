import Vue from "vue";
import Router from "vue-router";
import GMap from "@/components/home/GMap";
import Signup from "@/components/auth/Signup";
import Login from "@/components/auth/Login";
import Citycharts from "@/components/Citycharts";

Vue.use(Router);

export default new Router({
  routes: [
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
      path: "/chart",
      name: "citycharts",
      component: Citycharts
    }
  ]
});
