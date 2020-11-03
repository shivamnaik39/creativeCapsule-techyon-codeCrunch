const axios = require('axios')
require('dotenv').config()

const apiKey = process.env.WEATHER_API_KEY
const url = 'https://api.openweathermap.org/data/2.5/weather'

const kelvinToCelsius = (kelvin) => parseFloat((kelvin - 273.15).toFixed(2))

const parseWeatherData = (data) => ({
	country: data.sys.country,
	name: data.name,
	temp: kelvinToCelsius(data.main.temp),
	min_temp: kelvinToCelsius(data.main.temp_min),
	max_temp: kelvinToCelsius(data.main.temp_max),
	latitude: data.coord.lat,
	longitude: data.coord.lon,
})

class WeatherService {
	// Get latest weather data for a given city.
	static getWeatherByCity(cityName) {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.get(
					`${url}?q=${encodeURIComponent(cityName)}&appid=${apiKey}`
				)
				const data = res.data
				const weatherData = parseWeatherData(data)
				resolve(weatherData)
			} catch (error) {
				if (error.response.status === 404) resolve(error.response.data)
				reject(error)
			}
		})
	}

	static getWeatherByCoords(lat, lon) {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.get(
					`${url}?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(
						lon
					)}&appid=${apiKey}`
				)
				const data = res.data
				const weatherData = parseWeatherData(data)
				resolve(weatherData)
			} catch (error) {
				if (error.response.status === 404) resolve(error.response.data)
				reject(error)
			}
		})
	}

	static getWeatherByPinCode(pinCode) {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.get(
					`${url}?zip=${decodeURIComponent(pinCode)},IN&appid=${apiKey}`
				)
				const data = res.data
				const weatherData = parseWeatherData(data)
				resolve(weatherData)
			} catch (error) {
				if (error.response.status === 404) resolve(error.response.data)
				reject(error)
			}
		})
	}
}

module.exports = WeatherService
