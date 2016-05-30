import fs from 'mz/fs'
import flatten from 'lodash/flatten'
import frontMatter from 'yaml-front-matter'
import yaml from 'js-yaml'

import {baseDir, directoryStructure} from './constants'
import {getAbsolutePath, padNewlines, generateFilename,
		hasAllowedExtension, formatPostObject
} from './utils'


const getPostByFilename = (filename, {getLocation} = {getLocation: true}) => {
	return fs.readFile(filename, 'utf8')
		.then(file => {
			const {__content: content, ...info} = frontMatter.loadFront(file)
			return {info, content}
		})
		.then(file => getLocation ? {...file, ...formatPostObject(filename, file)} : file)
		.catch(console.log)
}


const getPosts = () => {
	const folderPromises = directoryStructure.posts.map(folder => {
		return fs.readdir(getAbsolutePath(folder))
				.then(files => files.filter(hasAllowedExtension))
				.then(files => files.map(name => formatPostObject(getAbsolutePath(name))))
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


const createPost = (inputPost) => {
	const filename = inputPost.filename || generateFilename(inputPost.info.title)

	const postDefaults = {
		type: 'draft',
		content: '',
		info: {},
	}

	const constructedPost = {
		...postDefaults,
		...inputPost,
		info: {
			...postDefaults.info,
			...inputPost.info,
		}
	}

	const parentDir = `_${constructedPost.type}s`
		, filePath = getAbsolutePath(parentDir, filename)

	const post = {
		...constructedPost,
		path: filePath,
	}

	return savePost(post)
		.then(() => getPostByFilename(filePath))
		.catch(console.log)
}


const savePost = (post) => {
	const frontMatter = yaml.safeDump(post.info)
		, content = padNewlines(post.content)
		, toWrite =`---\n${frontMatter}---${content}`

	return fs.writeFile(post.path, toWrite, 'utf8')
		.catch(console.log)
}


const renamePost = (post, path) => {
	return fs.rename(post.path, getAbsolutePath(path))
		.catch(console.log)
}


const removePost = (post) => {
	return fs.unlink(post.path)
		.catch(console.log)
}


export {
	formatPostObject,
	getPostByFilename,
	getPosts,
	getExpandedPosts,
	createPost,
	savePost,
	renamePost,
	removePost,
}
