import fs from 'mz/fs'
import path from 'path'
import flatten from 'lodash/flatten'
import last from 'lodash/last'
import frontMatter from 'yaml-front-matter'

// Temporary while rapidly testing
const baseDir = process.env.JEKYLL_DIR

const hasAllowedExtension = (filename) => {
	// @TODO: Just markdown for now - replace with array of allowed
	return path.extname(filename).substr(1) === 'md'
}


const formatPostObject = (name, fullPath = '') => {
	// Naievely assumes posts/drafts are only ever one level deep
	const type = last(fullPath.split(path.sep)).slice(1, -1)
	return {
		path: path.join(fullPath, name),
		type,
		name,
	}
}


const getPostByFilename = (filename, {getLocation} = {getLocation: true}) => {
	return fs.readFile(filename, 'utf8')
		.then(file => {
			const {__content: content, ...info} = frontMatter.loadFront(file)
			return {info, content}
		})
		.then(file => getLocation ? {...file, ...formatPostObject(filename)} : file)
		.catch(console.log)
}


const getPosts = () => {
	const folderPromises = ['posts', 'drafts'].map(folder => {
		const fullPath = path.join(baseDir, `_${folder}`)

		return fs.readdir(fullPath)
				.then(files => files.filter(hasAllowedExtension))
				.then(files => files.map(name => formatPostObject(name, fullPath)))
				.catch(console.log)
	})

	return Promise.all(folderPromises)
			.then(flatten)
			.catch(console.log)
}


const getExpandedPosts = () => {
	return getPosts()
		.then(posts => {
			return Promise.all(posts.map(post => {
				return getPostByFilename(post.path, {getLocation: false})
					.then(fullPost => ({...post, ...fullPost}))
					.catch(console.log)
			}))
	})
}

export {
	formatPostObject,
	getPostByFilename,
	getPosts,
	getExpandedPosts,
}
