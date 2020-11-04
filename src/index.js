const app = require('./app')

// Set port depending on the enviroment
const port = process.env.PORT

// Listen to requests on the assigned port
app.listen(port, () => {
	console.log(`Server is up on port ${port} ...`)
})
