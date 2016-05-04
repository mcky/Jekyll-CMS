import path from 'path'
import chokidar from 'chokidar'

import db from '../'
import {getPostByFilename, formatPostObject} from '../../../jekyll-adapters/posts'
import {getConfig} from '../../../jekyll-adapters/config'

const dir = process.env.JEKYLL_DIR

// @TOOD: Again, allowed filenames only
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
		.on('unlink', path => db.posts.remove({path}))
		.on('ready', resolve)
})


const watchConfig = () => new Promise((resolve, reject) => {

	chokidar.watch(path.join(dir, '_config.yml'))
		.on('change', path => {
			getConfig(path)
				.then(config => db.config.update({}, config))
				.catch(console.log)
		})
		.on('add', path => {
			getConfig(path)
				.then(config => db.config.insert(config))
				.catch(console.log)
		})
		.on('unlink', path => db.config.remove({}))
		.on('ready', resolve)
})

const watchAll = () => new Promise((resolve, reject) => {
	Promise.all([watchPosts(), watchConfig()])
		.then(resolve)
		.catch(reject)
})

export {
	watchAll,
	watchPosts,
}
