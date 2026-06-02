import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { config } from '../config/env.js'

export interface AuthPayload {
  userId: string
  userRole: string
}

declare global {
  namespace Express {
    interface Request {
      userId?: string
      userRole?: string
    }
  }
}

/** 必需认证 — 未登录返回 401 */
export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const token = extractToken(req)
  if (!token) {
    res.status(401).json({ success: false, error: '请先登录' })
    return
  }

  try {
    const payload = jwt.verify(token, config.JWT_SECRET) as AuthPayload
    req.userId = payload.userId
    req.userRole = payload.userRole
    next()
  } catch {
    res.status(401).json({ success: false, error: '登录已过期，请重新登录' })
  }
}

/** 可选认证 — 如果带了 token 就解析，没带也能继续 */
export function optionalAuth(req: Request, _res: Response, next: NextFunction): void {
  const token = extractToken(req)
  if (token) {
    try {
      const payload = jwt.verify(token, config.JWT_SECRET) as AuthPayload
      req.userId = payload.userId
      req.userRole = payload.userRole
    } catch {
      // token 无效也继续，只是不注入 userId
    }
  }
  next()
}

function extractToken(req: Request): string | null {
  const header = req.headers.authorization
  if (!header) return null
  const parts = header.split(' ')
  if (parts.length !== 2 || parts[0] !== 'Bearer') return null
  return parts[1]
}
