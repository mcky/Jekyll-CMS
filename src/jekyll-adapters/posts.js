import fs from 'mz/fs'
import path from 'path'
import flatten from 'lodash/flatten'
import nth from 'lodash/nth'
import frontMatter from 'yaml-front-matter'
import yaml from 'js-yaml'

import {padNewlines} from './utils'

// Temporary while rapidly testing
const baseDir = process.env.JEKYLL_DIR

const formats = {
	'md': 'markdown',
	'markdown': 'markdown',
	'txt': 'plaintext',
}

const hasAllowedExtension = (filename) => {
	const extension = path.extname(filename).substr(1)
	return formats.hasOwnProperty(extension)
}

const getContentFormat = (extension) => {
	return formats[extension.substr(1)] || null
}

const formatPostObject = (postPath) => {
	// Naievely assumes posts/drafts are only ever one level deep
	const type = nth(postPath.split(path.sep), -2).slice(1, -1)
		, pathObj = path.parse(postPath)

	return {
		path: postPath,
		filename: pathObj.base,
		formatting: getContentFormat(pathObj.ext),
		type,
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
				.then(files => files.map(name => formatPostObject(path.join(fullPath, name))))
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

const savePost = (post) => {
	const frontMatter = yaml.safeDump(post.info)
		, content = padNewlines(post.content)
		, toWrite =`---\n${frontMatter}---${content}`

	return fs.writeFile(post.path, toWrite, 'utf8')
		.catch(console.log)
}

export {
	formatPostObject,
	getPostByFilename,
	getPosts,
	getExpandedPosts,
	savePost,
}
