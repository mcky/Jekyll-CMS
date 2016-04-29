import {getPosts, getExpandedPosts} from '../../jekyll-adapters/posts'
import db from '../db'

const controller = {

	index: (req, res, next) => {
		db.find({}, {content: 0}, function (err, docs) {
			res.locals.data = docs
			next()
		})
	},

	get: (req, res, next) => {
		db.find({'info.permalink': req.params.permalink}, function (err, docs) {
			res.locals.data = docs
			next()
		})
	},

}

export default controller
