import _ from 'lodash'

import {getExpandedPosts, savePost} from '../../jekyll-adapters/posts'
import db from '../db'

//@TOOD: Add key sanitisation here
const getProjectionsFromQS = (querystring) => {
	return _(querystring)
		.mapValues(parseInt)
		.omitBy(isNaN)
		.value()
}


const controller = {

	index: (req, res, next) => {
		const projection = {
			...{content: 0},
			...getProjectionsFromQS(req.query),
		}

		db.posts.find({}, projection, function (err, docs) {
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
			savePost(post)
				.then(() => {
					res.locals.data = post
					next()
				})
				.catch(console.log)
		})
	},

}

export default controller
