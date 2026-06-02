import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import { videoService } from '../services/video.service.js'

const router = Router()
router.use(requireAuth)

// GET /api/videos
router.get('/videos', async (req, res, next) => {
  try {
    const videos = await videoService.findAll(req.userId!)
    res.json({ success: true, data: videos })
  } catch (err) {
    next(err)
  }
})

// GET /api/videos/:id
router.get('/videos/:id', async (req, res, next) => {
  try {
    const video = await videoService.findById(req.userId!, req.params.id)
    if (!video) return res.status(404).json({ success: false, error: '视频不存在' })
    res.json({ success: true, data: video })
  } catch (err) {
    next(err)
  }
})

// POST /api/videos
router.post('/videos', async (req, res, next) => {
  try {
    const video = await videoService.upsert(req.userId!, req.body)
    res.status(201).json({ success: true, data: video })
  } catch (err) {
    next(err)
  }
})

// PUT /api/videos/:id
router.put('/videos/:id', async (req, res, next) => {
  try {
    const video = await videoService.upsert(req.userId!, { ...req.body, id: req.params.id })
    res.json({ success: true, data: video })
  } catch (err) {
    next(err)
  }
})

// DELETE /api/videos/:id
router.delete('/videos/:id', async (req, res, next) => {
  try {
    await videoService.delete(req.userId!, req.params.id)
    res.status(204).send()
  } catch (err) {
    next(err)
  }
})

// GET /api/videos/:id/annotations
router.get('/videos/:id/annotations', async (req, res, next) => {
  try {
    const annotations = await videoService.getAnnotations(req.userId!, req.params.id)
    res.json({ success: true, data: annotations })
  } catch (err) {
    next(err)
  }
})

// POST /api/videos/:id/annotations
router.post('/videos/:id/annotations', async (req, res, next) => {
  try {
    const annotation = await videoService.addAnnotation(req.userId!, req.body)
    res.status(201).json({ success: true, data: annotation })
  } catch (err) {
    next(err)
  }
})

// DELETE /api/videos/:vid/annotations/:id
router.delete('/videos/:vid/annotations/:id', async (req, res, next) => {
  try {
    await videoService.deleteAnnotation(req.userId!, req.params.vid, req.params.id)
    res.status(204).send()
  } catch (err) {
    next(err)
  }
})

export { router as videoRoutes }
