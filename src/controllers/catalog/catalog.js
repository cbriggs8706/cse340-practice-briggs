import { getAllCourses, getCourseBySlug } from '../../models/catalog/courses.js'
import { getSectionsByCourseSlug } from '../../models/catalog/catalog.js'
import { getSortedFaculty } from '../../models/faculty/faculty.js'

// Route handler for the course catalog list page
const catalogPage = async (req, res) => {
	// Model functions are async, so we must await them
	const selectedProfessor = req.query.professor || 'all'
	const courses = await getAllCourses('department', selectedProfessor)
	const professors = await getSortedFaculty('name')
	const selectedCredits = req.query.credits || 'all'
	const filteredCourses =
		selectedCredits === 'all'
			? courses
			: courses.filter(
					(course) => course.creditHours === Number(selectedCredits),
				)
	// console.log(req.query)
	// console.log(courses[0])

	res.render('catalog/list', {
		title: 'Course Catalog',
		courses: filteredCourses,
		professors: professors,
	})
}

// Route handler for individual course detail pages
const courseDetailPage = async (req, res, next) => {
	const courseSlug = req.params.courseSlug

	// Model functions are async, so we must await them
	const course = await getCourseBySlug(courseSlug)

	// Our model returns empty object {} when not found, not null
	// Check if the object is empty using Object.keys()
	if (Object.keys(course).length === 0) {
		const err = new Error(`Course ${courseSlug} not found`)
		err.status = 404
		return next(err)
	}

	// Get sections (course offerings) separately from the catalog
	// Pass the sortBy parameter directly to the model - PostgreSQL handles the sorting
	const sortBy = req.query.sort || 'time'
	const sections = await getSectionsByCourseSlug(courseSlug, sortBy)

	// console.log(course)
	// console.log(sections)

	res.render('catalog/detail', {
		title: `${course.courseCode} - ${course.name}`,
		course: course,
		sections: sections,
		currentSort: sortBy,
	})
}

const courseDepartmentsPage = async (req, res) => {
	const selectedProfessor = req.query.professor || 'all'
	const courses = await getAllCourses('department', selectedProfessor)
	const professors = await getSortedFaculty('name')
	const selectedCredits = req.query.credits || 'all'

	const filteredCourses =
		selectedCredits === 'all'
			? courses
			: courses.filter(
					(course) => course.creditHours === Number(selectedCredits),
				)

	const departments = {}

	filteredCourses.forEach((course) => {
		if (!departments[course.department]) {
			departments[course.department] = []
		}

		departments[course.department].push(course)
	})

	res.render('course-departments', {
		title: 'Courses by Department',
		departments: departments,
		professors: professors,
	})
}

export { catalogPage, courseDetailPage, courseDepartmentsPage }
