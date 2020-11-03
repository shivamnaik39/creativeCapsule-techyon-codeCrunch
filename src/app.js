const express = require('express')
const weatherRouter = require('./weather/weatherRoutes')

const app = express()

app.use(express.json())
app.use(weatherRouter)

module.exports = app
