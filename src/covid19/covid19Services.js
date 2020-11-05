const axios = require('axios')
const https = require('https')

// custom instance of axios to ignore ssl verification (covid api doesnt work without this)
const instance = axios.create({
	httpsAgent: new https.Agent({
		rejectUnauthorized: false,
	}),
})

// Base url for the covid 19 api
const URL = 'https://covid19-api.com/country'

// function to check wheather an object is empty or not
const isEmpty = (obj) => {
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) return false
	}
	return true
}

// Get covid19 data from api depending on url i.e by country name, country code
const getData = (url) => {
	return new Promise(async (resolve, reject) => {
		try {
			const res = await instance.get(url)
			const data = res.data[0]

			// If no data is received resolve promise with 404 and message
			if (isEmpty(data))
				resolve({
					status: 404,
					message: 'no records found',
				})

			// Filtering out the required data
			const covidData = {
				country: data.country,
				confirmed: data.confirmed,
				recovered: data.recovered,
				critical: data.critical,
				deaths: data.deaths,
			}

			// if data is received resolve promise with covid19 data
			resolve(covidData)
		} catch (error) {
			// If some other error occured reject with error
			reject(error)
		}
	})
}
class Covid19Service {
	// Get latest covid19 report for a given country .
	static getCovidReportByCountryName(countryName) {
		const url = `${URL}?name=${encodeURIComponent(countryName)}&format=json`
		return getData(url)
	}

	// Get latest covid19 report for a given country Code  .
	static getCovidReportByCountryCode(countryCode) {
		// const url =
		// return getData(url)
	}
}

// export the Covid19Service  to the Covid19 Router
module.exports = Covid19Service
