import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

axios.defaults.baseURL = "https://api.openweathermap.org/data/2.5/";
axios.defaults.params = {
  APPID: "a86ff4182f219864ccf577722d46ccdb"
};

Vue.use(VueAxios, axios);
