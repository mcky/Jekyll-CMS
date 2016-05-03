import Datastore from 'nedb'
import {getPosts, getExpandedPosts} from '../../jekyll-adapters/posts'
import {getConfig} from '../../jekyll-adapters/config'

import {watchAll} from './watchers'

const db = {}
db.posts = new Datastore()
db.config = new Datastore()

const bootstrapModel = (db, dataPromise) => new Promise((resolve, reject) => {
	dataPromise()
		.then(data => {
			db.insert(data, function (err, data) {
				if (err) {
					reject(err)
				} else {
					resolve(data)
				}
			})
		})
		.catch(reject)
})

const bootstrap = () => new Promise((resolve, reject) => {
	watchAll()
		.then(resolve)
		.catch(reject)
})


export {
	bootstrap
}

export default db
