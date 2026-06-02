import type { Request, Response, NextFunction } from 'express'
import type { ZodSchema } from 'zod'

export function validate(schema: ZodSchema, source: 'body' | 'query' | 'params' = 'body') {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[source])
    if (!result.success) {
      res.status(400).json({
        success: false,
        error: '参数验证失败',
        details: result.error.flatten(),
      })
      return
    }
    // 替换为解析后的数据（带默认值和类型转换）
    ;(req as Record<string, unknown>)[source] = result.data
    next()
  }
}
