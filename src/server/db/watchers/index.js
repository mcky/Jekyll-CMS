import path from 'path'
import chokidar from 'chokidar'

import db from '../'
import {getPostByFilename, formatPostObject} from '../../../jekyll-adapters/posts'

const dir = process.env.JEKYLL_DIR

// @TOOD: Again, allowed filenames only
// @TODO: Handle file deletes, renames, moves
const watchPosts = () => new Promise((resolve, reject) => {

	chokidar.watch(`${dir}/{_drafts,_posts}/*`)
		.on('change', path => {
			getPostByFilename(path)
				.then(fileObj => {
					db.posts.update({'path': fileObj.path}, fileObj)
				})
				.catch(console.log)
		})
		.on('add', path => {
			getPostByFilename(path)
				.then(fileObj => db.posts.insert(fileObj))
				.catch(console.log)
		})
		.on('ready', resolve)
})

const watchAll = () => new Promise((resolve, reject) => {
	Promise.all([watchPosts()])
		.then(resolve)
		.catch(reject)
})

export {
	watchAll,
	watchPosts,
}
