// Import express using ESM syntax
import express from 'express'
import { fileURLToPath } from 'url'
import path from 'path'

const name = process.env.NAME
// Define the port number the server will listen on
const NODE_ENV = process.env.NODE_ENV || 'production'
const PORT = process.env.PORT || 3000
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
let requestCount = 0

// Create an instance of an Express application
const app = express()

/**
 * Configure Express middleware
 */

// Middleware to make NODE_ENV available to all templates
app.use((req, res, next) => {
	res.locals.NODE_ENV = NODE_ENV.toLowerCase() || 'production'

	// Continue to the next middleware or route handler
	next()
})

app.use((req, res, next) => {
	// Skip logging for routes that start with /. (like /.well-known/)
	if (!req.path.startsWith('/.')) {
		console.log(`${req.method} ${req.url}`)
	}
	next() // Pass control to the next middleware or route
})

// Middleware to add global data to all templates
app.use((req, res, next) => {
	// Add current year for copyright
	res.locals.currentYear = new Date().getFullYear()

	next()
})

// Global middleware for time-based greeting
app.use((req, res, next) => {
	const currentHour = new Date().getHours()

	if (currentHour < 12) {
		res.locals.greeting = 'Good morning!'
	} else if (currentHour < 18) {
		res.locals.greeting = 'Good afternoon!'
	} else {
		res.locals.greeting = 'Good evening!'
	}

	next()
})

// Global middleware for seasonal-based greeting
app.use((req, res, next) => {
	const currentMonth = new Date().getMonth() + 1
	// copilot filled the logic out for this one and I updated the greeting messages
	if (currentMonth >= 3 && currentMonth <= 5) {
		res.locals.seasonalGreeting = 'Spring has sprung!'
	} else if (currentMonth >= 6 && currentMonth <= 8) {
		res.locals.seasonalGreeting = 'Keep cool this Summer!'
	} else if (currentMonth >= 9 && currentMonth <= 11) {
		res.locals.seasonalGreeting = 'Pumpkin spice season is here!'
	} else {
		res.locals.seasonalGreeting = 'Stay warm this Winter!'
	}

	next()
})

// Global middleware for random theme selection
app.use((req, res, next) => {
	const themes = [
		'blue-theme',
		'green-theme',
		'red-theme',
		'purple-theme',
		'orange-theme',
	]

	// Your task: Pick a random theme from the array
	const randomTheme = themes[Math.floor(Math.random() * themes.length)]
	;((res.locals.bodyClass = randomTheme), next())
})

// Global middleware to share query parameters with templates
app.use((req, res, next) => {
	// Make req.query available to all templates for debugging and conditional rendering
	res.locals.queryParams = req.query || {}

	next()
})

