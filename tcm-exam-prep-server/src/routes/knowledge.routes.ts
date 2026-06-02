import { Router } from 'express'
import { subjectService } from '../services/subject.service.js'

const router = Router()

// GET /api/chapters/:id/sections
router.get('/chapters/:id/sections', async (req, res, next) => {
  try {
    const sections = await subjectService.getSections(req.params.id)
    res.json({ success: true, data: sections })
  } catch (err) {
    next(err)
  }
})

// GET /api/sections/:id
router.get('/sections/:id', async (req, res, next) => {
  try {
    const section = await subjectService.getSection(req.params.id)
    if (!section) return res.status(404).json({ success: false, error: '小节不存在' })
    res.json({ success: true, data: section })
  } catch (err) {
    next(err)
  }
})

// GET /api/knowledge-points
router.get('/knowledge-points', async (req, res, next) => {
  try {
    const { subjectId, chapterId, sectionId } = req.query as Record<string, string>
    const points = await subjectService.getKnowledgePoints({ subjectId, chapterId, sectionId })
    res.json({ success: true, data: points })
  } catch (err) {
    next(err)
  }
})

// GET /api/knowledge-points/:id
router.get('/knowledge-points/:id', async (req, res, next) => {
  try {
    const point = await subjectService.getKnowledgePoint(req.params.id)
    if (!point) return res.status(404).json({ success: false, error: '知识点不存在' })
    res.json({ success: true, data: point })
  } catch (err) {
    next(err)
  }
})

export { router as knowledgeRoutes }
