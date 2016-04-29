import {getConfig} from '../../jekyll-adapters/config'
import db from '../db'

const controller = {

	get: (req, res, next) => {
		// @TODO: Serialize this into database instead of fetching from fs
		db.config.find({}, function (err, config) {
			res.locals.data = config
			next()
		})
	},

}

export default controller
