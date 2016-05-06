import path from 'path'
import { Router } from 'express'
import {postController, configController} from '../controllers'
import api from './api'

const router = Router()

router.use('/api', api)

router.get('/*', (req, res) => res.sendFile(path.join(__dirname, '../index.html')))

export default router
