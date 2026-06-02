import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import { examService } from '../services/exam.service.js'

const router = Router()
router.use(requireAuth)

// GET /api/exam-records
router.get('/exam-records', async (req, res, next) => {
  try {
    const records = await examService.findAll(req.userId!)
    res.json({ success: true, data: records })
  } catch (err) {
    next(err)
  }
})

// GET /api/exam-records/:id
router.get('/exam-records/:id', async (req, res, next) => {
  try {
    const record = await examService.findById(req.userId!, req.params.id)
    if (!record) return res.status(404).json({ success: false, error: '考试记录不存在' })
    res.json({ success: true, data: record })
  } catch (err) {
    next(err)
  }
})

// POST /api/exam-records
router.post('/exam-records', async (req, res, next) => {
  try {
    const record = await examService.create(req.userId!, req.body)
    res.status(201).json({ success: true, data: record })
  } catch (err) {
    next(err)
  }
})

// PUT /api/exam-records/:id
router.put('/exam-records/:id', async (req, res, next) => {
  try {
    const record = await examService.update(req.userId!, req.params.id, req.body)
    if (!record) return res.status(404).json({ success: false, error: '考试记录不存在' })
    res.json({ success: true, data: record })
  } catch (err) {
    next(err)
  }
})

// DELETE /api/exam-records/:id
router.delete('/exam-records/:id', async (req, res, next) => {
  try {
    await examService.delete(req.userId!, req.params.id)
    res.status(204).send()
  } catch (err) {
    next(err)
  }
})

export { router as examRoutes }
