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

// Create a new router instance
const router = Router()

// Home and basic pages
router.get('/', homePage)
router.get('/about', aboutPage)
router.get('/student', studentPage)

// Course catalog routes
router.get('/catalog', catalogPage)
router.get('/catalog/departments', courseDepartmentsPage)
router.get('/catalog/:courseId', courseDetailPage)

// Faculty directory routes
router.get('/faculty', facultyListPage)
router.get('/faculty/:facultyId', facultyDetailPage)

// Demo page with special middleware
router.get('/demo', addDemoHeaders, addDemoRequestCount, demoPage)

// Route to trigger a test error
router.get('/test-error', testErrorPage)

export default router
