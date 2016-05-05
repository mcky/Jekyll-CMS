import path from 'path'
import _ from 'lodash'
import omit from 'lodash/omit'

import {getAbsolutePath} from '../../jekyll-adapters/utils'
import {getPostByFilename, createPost,
		savePost, removePost, renamePost
} from '../../jekyll-adapters/posts'
import db from '../db'

const delay = (time) => new Promise(resolve => setTimeout(resolve, time))

//@TOOD: Add key sanitisation here
const getProjectionsFromQS = (querystring) => {
	return _(querystring)
		.mapValues(parseInt)
		.omitBy(isNaN)
		.value()
}

const formatParentDir = (dir) => `_${dir}s`


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

	put: (req, res, next) => {
		const post = res.locals.data
		if (!post) {
			res.locals.data = {}
			next()
			return null
		}

		const filteredBody = omit(req.body, ['path', 'filename', 'type', 'formatting'])
		const newPost = {
			...post,
			...filteredBody,
			info: {
				...post.info,
				...req.body.info,
			},
		}

		const filename = req.body.filename || post.filename
			, newParentDir = formatParentDir(req.body.type || post.type)
			, newPath = path.join(newParentDir, filename)

		const filePromises = [savePost(newPost), delay(2000)]

		if (req.body.filename || req.body.type) filePromises.splice(1, 0, renamePost(newPost, newPath))

		Promise.all(filePromises)
			.then(() => {
				// There's a hacky delay before this .then is called
				// to allow fs watches to update the db.
				// Will hopefully find a better solution later.
				const absPath = getAbsolutePath(newPath)
				db.posts.findOne({path: absPath}, (err, docs) => {
					res.locals.data = docs
					next()
				})
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
