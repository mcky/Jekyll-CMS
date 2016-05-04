import { Router } from 'express'
import {postController, configController} from '../controllers'

const router = Router()

router.route('/posts')
	.get(postController.index)
	.post(postController.post)

router.route('/posts/:permalink')
	.get(postController.get)
	.put(postController.get, postController.put)
	.delete(postController.get, postController.delete)

router.route('/settings')
	.get(configController.get)
	.put(configController.get, configController.put)

router.all('/*', (req, res) => res.json(res.locals.data))

export default router
