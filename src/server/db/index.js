import Datastore from 'nedb'
import {getPosts, getExpandedPosts} from '../../jekyll-adapters/posts'
import './watchers'

// Different datastores for posts, pages, config etc?
// eg db.posts, db.settings
const db = new Datastore()

const bootstrap = () => new Promise((resolve, reject) => {
	getExpandedPosts()
		.then(posts => {
			db.insert(posts, function (err, db) {
				if (err) {
					reject(err)
				} else {
					resolve(db)
				}
			})
		})
		.catch(reject)
})


export {
	bootstrap
}

export default db
