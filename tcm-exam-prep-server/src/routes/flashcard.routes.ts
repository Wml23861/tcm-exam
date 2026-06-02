import { Router } from 'express'
import { flashcardService } from '../services/flashcard.service.js'

const router = Router()

// GET /api/flashcards
router.get('/', async (req, res, next) => {
  try {
    const filter = {
      subjectId: req.query.subjectId as string | undefined,
      category: req.query.category as string | undefined,
    }
    const flashcards = await flashcardService.findAll(filter)
    res.json({ success: true, data: flashcards })
  } catch (err) {
    next(err)
  }
})

// GET /api/flashcards/:id
router.get('/:id', async (req, res, next) => {
  try {
    const flashcard = await flashcardService.findById(req.params.id)
    if (!flashcard) return res.status(404).json({ success: false, error: '记忆卡片不存在' })
    res.json({ success: true, data: flashcard })
  } catch (err) {
    next(err)
  }
})

export { router as flashcardRoutes }
