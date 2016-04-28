import { Router } from 'express'
import {postController} from '../controllers'

const router = Router()

router.get('/', postController.index)
router.all('/*', (req, res) => res.json(res.locals.data))

export default router
