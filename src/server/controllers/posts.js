import {getPosts, getExpandedPosts} from '../../jekyll-adapters/posts'
import db from '../db'

const controller = {

	index: (req, res, next) => {
		db.posts.find({}, {content: 0}, function (err, docs) {
			res.locals.data = docs
			next()
		})
	},

	get: (req, res, next) => {
		const {permalink} = req.params

		db.posts.findOne({'info.permalink': permalink}, function (err, docs) {
			if (!err && !docs) {
				db.posts.findOne({
					filename: new RegExp(permalink)
				}, function (err, docs) {
					res.locals.data = docs
					next()
				})
			} else {
				res.locals.data = docs
				next()
			}
		})
	},

}

export default controller
