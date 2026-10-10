// Route handlers for static pages
const homePage = (req, res) => {
	res.render('home', { title: 'Home' })
}

const aboutPage = (req, res) => {
	res.render('about', { title: 'About' })
}

const demoPage = (req, res) => {
	res.render('demo', { title: 'Middleware Demo Page' })
}

const testErrorPage = (req, res, next) => {
	const err = new Error('This is a test error')
	err.status = 500
	next(err)
}

const studentPage = (req, res) => {
	const name = 'Cameron Briggs'
	const id = '123456'
	const email = 'bri06021@byui.edu'
	const address = 'PO Box 242, Malta, ID 83342'
	const title = 'Student Information'
	res.render('student', { name, id, email, address, title })
}

export { homePage, aboutPage, demoPage, testErrorPage, studentPage }
