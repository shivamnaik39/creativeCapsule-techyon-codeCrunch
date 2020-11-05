const express = require('express')
const WeatherService = require('./weatherService')
const router = new express.Router()

// To get weather data by the name of the city
router.get('/weather/city/:city_name', async (req, res) => {
	try {
		// Get the name of the city  from the request parameters
		const cityName = req.params.city_name

		// Request the weather data based on the name of the city
		const weatherData = await WeatherService.getWeatherByCity(cityName)

		// If city not found or mistyped return 404 with message
		if (weatherData.cod === '404')
			return res.status(404).send({
				status: 404,
				message: 'weather data not found',
			})

		// If city found return 200 with the fetched data
		res.status(200).send(weatherData)
	} catch (error) {
		// If some other error occured return 400 with that error
		res.status(400).send(error)
	}
})

// To get weather data by eithre latitude and longitude OR by pincode of the location
router.get('/weather/search', async (req, res) => {
	try {
		// Initialised variable to hold weather data
		let weatherData

		// If latitude and longitude is in search query
		if (req.query.latitude && req.query.longitude) {
			// Get latitude and longitude from the search query
			const { latitude, longitude } = req.query

			// Request weather data based on the latitude and longitude
			weatherData = await WeatherService.getWeatherByCoords(latitude, longitude)
		}

		// If pincode is in the search query
		else if (req.query.pin_code) {
			// Get the pincode from the search query
			const { pin_code } = req.query

			// Request weather data based on the pincode
			weatherData = await WeatherService.getWeatherByPinCode(pin_code)
		}

		// If city not found or mistyped return 404 with message
		if (weatherData.cod === '404')
			return res.status(404).send({
				status: 404,
				message: 'weather data not found',
			})

		// If city found return 200 with the fetched data
		res.status(200).send(weatherData)
	} catch (error) {
		// If some other error occured return 400 with that error
		res.status(400).send(error)
	}
})

// export the router to app
module.exports = router
