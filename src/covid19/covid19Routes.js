const express = require('express')
const Covid19Service = require('./covid19Services')
const router = new express.Router()

// Get the latest covid data for a specific country.
router.get('/covid/country/name/:country_name', async (req, res) => {
	try {
		// get the country name from the request parameters
		const countryName = req.params.country_name

		// Request covid data based on the country name
		const covidData = await Covid19Service.getCovidReportByCountryName(
			countryName
		)

		// If data not found based on counrry return 404 with message
		if (covidData.status === 404) return res.status(404).send(covidData)

		// If data found of country return 200 with the fetched data
		res.status(200).send(covidData)
	} catch (error) {
		// If some other error occured return 400 with that error
		res.status(400).send(error)
	}
})

router.get('/covid/country/code/:country_code', async (req, res) => {
	try {
		const countryCode = req.params.country_code
		const covidData = await Covid19Service.getCovidReportByCountryCode(
			countryCode
		)
		if (covidData.cod === '404')
			return res.status(404).send({
				status: 404,
				message: 'No Record found',
			})
		res.status(200).send(covidData)
	} catch (error) {
		res.status(400).send(error)
	}
})

module.exports = router
