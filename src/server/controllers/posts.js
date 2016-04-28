import {getPosts} from '../../jekyll-adapters/posts'

const controller = {

	index: (req, res, next) => {
		getPosts()
		.then(files => {
			res.locals.data = files
			next()
		})
		.catch(console.log)

	},

}

export default controller
