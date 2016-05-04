import {getConfig, setConfig} from '../../jekyll-adapters/config'
import db from '../db'

const controller = {

	get: (req, res, next) => {
		// @TODO: Serialize this into database instead of fetching from fs
		db.config.findOne({}, function (err, config) {
			res.locals.data = config
			next()
		})
	},

	put: (req, res, next) => {
		// Blindly applying req.body is a bad idea.
		const currentConfig = res.locals.data
		const newConfig = req.body

		const config = {
			...currentConfig,
			...newConfig,
		}

		setConfig(config)
			.then(() => {
				res.locals.data = config
				next()
			})
			.catch(console.log)
	},

}

export default controller
