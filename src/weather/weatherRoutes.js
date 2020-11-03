const express = require('express')
const WeatherService = require('./weatherService')
const router = new express.Router()

router.get('/weather/city/:city_name', async (req, res) => {
	try {
		const cityName = req.params.city_name
		const weatherData = await WeatherService.getWeatherByCity(cityName)
		if (weatherData.cod === '404')
			return res.status(404).send({
				status: 404,
				message: 'weather data not found',
			})
		res.status(200).send(weatherData)
	} catch (error) {
		res.status(400).send(error)
	}
})

router.get('/weather/search', async (req, res) => {
	try {
		let weatherData
		if (req.query.latitude && req.query.longitude) {
			const { latitude, longitude } = req.query
			weatherData = await WeatherService.getWeatherByCoords(latitude, longitude)
		} else if (req.query.pin_code) {
			const { pin_code } = req.query
			weatherData = await WeatherService.getWeatherByPinCode(pin_code)
		}
		if (weatherData.cod === '404')
			return res.status(404).send({
				status: 404,
				message: 'weather data not found',
			})
		res.status(200).send(weatherData)
	} catch (error) {
		res.status(400).send(error)
	}
})

module.exports = router
