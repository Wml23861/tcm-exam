import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import { settingsService } from '../services/settings.service.js'

const router = Router()
router.use(requireAuth)

// GET /api/settings
router.get('/settings', async (req, res, next) => {
  try {
    const settings = await settingsService.get(req.userId!)
    res.json({ success: true, data: settings })
  } catch (err) {
    next(err)
  }
})

// PUT /api/settings
router.put('/settings', async (req, res, next) => {
  try {
    const settings = await settingsService.update(req.userId!, req.body)
    res.json({ success: true, data: settings })
  } catch (err) {
    next(err)
  }
})

export { router as settingsRoutes }
