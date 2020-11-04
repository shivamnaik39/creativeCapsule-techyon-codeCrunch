const express = require('express')

// Import the Weather Routes
const weatherRouter = require('./weather/weatherRoutes')

const app = express()

// Use the Weather Routes
app.use(weatherRouter)

// export the app to index file
module.exports = app
