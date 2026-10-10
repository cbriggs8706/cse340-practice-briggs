/**
 * Helper function to get the current greeting based on the time of day.
 */
const getCurrentGreeting = () => {
	const currentHour = new Date().getHours()

	if (currentHour < 12) {
		return 'Good Morning!'
	}

	if (currentHour < 18) {
		return 'Good Afternoon!'
	}

	return 'Good Evening!'
}

/**
 * Middleware to add local variables to res.locals for use in all templates.
 * Templates can access these values but are not required to use them.
 */
const addLocalVariables = (req, res, next) => {
	// Set current year for use in templates
	res.locals.currentYear = new Date().getFullYear()

	// Make NODE_ENV available to all templates
	res.locals.NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production'

	// Make req.query available to all templates
	res.locals.queryParams = { ...req.query }

	// Set greeting based on time of day
	res.locals.greeting = `<p>${getCurrentGreeting()}</p>`

	// Randomly assign a theme class to the body
	const themes = [
		'blue-theme',
		'green-theme',
		'red-theme',
		'purple-theme',
		'orange-theme',
	]
	const randomTheme = themes[Math.floor(Math.random() * themes.length)]
	res.locals.bodyClass = randomTheme

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
}

export { addLocalVariables }
