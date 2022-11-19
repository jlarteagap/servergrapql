import express from 'express'
const router = new express.Router()

import { getJobs } from '../controllers/jobsController.js'

router.route('/').get(getJobs)

export default router
