/** 将 SQLite TEXT 列解析为 JSON */
export function parseJson<T>(value: string | null | undefined, fallback: T): T {
  if (!value || value === '') return fallback
  try {
    return JSON.parse(value) as T
  } catch {
    return fallback
  }
}

/** 将对象序列化为 JSON 字符串，用于存入 SQLite TEXT 列 */
export function toJson(value: unknown): string {
  return JSON.stringify(value)
}
