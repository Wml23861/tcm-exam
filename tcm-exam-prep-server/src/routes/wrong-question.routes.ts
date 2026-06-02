import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import { wrongQuestionService } from '../services/wrong-question.service.js'

const router = Router()
router.use(requireAuth)

// GET /api/wrong-questions
router.get('/wrong-questions', async (req, res, next) => {
  try {
    const records = await wrongQuestionService.findAll(req.userId!, {
      subjectId: req.query.subjectId as string,
      mastered: req.query.mastered ? req.query.mastered === 'true' : undefined,
    })
    res.json({ success: true, data: records })
  } catch (err) {
    next(err)
  }
})

// GET /api/wrong-questions/:questionId
router.get('/wrong-questions/:questionId', async (req, res, next) => {
  try {
    const record = await wrongQuestionService.findByQuestionId(req.userId!, req.params.questionId)
    if (!record) return res.status(404).json({ success: false, error: '错题记录不存在' })
    res.json({ success: true, data: record })
  } catch (err) {
    next(err)
  }
})

// POST /api/wrong-questions
router.post('/wrong-questions', async (req, res, next) => {
  try {
    const record = await wrongQuestionService.upsert(req.userId!, req.body)
    res.status(201).json({ success: true, data: record })
  } catch (err) {
    next(err)
  }
})

// PUT /api/wrong-questions/:id
router.put('/wrong-questions/:id', async (req, res, next) => {
  try {
    const record = await wrongQuestionService.upsert(req.userId!, { ...req.body, id: req.params.id })
    res.json({ success: true, data: record })
  } catch (err) {
    next(err)
  }
})

// DELETE /api/wrong-questions/:id
router.delete('/wrong-questions/:id', async (req, res, next) => {
  try {
    await wrongQuestionService.delete(req.userId!, req.params.id)
    res.status(204).send()
  } catch (err) {
    next(err)
  }
})

export { router as wrongQuestionRoutes }
