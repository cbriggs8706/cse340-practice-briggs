import {
	getAllCourses,
	getCourseById,
	getSortedSections,
	getCoursesByDepartment,
	getCoursesByCredits,
	getCoursesByProfessor,
} from '../../models/catalog/catalog.js'

// Route handler for the course catalog list page
const catalogPage = (req, res) => {
	const courses = getCoursesByCredits(req.query.credits || 'all')
	const filteredCourses = getCoursesByProfessor(
		req.query.professor || 'all',
		courses,
	)
	res.render('catalog', {
		title: 'Course Catalog',
		courses: filteredCourses,
	})
}

// Route handler for the course catalog by department page
const courseDepartmentsPage = (req, res) => {
	const coursesToGroup = getCoursesByCredits(req.query.credits || 'all')
	const filteredCourses = getCoursesByProfessor(
		req.query.professor || 'all',
		coursesToGroup,
	)
	const departments = getCoursesByDepartment(filteredCourses)
	res.render('course-departments', {
		title: 'Courses by Department',
		departments: departments,
	})
}

// Route handler for individual course detail pages
const courseDetailPage = (req, res, next) => {
	const courseId = req.params.courseId
	const course = getCourseById(courseId)

	// If course doesn't exist, create 404 error
	if (!course) {
		const err = new Error(`Course ${courseId} not found`)
		err.status = 404
		return next(err)
	}

	// Handle sorting if requested
	const sortBy = req.query.sort || 'time'
	const sortedSections = getSortedSections(course.sections, sortBy)

	res.render('course-detail', {
		title: `${course.id} - ${course.title}`,
		course: { ...course, sections: sortedSections },
		currentSort: sortBy,
	})
}

export { catalogPage, courseDetailPage, courseDepartmentsPage }
