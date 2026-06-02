import { Router } from 'express'
import { z } from 'zod'
import { authService } from '../services/auth.service.js'
import { requireAuth } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'

const router = Router()

const loginSchema = z.object({
  username: z.string().min(1, '用户名不能为空'),
  password: z.string().min(1, '密码不能为空'),
})

const registerSchema = z.object({
  username: z.string().min(2, '用户名至少2个字符'),
  password: z.string().min(6, '密码至少6个字符'),
  displayName: z.string().min(1, '昵称不能为空'),
})

router.post('/login', validate(loginSchema), async (req, res, next) => {
  try {
    const { username, password } = req.body
    const result = await authService.login(username, password)
    res.json({ success: true, data: result })
  } catch (err) {
    next(err)
  }
})

router.post('/register', validate(registerSchema), async (req, res, next) => {
  try {
    const { username, password, displayName } = req.body
    const result = await authService.register(username, password, displayName)
    res.status(201).json({ success: true, data: result })
  } catch (err) {
    next(err)
  }
})

router.get('/me', requireAuth, async (req, res, next) => {
  try {
    const user = await authService.getMe(req.userId!)
    res.json({ success: true, data: user })
  } catch (err) {
    next(err)
  }
})

export { router as authRoutes }
