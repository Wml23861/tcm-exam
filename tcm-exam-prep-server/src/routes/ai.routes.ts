import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import { aiService } from '../services/ai.service.js'

const router = Router()
router.use(requireAuth)

// POST /api/ai/chat
router.post('/chat', async (req, res, next) => {
  try {
    const { message, history } = req.body as { message: string; history?: { role: string; content: string }[] }
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ success: false, error: '请输入问题' })
    }

    const reply = await aiService.chat(message, history || [])
    res.json({ success: true, data: { reply } })
  } catch (err) {
    next(err)
  }
})

export { router as aiRoutes }
