const express = require('express')
const routes = express.Router()
const apicall = require('./CountryData')
const request = require('request')
routes.get('/country/name/:country_name', (req, res) => {
	_EXTERNAL_URL =
		'https://restcountries.eu/rest/v2/name/' +
		req.params.country_name.toLowerCase()
	try {
		const countryname = () => {
			request(_EXTERNAL_URL, { json: true }, (err, body) => {
				if (err) {
					res.status(404).send('Could not find country')
					return
				}
				const Country = body

				for (var i = 0; i < Country.body.length; i++) {
					console.log(
						req.params.country_name.charAt(0).toUpperCase +
							req.params.country_name.slice(1)
					)
					if (
						Country.body[i].name ==
						req.params.country_name.charAt(0).toUpperCase() +
							req.params.country_name.slice(1)
					) {
						console.log('in if')
						ret = {
							name: body.body[i].name,
							alpha2Code: Country.body[i].alpha2Code,
							alpha3Code: Country.body[i].alpha3Code,
							capital: Country.body[i].capital,
							region: Country.body[i].region,
							population: Country.body[i].population,
							flag: Country.body[i].flag,
							totalLanguages: Country.body[i].languages.length,
							totalCurrencies: Country.body[i].currencies.length,
						}
						console.log(ret)
						res.status(200).send(ret)
						break
					}
				}
			})
		}
		countryname.call(function (response) {})
	} catch (e) {
		throw e
	}
})
routes.get('/country/code/:country_code', async (req, res) => {
	//console.log(Country)
	const results = []

	_EXTERNAL_URL =
		'https://restcountries.eu/rest/v2/alpha/' + req.params.country_code
	try {
		const countrycode = () => {
			request(_EXTERNAL_URL, { json: true }, (err, body) => {
				if (err) {
					res.status(404).send('Could not find country')
					return
				}
				//console.log(body);
				const Country = body
				console.log(Country.body)
				ret = {
					name: Country.body.name,
					alpha2Code: Country.body.alpha2Code,
					alpha3Code: Country.body.alpha3Code,
					capital: Country.body.capital,
					region: Country.body.region,
					population: Country.body.population,
					flag: Country.body.flag,
					totalLanguages: Country.body.languages.length,
					totalCurrencies: Country.body.currencies.length,
					totalTimezones: Country.body.timezones.length,
				}
				res.status(200).send(ret)
				return
			})
		}
		countrycode.call(function (response) {})
	} catch (error) {
		throw error
	}
})
routes.get('/country/search', (req, res) => {
	console.log(req.query.searchText)
	var results = []
	_EXTERNAL_URL = 'https://restcountries.eu/rest/v2/all'
	try {
		const countrycode = () => {
			request(_EXTERNAL_URL, { json: true }, (err, body) => {
				if (err) {
					res.status(404).send('Could not find country')
					return
				}
				//console.log(body);
				const Country = body.body
				for (var i = 0; i < Country.length; i++) {
					if (
						Country[i].name === req.query.searchText ||
						Country[i].alpha2Code === req.query.searchText ||
						Country[i].alpha3Code === req.query.searchText ||
						Country[i].callingCodes[0] === req.query.searchText ||
						Country[i].capital === req.query.searchText
					) {
						console.log(Country[i])
						ret = {
							name: Country[i].name,
							capital: Country[i].capital,
							population: Country[i].population,
							flag: Country[i].flag,
							totalLanguages: Country[i].languages.length,
							totalCurrencies: Country[i].currencies.length,
							totalTimezones: Country[i].timezones.length,
						}
						console.log(ret)

						res.status(200).send([ret])
						return
					}
				}
			})
		}
		countrycode.call(function (response) {})
	} catch (error) {
		throw error
	}
})
module.exports = routes
