import fs from 'mz/fs'
import path from 'path'
import flatten from 'lodash/flatten'
import frontMatter from 'yaml-front-matter'

// Temporary while rapidly testing
const baseDir = process.env.JEKYLL_DIR

const hasAllowedExtension = (filename) => {
	// @TODO: Just markdown for now - replace with array of allowed
	return path.extname(filename).substr(1) === 'md'
}

const getPostByFilename = (filename) => {
	return fs.readFile(filename, 'utf8')
		.then(file => {
			const {__content: content, ...info} = frontMatter.loadFront(file)
			return {info, content}
		})
}


const getPosts = () => {
	const folderPromises = ['posts', 'drafts'].map(folder => {
		const fullPath = path.join(baseDir, `_${folder}`)

		return fs.readdir(fullPath)
				.then(files => files.filter(hasAllowedExtension))
				.then(files => files.map(name => ({
					folder,
					name,
					path: path.join(fullPath, name),
				})))
	})

	return Promise.all(folderPromises)
			.then(flatten)
}

const getExpandedPosts = () => {
	return getPosts()
		.then(posts => {
			return Promise.all(posts.map(post => {
				return getPostByFilename(post.path)
					.then(fullPost => ({...post, ...fullPost}))
			}))
	})
}

export {
	getPostByFilename,
	getPosts,
	getExpandedPosts,
}
