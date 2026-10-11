// Faculty data object
const faculty = {
	'brother-jack': {
		name: 'Brother Jack',
		office: 'STC 392',
		phone: '208-496-1234',
		email: 'jackb@byui.edu',
		department: 'Computer Science',
		title: 'Associate Professor',
	},
	'sister-enkey': {
		name: 'Sister Enkey',
		office: 'STC 394',
		phone: '208-496-2345',
		email: 'enkeys@byui.edu',
		department: 'Computer Science',
		title: 'Assistant Professor',
	},
	'brother-keers': {
		name: 'Brother Keers',
		office: 'STC 390',
		phone: '208-496-3456',
		email: 'keersb@byui.edu',
		department: 'Computer Science',
		title: 'Professor',
	},
	'sister-anderson': {
		name: 'Sister Anderson',
		office: 'MC 301',
		phone: '208-496-4567',
		email: 'andersons@byui.edu',
		department: 'Mathematics',
		title: 'Professor',
	},
	'brother-miller': {
		name: 'Brother Miller',
		office: 'MC 305',
		phone: '208-496-5678',
		email: 'millerb@byui.edu',
		department: 'Mathematics',
		title: 'Associate Professor',
	},
	'brother-thompson': {
		name: 'Brother Thompson',
		office: 'MC 307',
		phone: '208-496-6789',
		email: 'thompsonb@byui.edu',
		department: 'Mathematics',
		title: 'Assistant Professor',
	},
	'brother-davis': {
		name: 'Brother Davis',
		office: 'GEB 205',
		phone: '208-496-7890',
		email: 'davisb@byui.edu',
		department: 'English',
		title: 'Professor',
	},
	'brother-wilson': {
		name: 'Brother Wilson',
		office: 'GEB 301',
		phone: '208-496-8901',
		email: 'wilsonb@byui.edu',
		department: 'History',
		title: 'Associate Professor',
	},
	'sister-roberts': {
		name: 'Sister Roberts',
		office: 'GEB 305',
		phone: '208-496-9012',
		email: 'robertss@byui.edu',
		department: 'History',
		title: 'Assistant Professor',
	},
}

const getFacultyById = (facultyId) => {
	return faculty[facultyId] || null
}

const getSortedFaculty = (sortBy) => {
	const facultyArray = []

	for (const key in faculty) {
		facultyArray.push({ ...faculty[key], id: key })
	}

	switch (sortBy) {
		case 'department':
			return facultyArray.sort((a, b) =>
				a.department.localeCompare(b.department),
			)
		case 'title':
			return facultyArray.sort((a, b) => a.title.localeCompare(b.title))
		case 'name':
		default:
			return facultyArray.sort((a, b) => a.name.localeCompare(b.name))
	}
}

export { getFacultyById, getSortedFaculty }
