import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cities: [],
    currentCity: {},
    userLocation: {},
    notFound: false,
    error: {}
  },
  mutations: {
    NOT_FOUND(state, val) {
      state.notFound = val.active;
      state.error = val.error;
    },
    SET_CITIES(state, cities) {
      state.cities = cities;
    },
    ADD_CITY(state, city) {
      state.cities = [...state.cities, city];
      this._vm.$storage.set("cities", state.cities);
    },
    UPDATE_CITY(state, city) {
      state.cities = state.cities.map(c => (c.id === city.id ? city : c));
      this._vm.$storage.set("cities", state.cities);
    },
    DELETE_CITY(state, cityId) {
      state.cities = state.cities.filter(c => c.id !== cityId);
      this._vm.$storage.set("cities", state.cities);
    },
    SET_CURRENT_CITY(state, city) {
      state.currentCity = city;
    },
    SET_USER_LOCATION(state, city) {
      state.userLocation = city;
    }
  },
  actions: {
    async GET_WEATHER({ commit, state }, { params, action }) {
      try {
        const { data } = await this._vm.axios.get("weather", {
          params
        });

        if (action) {
          commit(action, data);
        } else {
          if (state.cities.some(c => c.id === data.id)) {
            commit("UPDATE_CITY", data);
          } else {
            commit("ADD_CITY", data);
          }
        }
      } catch (e) {
        commit("NOT_FOUND", { active: true, error: e.response.data });
      }
    }
  }
});
