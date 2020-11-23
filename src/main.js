import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import "./plugins";
import "./filters";
import firebase from "firebase";

Vue.config.productionTip = false;

let app = null;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      el: "#app",
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
