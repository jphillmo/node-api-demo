import express from 'express'

import { getAPI } from '../controllers/connection.js'

const router = express.Router()

router.get('/api', getAPI)

export default router