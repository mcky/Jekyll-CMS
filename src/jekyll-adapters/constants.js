import path from 'path'
import mapValues from 'lodash/mapValues'

const baseDir = process.env.JEKYLL_DIR

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
		, absPAths = pathArr.map(p => path.join(baseDir, p))

	return isArr ? absPAths : absPAths[0]
})

export {
	baseDir,
	postFormats,
	directoryStructure,
	absDirectoryStructure,
}
