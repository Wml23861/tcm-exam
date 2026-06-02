/**
 * 生成唯一 ID
 * 简洁实现，不依赖外部库
 */

let counter = 0

export function generateId(prefix = ''): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 8)
  const count = (counter++).toString(36)
  return `${prefix}${timestamp}${random}${count}`
}
