import path from 'path'
import chokidar from 'chokidar'

import db from '../'
import {getPostByFilename, formatPostObject} from '../../../jekyll-adapters/posts'

const dir = process.env.JEKYLL_DIR

// @TOOD: Again, allowed filenames only
// @TODO: Handle file deletes, renames, moves
chokidar.watch(`${dir}/{_drafts,_posts}/*`)
	.on('change', path => {

		getPostByFilename(path)
			.then(fileObj => {
				db.posts.update({'info.permalink': fileObj.info.permalink}, fileObj)
			})
			.catch(console.log)
	})

export default {}
