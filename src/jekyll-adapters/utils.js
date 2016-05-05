import path from 'path'
import mapValues from 'lodash/mapValues'
import nth from 'lodash/nth'

const baseDir = process.env.JEKYLL_DIR

const getAbsolutePath = (...filepaths) => path.join(baseDir, ...filepaths)

const postFormats = {
	'md': 'markdown',
	'markdown': 'markdown',
	'txt': 'plaintext',
	'html': 'html',
}


const directoryStructure = {
	posts: ['_posts', '_drafts'],
	data: '_data',
	config: '_config.yml',
	// @TODO: Pages
	// Pages are either named html files, or folders with indexes
	// eg `$stuff.html` or `$stuff/index.html`
	// Alternative page config here:
	// https://mademistakes.com/articles/using-jekyll-2016/#pages-for-everything-else
}


const absDirectoryStructure = mapValues(directoryStructure, paths => {
	const isArr = Array.isArray(paths)
		, pathArr = isArr ? paths : [paths]
		, absPAths = pathArr.map(p => getAbsolutePath(p))

	return isArr ? absPAths : absPAths[0]
})


// Input  =>  '20156-04-25-some-blog-post-title.md'
// Output <=  '2015/04/25/some-blog-post-title.html'
const permalinkFromFilename = (filepath) => {
	const filename = path.parse(filepath).name
		, [y, m, d, ...nameFragments] = filename.split('-')

	return path.format({
		dir: [y, m, d].join('/'),
		name: nameFragments.join('-'),
		ext:'.html'
	})
}


const generateFilename = (title, ext = '.md') => {
	const timestamp = (new Date())
						.toISOString()
						.slice(0, 10)

	const formattedTitle = title
						.toLowerCase()
						.replace(/[^\w\s]/gi, '')
						.split(' ')
						.slice(0, 3)
						.join('-')

	const name = `${timestamp}-${formattedTitle}`

	return path.format({name, ext})
}


const hasAllowedExtension = (filename) => {
	const extension = path.extname(filename).substr(1)
	return postFormats.hasOwnProperty(extension)
}


const getContentFormat = (extension) => {
	return postFormats[extension.substr(1)] || null
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


const padNewlines = (input) => {
	const firstAndLast = [
		input.slice(0, 1),
		input.slice(-1),
	]

	return firstAndLast.reduce((str, slice, i) => {
		const replacement = (i === 0) ? `\n${str}` : `${str}\n`
		return (slice === '\n') ? str : replacement
	}, input)
}


export {
	baseDir,
	postFormats,
	directoryStructure,
	absDirectoryStructure,

	getAbsolutePath,
	permalinkFromFilename,
	generateFilename,
	hasAllowedExtension,
	getContentFormat,
	formatPostObject,
	padNewlines,
}
