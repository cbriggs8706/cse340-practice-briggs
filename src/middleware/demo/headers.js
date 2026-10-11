// Route-specific middleware that sets custom headers
let requestCount = 0

const addDemoHeaders = (req, res, next) => {
	res.setHeader('X-Demo-Page', 'true')
	res.setHeader('X-Middleware-Demo', 'This is a demo header!')

	next()
}

const addDemoRequestCount = (req, res, next) => {
	// Increment the request count for the demo page
	requestCount++
	res.locals.requestCount = requestCount

	next()
}

export { addDemoHeaders, addDemoRequestCount }
