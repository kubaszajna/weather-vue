<template>
  <div class="md-layout md-gutter">
    <div class="md-layout-item">
      <md-field>
        <label class="md-danger">Enter city</label>
        <md-input
          type="text"
          autocomplete="off"
          v-model="city"
          @focus="modal = true"
          @keyup.enter="submit"
          @blur="modal = false"
        ></md-input>

        <md-button
          class="md-raised md-primary"
          :disabled="!city"
          @click="submit"
          >Add</md-button
        >
      </md-field>
      <div v-if="filteredCities && modal" style="position: relative;">
        <ul class="city-list" v-if="city.length > 0">
          <li
            class="city-list-item"
            v-for="filteredCity in filteredCities"
            @mousedown="setCity(filteredCity)"
            v-bind:key="filteredCity"
          >
            {{ filteredCity }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import json from "../assets/cities.json";
export default {
  name: "SearchForm",
  data() {
    return {
      city: "",
      modal: false,
      cities: json,
      filteredCities: [],
      filteredCity: ""
    };
  },
  methods: {
    submit() {
      if (this.city) {
        this.$emit("search", this.city);
        this.city = "";
        this.filteredCity = "";
      }
    },
    filterCities() {
      this.filteredCities = this.cities.filter(city => {
        return city.toLowerCase().startsWith(this.city.toLowerCase());
      });
    },
    setCity(city) {
      this.city = city;
      this.modal = false;
    }
  },
  watch: {
    city() {
      this.filterCities();
    }
  }
};
</script>

<style scoped>
.md-field {
  margin-bottom: 0px;
}
.background {
  width: 100vh;
  height: 100vh;
  background: cornflowerblue;
  position: absolute;
}
.city-list {
  width: 70%;
  float: left;
  position: absolute;
  z-index: 1000;
  max-height: 300px;
  overflow: auto;
}

.city-list-item {
  cursor: pointer;
  width: 100%;
}
</style>
