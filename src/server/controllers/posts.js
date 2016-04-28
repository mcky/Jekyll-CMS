const controller = {

	index: (req, res, next) => {
		res.locals.data = {}
		next()
	},

}

export default controller
