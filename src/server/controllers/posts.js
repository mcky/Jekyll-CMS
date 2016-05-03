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

	//@TODO: Inneficiently querying twice here via middleware.
	//		 Querying should probably be abstracted.
	put: (req, res, next) => {
		const {_id, info: oldInfo} = res.locals.data
		const {info: newInfo, ...body} = req.body

		const hasInfo = req.body.hasOwnProperty('info')

		const toSet = !hasInfo ? body : {
			...body,
			info: {
				...oldInfo,
				...newInfo,
			},
		}

		db.posts.update({_id}, {$set: toSet}, {returnUpdatedDocs: true}, (err, num, post) => {
			res.locals.data = post
			next()
		})
	},

}

export default controller
