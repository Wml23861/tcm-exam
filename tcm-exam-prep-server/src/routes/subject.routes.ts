import { Router } from 'express'
import { subjectService } from '../services/subject.service.js'

const router = Router()

// GET /api/subjects
router.get('/', async (_req, res, next) => {
  try {
    const subjects = await subjectService.findAll()
    res.json({ success: true, data: subjects })
  } catch (err) {
    next(err)
  }
})

// GET /api/subjects/:id
router.get('/:id', async (req, res, next) => {
  try {
    const subject = await subjectService.findById(req.params.id)
    if (!subject) return res.status(404).json({ success: false, error: '科目不存在' })
    res.json({ success: true, data: subject })
  } catch (err) {
    next(err)
  }
})

// GET /api/subjects/:id/chapters
router.get('/:id/chapters', async (req, res, next) => {
  try {
    const chapters = await subjectService.getChapters(req.params.id)
    res.json({ success: true, data: chapters })
  } catch (err) {
    next(err)
  }
})

// GET /api/subjects/:subjectId/chapters/:chapterId
router.get('/:subjectId/chapters/:chapterId', async (req, res, next) => {
  try {
    const chapter = await subjectService.getChapter(req.params.subjectId, req.params.chapterId)
    if (!chapter) return res.status(404).json({ success: false, error: '章节不存在' })
    res.json({ success: true, data: chapter })
  } catch (err) {
    next(err)
  }
})

export { router as subjectRoutes }
