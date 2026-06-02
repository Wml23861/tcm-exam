/**
 * Fisher-Yates 洗牌算法
 */
export function shuffle<T>(array: T[]): T[] {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

/**
 * 从数组中随机选取 N 个元素
 */
export function pickRandom<T>(array: T[], count: number): T[] {
  if (count >= array.length) return shuffle(array)
  return shuffle(array).slice(0, count)
}
