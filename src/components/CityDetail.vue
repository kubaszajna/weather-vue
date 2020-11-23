<template>
  <div>
    <h1 class="city-title">
      <router-link tag="md-button" class="md-fab md-mini md-raised" to="/">
        <md-icon>keyboard_backspace</md-icon>
      </router-link>
      {{ city.name }}, {{ city.sys.country }}
    </h1>

    <table class="table">
      <tr>
        <th>Temperature</th>
        <td>{{ city.main.temp | celsius }}</td>
      </tr>
      <tr>
        <th>Humidity</th>
        <td>{{ city.main.humidity }} %</td>
      </tr>
      <tr>
        <th>Pressure</th>
        <td>{{ city.main.pressure }} hPa</td>
      </tr>
      <tr>
        <th>Wind</th>
        <td>{{ city.wind.speed }} meter/sec | {{ city.wind.deg }} °</td>
      </tr>
      <tr>
        <th>Sunrise</th>
        <td>{{ new Date(city.sys.sunrise) | dateFormat("HH:mm") }}</td>
      </tr>
      <tr>
        <th>Sunset</th>
        <td>{{ new Date(city.sys.sunset) | dateFormat("HH:mm") }}</td>
      </tr>
      <tr>
        <th>Cloudiness</th>
        <td>{{ city.clouds.all }} %</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "CityDetail",
  props: ["city"],
};
</script>

<style scoped lang="scss">
.city-title {
  display: flex;
  align-items: center;
  .md-button {
    margin-left: 0px;
    margin-right: 12px;
  }
}
.table th {
  text-align: left;
  padding-right: 20px;
}
</style>
