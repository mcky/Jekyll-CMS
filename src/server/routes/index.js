import { Router } from 'express'
import {postController, configController} from '../controllers'

const router = Router()

router.get('/posts', postController.index)
router.get('/posts/:permalink', postController.get)

router.get('/settings', configController.get)

router.all('/*', (req, res) => res.json(res.locals.data))

export default router
