import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import { studyService } from '../services/study.service.js'

const router = Router()
router.use(requireAuth)

// GET /api/study-records
router.get('/study-records', async (req, res, next) => {
  try {
    const records = req.query.subjectId
      ? await studyService.getRecordsBySubject(req.userId!, req.query.subjectId as string)
      : await studyService.getAllRecords(req.userId!)
    res.json({ success: true, data: records })
  } catch (err) {
    next(err)
  }
})

// GET /api/study-records/:itemType/:itemId
router.get('/study-records/:itemType/:itemId', async (req, res, next) => {
  try {
    const record = await studyService.getRecord(
      req.userId!, req.params.itemType, req.params.itemId,
    )
    res.json({ success: true, data: record || null })
  } catch (err) {
    next(err)
  }
})

// POST /api/study-records
router.post('/study-records', async (req, res, next) => {
  try {
    const record = await studyService.upsertRecord(req.userId!, req.body)
    res.status(201).json({ success: true, data: record })
  } catch (err) {
    next(err)
  }
})

// GET /api/review-schedules
router.get('/review-schedules', async (req, res, next) => {
  try {
    const due = req.query.due === 'true'
    const schedules = due
      ? await studyService.getDueReviews(req.userId!, req.query.subjectId as string)
      : await studyService.getAllSchedules(req.userId!)
    res.json({ success: true, data: schedules })
  } catch (err) {
    next(err)
  }
})

// GET /api/review-schedules/:itemType/:itemId
router.get('/review-schedules/:itemType/:itemId', async (req, res, next) => {
  try {
    const schedule = await studyService.getSchedule(
      req.userId!, req.params.itemType, req.params.itemId,
    )
    res.json({ success: true, data: schedule || null })
  } catch (err) {
    next(err)
  }
})

// POST /api/review-schedules
router.post('/review-schedules', async (req, res, next) => {
  try {
    const schedule = await studyService.upsertSchedule(req.userId!, req.body)
    res.status(201).json({ success: true, data: schedule })
  } catch (err) {
    next(err)
  }
})

export { router as studyRoutes }
