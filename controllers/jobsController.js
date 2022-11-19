import asyncHandler from 'express-async-handler'
import { Jobs } from '../data/models/jobsModel.js'

// @desc Get jobs
// @route GET /api/jobs
// @access public

export const getJobs = asyncHandler(async (req, res) => {
    const jobs = await Jobs.find()
    res.status(200).json(jobs)

})
