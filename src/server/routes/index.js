import { Router } from 'express'
import {postController, configController} from '../controllers'
import api from './api'

const router = Router()

router.use('/api', api)

export default router
