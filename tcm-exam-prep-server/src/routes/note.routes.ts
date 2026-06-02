import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import { noteService } from '../services/note.service.js'

const router = Router()
router.use(requireAuth)

// GET /api/notes
router.get('/notes', async (req, res, next) => {
  try {
    let notes
    if (req.query.knowledgePointId) {
      notes = await noteService.findByKnowledgePoint(req.userId!, req.query.knowledgePointId as string)
    } else if (req.query.questionId) {
      notes = await noteService.findByQuestion(req.userId!, req.query.questionId as string)
    } else {
      notes = await noteService.findAll(req.userId!)
    }
    res.json({ success: true, data: notes })
  } catch (err) {
    next(err)
  }
})

// POST /api/notes
router.post('/notes', async (req, res, next) => {
  try {
    const note = await noteService.upsert(req.userId!, req.body)
    res.status(201).json({ success: true, data: note })
  } catch (err) {
    next(err)
  }
})

// PUT /api/notes/:id
router.put('/notes/:id', async (req, res, next) => {
  try {
    const note = await noteService.upsert(req.userId!, { ...req.body, id: req.params.id })
    res.json({ success: true, data: note })
  } catch (err) {
    next(err)
  }
})

// DELETE /api/notes/:id
router.delete('/notes/:id', async (req, res, next) => {
  try {
    await noteService.delete(req.userId!, req.params.id)
    res.status(204).send()
  } catch (err) {
    next(err)
  }
})

export { router as noteRoutes }
