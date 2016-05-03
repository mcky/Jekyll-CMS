import { Router } from 'express'
import {postController, configController} from '../controllers'

const router = Router()

router.get('/posts', postController.index)

router.route('/posts/:permalink')
	.get(postController.get)
	.put(postController.get, postController.put)

router.route('/settings')
	.get(configController.get)
	.put(configController.put)

router.all('/*', (req, res) => res.json(res.locals.data))

export default router
