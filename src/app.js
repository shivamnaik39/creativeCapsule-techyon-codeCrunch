const express = require('express')

// Import the Weather Routes
const weatherRouter = require('./weather/weatherRoutes')
const Country=require('./model/Country')
const Twitter=require('./model/Twitter')
const app = express()

// Use the Weather Routes
app.use(weatherRouter)
app.use(Country)
app.use(Twitter)
// export the app to index file
module.exports = app
