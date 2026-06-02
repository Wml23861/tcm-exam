import express from 'express'
import cors from 'cors'
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { routes } from './routes/index.js'
import { errorHandler } from './middleware/error-handler.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export function createApp() {
  const app = express()

  app.use(cors())
  app.use(express.json({ limit: '10mb' }))

  // 健康检查
  app.get('/api/health', (_req, res) => {
    res.json({ success: true, data: { status: 'ok' } })
  })

  // 所有业务路由挂载在 /api 下
  app.use('/api', routes)

  // 生产环境：提供前端静态文件
  // 前端构建产物在 ../tcm-exam-prep/dist/ 目录
  const distPath = path.resolve(__dirname, '..', '..', 'tcm-exam-prep', 'dist')
  if (fs.existsSync(distPath)) {
    app.use(express.static(distPath))
    // SPA fallback：所有非 /api 路由返回 index.html
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'))
    })
  }

  // 全局错误处理（必须在路由之后）
  app.use(errorHandler)

  return app
}
