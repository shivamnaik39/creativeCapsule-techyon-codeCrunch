const express = require('express')

// Import the Weather Routes
const weatherRouter = require('./weather/weatherRoutes')

// Import the Covid10 Routes
const covid19 = require('./covid19/covid19Routes')

// const Country = require('./model/Country')
// const Twitter = require('./model/Twitter')
const Country = require('./model/Country')
const Twitter = require('./model/Twitter')

const app = express()

// Use the Weather Routes
app.use(weatherRouter)

// app.use(Country)
// app.use(Twitter)

// Use the Covid19 Routes
app.use(covid19)
app.use(Country)
app.use(Twitter)

// export the app to index file
module.exports = app
