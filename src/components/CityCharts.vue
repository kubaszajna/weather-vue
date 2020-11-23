<template>
  <div>
    <div id="app">
      <div class="my-5">
        <router-link tag="md-button" class="md-fab md-mini md-raised" to="/">
          <md-icon>keyboard_backspace</md-icon>
        </router-link>
        <h1 class="md-layout-item text-center">{{ city.name }}</h1>
        <div v-show="chart != null">
          <canvas id="myChart"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CityCharts",
  props: ["city"],
  data() {
    return {
      chart: null,
      dates: [],
      temps: [],
      loading: false,
      errored: false
    };
  },
  methods: {},
  created() {
    this.loading = true;

    if (this.chart != null) {
      this.chart.destroy();
    }

    axios
      .get("https://api.openweathermap.org/data/2.5/forecast", {
        params: {
          q: this.$props.city.name,
          units: "metric",
          appid: "fd3150a661c1ddc90d3aefdec0400de4"
        }
      })
      .then(response => {
        this.dates = response.data.list.map(list => {
          return list.dt_txt;
        });

        this.temps = response.data.list.map(list => {
          return list.main.temp;
        });

        var ctx = document.getElementById("myChart");
        this.chart = new Chart(ctx, {
          type: "line",
          data: {
            labels: this.dates,
            datasets: [
              {
                label: "Average Temperature",
                backgroundColor: "rgba(54, 162, 235, 0.5)",
                borderColor: "rgb(54, 100, 235)",
                fill: false,
                data: this.temps
              }
            ]
          },
          options: {
            legend: {
              labels: {
                fontColor: "white",
                scaleFontColor: "white"
              }
            },
            tooltips: {
              callbacks: {
                label: function(tooltipItem, data) {
                  var label =
                    data.datasets[tooltipItem.datasetIndex].label || "";

                  if (label) {
                    label += ": ";
                  }

                  label += Math.floor(tooltipItem.yLabel);
                  return label + "°C";
                }
              }
            },
            scales: {
              xAxes: [
                {
                  type: "time",
                  time: {
                    unit: "hour",
                    displayFormats: {
                      hour: "M/DD  hA"
                    },
                    tooltipFormat: "MMM. DD hA"
                  },
                  scaleLabel: {
                    display: false
                  }
                }
              ],
              yAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: "Temperature (°C)"
                  },
                  ticks: {
                    callback: function(value, index, values) {
                      return value + "°C";
                    }
                  }
                }
              ]
            }
          }
        });
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));

    Chart.defaults.global.defaultFontColor = "#fff";
  }
};
</script>

<style scoped lang="scss">
.text-center {
  text-align: center;
  width: 100%;
}
.md-raised {
  position: absolute;
  float: left;
}
</style>
