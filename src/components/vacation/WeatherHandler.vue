<script>
import {WeatherApiClient} from "@/utils/service/WeatherApiClient";
import BasicCard from "@/components/global/BasicCard.vue";
import ImageCard from "@/components/global/ImageCard.vue";

export default {
  name: "WeatherHandler",
  components: {ImageCard, BasicCard},
  props: {
    latitude: Number,
    longitude: Number
  },
  data() {
    return {
      weatherForecasts: undefined,
      weatherApiClient: undefined
    }
  },
  mounted() {
    this.weatherApiClient = new WeatherApiClient()
    this.weatherApiClient.getForecasts(this.latitude, this.longitude).then(forecasts => {
      if(!forecasts) {
        swal("Something went wrong", "We couldn't get the forecast for this vacation", "error")
      } else {
        this.weatherForecasts = forecasts
      }
    }).catch(error => {
      swal("oh no", error.message, "error")
    })
  }
}
</script>

<template>
    <ul class="max-w-md space-y-0 text-gray-500 list-inside dark:text-gray-400 list-none">
      <li class="px-2" v-for="(forecast, day) in weatherForecasts">
        <ImageCard :image="forecast.iconurl" :title="day" :content="`${forecast.temp}°C - ${forecast.weather}`"/>
      </li>
    </ul>
</template>

<style scoped>

</style>