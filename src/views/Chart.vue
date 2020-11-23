<template>
  <div class="city" v-if="city.name">
    <city-charts :city="city" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import CityCharts from "@/components/CityCharts";
export default {
  name: "city",
  components: { CityCharts },
  computed: {
    ...mapState({ city: "currentCity" })
  },

  mounted() {
    this.$store.dispatch("GET_WEATHER", {
      params: this.$route.params,
      action: "SET_CURRENT_CITY"
    });
  }
};
</script>

<style></style>