// Route-specific middleware that sets custom headers
const addDemoHeaders = (req, res, next) => {
	// Your task: Set custom headers using res.setHeader()
	// Add a header called 'X-Demo-Page' with value 'true'
	// Add a header called 'X-Middleware-Demo' with any message you want
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

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')))

// Set EJS as the templating engine
app.set('view engine', 'ejs')

// Tell Express where to find your templates
app.set('views', path.join(__dirname, 'src/views'))

// Define a route handler for the root URL ('/')

// Course data - place this after imports, before routes
const courses = {
	CS121: {
		id: 'CS121',
		title: 'Introduction to Programming',
		description:
			'Learn programming fundamentals using JavaScript and basic web development concepts.',
		credits: 3,
		sections: [
			{ time: '9:00 AM', room: 'STC 392', professor: 'Brother Jack' },
			{ time: '2:00 PM', room: 'STC 394', professor: 'Sister Enkey' },
			{ time: '11:00 AM', room: 'STC 390', professor: 'Brother Keers' },
		],
	},
	MATH110: {
		id: 'MATH110',
		title: 'College Algebra',
		description:
			'Fundamental algebraic concepts including functions, graphing, and problem solving.',
		credits: 4,
		sections: [
			{ time: '8:00 AM', room: 'MC 301', professor: 'Sister Anderson' },
			{ time: '1:00 PM', room: 'MC 305', professor: 'Brother Miller' },
			{ time: '3:00 PM', room: 'MC 307', professor: 'Brother Thompson' },
		],
	},
	ENG101: {
		id: 'ENG101',
		title: 'Academic Writing',
		description:
			'Develop writing skills for academic and professional communication.',
		credits: 3,
		sections: [
			{ time: '10:00 AM', room: 'GEB 201', professor: 'Sister Anderson' },
			{ time: '12:00 PM', room: 'GEB 205', professor: 'Brother Davis' },
			{ time: '4:00 PM', room: 'GEB 203', professor: 'Sister Enkey' },
		],
	},
}

/**
 * Routes
 */

app.get('/', (req, res) => {
	const title = 'Welcome Home'
	// res.sendFile(path.join(__dirname, 'src/views/home.html'))
	res.render('home', { title })
})

// Test route for 500 errors
app.get('/test-error', (req, res, next) => {
	const err = new Error('This is a test error')
	err.status = 500
	next(err)
})

app.get('/about', (req, res) => {
	const title = 'About Me'
	// res.sendFile(path.join(__dirname, 'src/views/about.html'))
	res.render('about', { title })
})

// Course catalog list page
app.get('/catalog', (req, res) => {
	res.render('catalog', {
		title: 'Course Catalog',
		courses: courses,
	})
})

// Enhanced course detail route with sorting
app.get('/catalog/:courseId', (req, res, next) => {
	const courseId = req.params.courseId
	const course = courses[courseId]

	if (!course) {
		const err = new Error(`Course ${courseId} not found`)
		err.status = 404
		return next(err)
	}

	// Get sort parameter (default to 'time')
	const sortBy = req.query.sort || 'time'

	// Create a copy of sections to sort
	let sortedSections = [...course.sections]

	// Sort based on the parameter
	switch (sortBy) {
		case 'professor':
			sortedSections.sort((a, b) => a.professor.localeCompare(b.professor))
			break
		case 'room':
			sortedSections.sort((a, b) => a.room.localeCompare(b.room))
			break
		case 'time':
		default:
			// Keep original time order as default
			break
	}

	console.log(`Viewing course: ${courseId}, sorted by: ${sortBy}`)

	res.render('course-detail', {
		title: `${course.id} - ${course.title}`,
		course: { ...course, sections: sortedSections },
		currentSort: sortBy,
	})
})

// Demo page route with header middleware
app.get('/demo', addDemoHeaders, addDemoRequestCount, (req, res) => {
	res.render('demo', {
		title: 'Middleware Demo Page',
	})
})

app.get('/products', (req, res) => {
	const title = 'Our Products'
	// res.sendFile(path.join(__dirname, 'src/views/products.html'))
	res.render('products', { title })
})

app.get('/student', (req, res) => {
	const name = 'Cameron Briggs'
	const id = '123456'
	const email = 'bri06021@byui.edu'
	const address = 'PO Box 242, Malta, ID 83342'
	const title = 'Student Information'
	res.render('student', { name, id, email, address, title })
})

/**
 * Error Handling
 */

// Catch-all route for 404 errors
app.use((req, res, next) => {
	const err = new Error('Page Not Found')
	err.status = 404
	next(err)
})

// Global error handler
app.use((err, req, res, next) => {
	// Prevent infinite loops, if a response has already been sent, do nothing
	if (res.headersSent || res.finished) {
		return next(err)
	}

	// Determine status and template
	const status = err.status || 500
	const template = status === 404 ? '404' : '500'

	// Prepare data for the template
	const context = {
		title: status === 404 ? 'Page Not Found' : 'Server Error',
		error: NODE_ENV === 'production' ? 'An error occurred' : err.message,
		stack: NODE_ENV === 'production' ? null : err.stack,
		NODE_ENV, // Our WebSocket check needs this and its convenient to pass along
	}

	// Render the appropriate error template with fallback
	try {
		res.status(status).render(`errors/${template}`, context)
	} catch (renderErr) {
		// If rendering fails, send a simple error page instead
		if (!res.headersSent) {
			res
				.status(status)
				.send(`<h1>Error ${status}</h1><p>An error occurred.</p>`)
		}
	}
})

// Start the server and listen on the specified port
app.listen(PORT, () => {
	console.log(`Server is running on http://127.0.0.1:${PORT}`)
})
