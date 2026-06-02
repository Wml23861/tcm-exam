let counter = 0

/** 生成简短唯一 ID（与前端 id-generator 格式一致） */
export function generateId(prefix = 'id'): string {
  counter++
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).slice(2, 6)
  return `${prefix}_${timestamp}${random}${counter}`
}
