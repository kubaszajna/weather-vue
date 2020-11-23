<template>
  <div class="home">
    <md-dialog-alert
      :md-active.sync="notFound"
      :md-content="`${error.cod}: ${error.message}`"
      md-confirm-text="OK"
    />

    <search-form @search="addCity" />
    <div v-if="userLocation.coord">
      <div class="md-layout md-gutter">
        <h1 class="md-layout-item md-size-60">Your city</h1>
        <city-item
          :city="userLocation"
          :isDeletable="false"
          class="md-layout-item md-size-70"
        />
      </div>
    </div>
    <div class="md-layout md-gutter">
      <h2 class="md-layout-item md-size-100">
        {{
          cities.length
            ? "Cities"
            : "You haven't added cities. Please add city."
        }}
      </h2>
    </div>
    <transition-group name="list" tag="div" class="md-layout md-gutter">
      <div
        v-for="city in cities"
        :key="city.id"
        class="md-layout-item md-size-33 md-small-size-50 md-xsmall-size-100"
      >
        <city-item :city="city" @remove="removeCity" />
      </div>
    </transition-group>
  </div>
</template>

<script>
import CityItem from "@/components/CityItem";
import SearchForm from "@/components/SearchForm";
import { mapState } from "vuex";

export default {
  name: "home",
  components: {
    CityItem,
    SearchForm
  },
  data() {
    return {
      geoDialog: false,
      geoErr: ""
    };
  },
  computed: {
    ...mapState(["cities", "userLocation", "error"]),
    notFound: {
      get() {
        return this.$store.state.notFound;
      },
      set() {
        this.$store.commit("NOT_FOUND", { active: false, error: {} });
      }
    }
  },
  methods: {
    addCity(event) {
      this.$store.dispatch("GET_WEATHER", { params: { q: event } });
    },
    removeCity(id) {
      this.$store.commit("DELETE_CITY", id);
    },
    askForLocation() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
          const { coords } = position;
          this.$store.dispatch("GET_WEATHER", {
            params: {
              lat: coords.latitude,
              lon: coords.longitude
            },
            action: "SET_USER_LOCATION"
          });
        });
      } else {
        console.log("Geo location is not allowed");
      }
    }
  },
  mounted() {
    this.askForLocation();
  }
};
</script>

<style lang="scss">
.md-layout-item {
  padding-top: 8px;
  padding-bottom: 8px;
  border-radius: 25px;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.5s;
}
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px #2c3e50 inset !important;
}
</style>
