const axios = require('axios')

// api key imported from environment variables
const apiKey = process.env.WEATHER_API_KEY

// Base url of the open weather map
const URL = 'https://api.openweathermap.org/data/2.5/weather'

// Convert temperature from kelvin to celsius
const kelvinToCelsius = (kelvin) => Math.round(kelvin - 273.15)

// Get weather data from api depending on url i.e by city_name, latitude & longitude and pin_code
const getData = (url) => {
	return new Promise(async (resolve, reject) => {
		try {
			const res = await axios.get(url)
			const data = res.data

			// Filtering out the required data
			const weatherData = {
				country: data.sys.country,
				name: data.name,
				temp: kelvinToCelsius(data.main.temp),
				min_temp: kelvinToCelsius(data.main.temp_min),
				max_temp: kelvinToCelsius(data.main.temp_max),
				latitude: data.coord.lat,
				longitude: data.coord.lon,
			}

			// resolve promise with weather data
			resolve(weatherData)
		} catch (error) {
			// If city name not found or mistyped resolve with error message
			if (error.response.status === 404) resolve(error.response.data)

			// If some other error occured reject with error
			reject(error)
		}
	})
}

class WeatherService {
	// Get latest weather data for a given city.
	static getWeatherByCity(cityName) {
		// construct the customised url from the base url
		const url = `${URL}?q=${encodeURIComponent(cityName)}&appid=${apiKey}`

		// Return the promise
		return getData(url)
	}

	// Search for the latest weather within the country India by: Latitude or longitude
	static getWeatherByCoords(lat, lon) {
		// construct the customised url from the base url
		const url = `${URL}?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(
			lon
		)}&appid=${apiKey}`

		// Return the promise
		return getData(url)
	}

	// Search for the latest weather within the country India by: Pincode
	static getWeatherByPinCode(pinCode) {
		// construct the customised url from the base url
		const url = `${URL}?zip=${decodeURIComponent(pinCode)},IN&appid=${apiKey}`

		// Return the promise
		return getData(url)
	}
}

// export the WeatherServie to the Weather Router
module.exports = WeatherService
