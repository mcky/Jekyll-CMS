import Datastore from 'nedb'
import {getPosts, getExpandedPosts} from '../../jekyll-adapters/posts'
import './watchers'

const db = {}
db.posts = new Datastore()

const bootstrap = () => new Promise((resolve, reject) => {
	getExpandedPosts()
		.then(posts => {
			db.posts.insert(posts, function (err, db) {
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
