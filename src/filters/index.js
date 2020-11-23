import Vue from "vue";
import VueFilterDateFormat from "vue-filter-date-format";
import celsius from "./celsius";

Vue.filter("celsius", celsius);
Vue.use(VueFilterDateFormat);
