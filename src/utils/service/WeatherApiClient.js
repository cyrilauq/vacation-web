import redaxios from "redaxios";
import {ResponseError} from "@/utils/error/ResponseError";
import forecast from "@/module/forecast";

export class WeatherApiClient {
    constructor() {
        this.apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY
        this._axios = redaxios.create({
            baseURL: import.meta.env.VITE_OPENWEATHER_BASE_URL,
            fetch,
            responseType: 'json'
        });
    }

    async getForecasts(latitude, longitude) {
        let params = new URLSearchParams({
            lat: latitude,
            lon: longitude,
            appid: this.apiKey,
            units: "metric",
            lang: "fr",
            cnt: 33
        })

        const result = await this._axios.get("/forecast?" + params.toString()).catch(e => {
            if (!e.ok) {
                throw new ResponseError(e.statusText || e.data.message, e.status)
            }
        })

        const forecasts = result.data.list
        if (Object.keys(forecasts).length === 0) {
            return ""
        }
        const now = forecasts[0]
        const tomorrow = forecasts[8]
        const two_days = forecasts[16]
        const three_days = forecasts[24]
        const four_days = forecasts[32]

        return {
            "Now": new forecast(now.main.temp, `${now.weather[0].main} - ${now.weather[0].description}`, `https://openweathermap.org/img/w/${now.weather[0].icon}.png`),
            "Tomorrow": new forecast(tomorrow.main.temp, `${tomorrow.weather[0].main} - ${tomorrow.weather[0].description}`, `https://openweathermap.org/img/w/${tomorrow.weather[0].icon}.png`),
            "In 2 days": new forecast(two_days.main.temp, `${two_days.weather[0].main} - ${two_days.weather[0].description}`, `https://openweathermap.org/img/w/${two_days.weather[0].icon}.png`),
            "In 3 days": new forecast(three_days.main.temp, `${three_days.weather[0].main} - ${three_days.weather[0].description}`, `https://openweathermap.org/img/w/${two_days.weather[0].icon}.png`),
            "In 4 days": new forecast(four_days.main.temp, `${four_days.weather[0].main} - ${four_days.weather[0].description}`, `https://openweathermap.org/img/w/${two_days.weather[0].icon}.png`),
        }
    }


}