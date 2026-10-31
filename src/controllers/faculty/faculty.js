import {
	getFacultyBySlug,
	getSortedFaculty,
} from '../../models/faculty/faculty.js'

const facultyListPage = async (req, res) => {
	const sortBy = req.query.sort || 'name'
	const facultyMembers = await getSortedFaculty(sortBy)
	// console.log(facultyMembers[0])

	res.render('faculty/list', {
		title: 'Faculty Directory',
		faculty: facultyMembers,
		currentSort: sortBy,
	})
}

const facultyDetailPage = async (req, res, next) => {
	const facultySlug = req.params.facultySlug
	const facultyMember = await getFacultyBySlug(facultySlug)

	if (Object.keys(facultyMember).length === 0) {
		const err = new Error(`Faculty member ${facultySlug} not found`)
		err.status = 404
		return next(err)
	}

	res.render('faculty/detail', {
		title: `${facultyMember.name} - ${facultyMember.department}`,
		faculty: facultyMember,
	})
}

export { facultyListPage, facultyDetailPage }
