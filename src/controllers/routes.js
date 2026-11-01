import { Router } from 'express'
import {
	addDemoHeaders,
	addDemoRequestCount,
} from '../middleware/demo/headers.js'
import {
	catalogPage,
	courseDetailPage,
	courseDepartmentsPage,
} from './catalog/catalog.js'
import {
	homePage,
	aboutPage,
	demoPage,
	testErrorPage,
	studentPage,
} from './index.js'
import { facultyListPage, facultyDetailPage } from './faculty/faculty.js'
import contactRoutes from './forms/contact.js'
import registrationRoutes from './forms/registration.js'

// Create a new router instance
const router = Router()

// Add catalog-specific styles to all catalog routes
router.use('/catalog', (req, res, next) => {
	res.addStyle('<link rel="stylesheet" href="/css/catalog.css">')
	next()
})
router.use('/faculty', (req, res, next) => {
	res.addStyle('<link rel="stylesheet" href="/css/faculty.css">')
	next()
})
// Add contact-specific styles to all contact routes
router.use('/contact', (req, res, next) => {
	res.addStyle('<link rel="stylesheet" href="/css/contact.css">')
	next()
})
// Contact form routes
router.use('/contact', contactRoutes)

// Add registration-specific styles to all registration routes
router.use('/register', (req, res, next) => {
	res.addStyle('<link rel="stylesheet" href="/css/registration.css">')
	next()
})

// Registration routes
router.use('/register', registrationRoutes)

// Home and basic pages
router.get('/', homePage)
router.get('/about', aboutPage)
router.get('/student', studentPage)

// Course catalog routes
router.get('/catalog', catalogPage)
router.get('/catalog/departments', courseDepartmentsPage)
router.get('/catalog/:courseSlug', courseDetailPage)

// Faculty directory routes
router.get('/faculty', facultyListPage)
router.get('/faculty/:facultySlug', facultyDetailPage)

// Demo page with special middleware
router.get('/demo', addDemoHeaders, addDemoRequestCount, demoPage)

// Route to trigger a test error
router.get('/test-error', testErrorPage)

export default router
