<template>
  <div class="city" v-if="city.name">
    <city-detail :city="city" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import CityDetail from "@/components/CityDetail";
export default {
  name: "City",
  components: { CityDetail },
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
