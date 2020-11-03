const express = require('express')

const app = express()

app.use(express.json())

// Demo route
app.get('/', (req, res) => {
	try {
		res.send({ Name: 'SUDO', moto: 'Just Sudo it.....' })
	} catch (error) {
		res.status(400).send(error)
	}
})

module.exports = app
