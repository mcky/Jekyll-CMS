import _ from 'lodash'

import {getExpandedPosts, createPost, savePost, removePost} from '../../jekyll-adapters/posts'
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
		const post = res.locals.data
		if (!post) {
			res.locals.data = {}
			next()
			return null
		}

		const newPost = {
			...post,
			...req.body,
			info: {
				...post.info,
				...req.body.info,
			},
		}

		savePost(newPost)
			.then(() => {
				res.locals.data = post
				next()
			})
			.catch(console.log)
	},

	delete: (req, res, next) => {
		const post = res.locals.data
		if (!post) {
			res.locals.data = {}
			next()
			return null
		}

		removePost(post)
			.then(f => {
				res.locals.data = {}
				next()
			})
			.catch(console.log)
	},

	post: (req, res, next) => {
		// @TODO: Validation here
		createPost(req.body)
			.then(post => {
				// Should this be returned directly or fetched
				// from the DB based on the permalink?
				res.locals.data = post
				next()
			})
			.catch(console.log)
	},

}

export default controller
