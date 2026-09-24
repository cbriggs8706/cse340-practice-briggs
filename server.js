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

// Create an instance of an Express application
const app = express()

/**
 * Configure Express middleware
 */

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')))

// Set EJS as the templating engine
app.set('view engine', 'ejs')

// Tell Express where to find your templates
app.set('views', path.join(__dirname, 'src/views'))

// Define a route handler for the root URL ('/')

/**
 * Routes
 */
app.get('/', (req, res) => {
	const title = 'Welcome Home'
	// res.sendFile(path.join(__dirname, 'src/views/home.html'))
	res.render('home', { title })
})

app.get('/about', (req, res) => {
	const title = 'About Me'
	// res.sendFile(path.join(__dirname, 'src/views/about.html'))
	res.render('about', { title })
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

// Start the server and listen on the specified port
app.listen(PORT, () => {
	console.log(`Server is running on http://127.0.0.1:${PORT}`)
})
