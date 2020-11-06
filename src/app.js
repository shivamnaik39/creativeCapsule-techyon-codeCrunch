const express = require('express')

// Import the Weather Routes
const weatherRouter = require('./weather/weatherRoutes')

// Import the Covid10 Routes
const covid19 = require('./covid19/covid19Routes')

// Import the country routes
const Country = require('./country&twitter/Country')

// Import the twitter routes
const Twitter = require('./country&twitter/Twitter')

const app = express()

// Use the Weather Routes
app.use(weatherRouter)

// Use the Covid19 Routes
app.use(covid19)

// Use country routes
app.use(Country)

// Use Twitter routes
app.use(Twitter)

app.use(function (e, req, res, next) {
	if (e.message === 'Bad request') {
		res.status(400).json({ error: { msg: e.message, stack: e.stack } })
	}
})

// export the app to index file
module.exports = app
