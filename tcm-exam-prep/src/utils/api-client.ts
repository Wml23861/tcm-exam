/** API 基础地址：生产时取环境变量，开发时通过 Vite 代理转发 */
const API_BASE = import.meta.env.VITE_API_BASE || ''

interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  meta?: { total: number; page: number; limit: number }
}

let tokenGetter: (() => string | null) | null = null

/** 注册 token 获取函数 */
export function setApiTokenGetter(fn: () => string | null) {
  tokenGetter = fn
}

export async function apiGet<T>(path: string, params?: Record<string, string>): Promise<T> {
  const base = API_BASE || window.location.origin
  const url = new URL(`${base}${path}`)
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== '') url.searchParams.set(k, v)
    })
  }
  return request<T>(url.toString())
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  return request<T>(`${API_BASE}${path}`, {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export async function apiPut<T>(path: string, body: unknown): Promise<T> {
  return request<T>(`${API_BASE}${path}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  })
}

export async function apiDelete<T>(path: string): Promise<T> {
  return request<T>(`${API_BASE}${path}`, { method: 'DELETE' })
}

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  const token = tokenGetter?.()
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const res = await fetch(url, {
    ...options,
    headers: { ...headers, ...((options?.headers as Record<string, string>) || {}) },
  })

  if (res.status === 204) {
    return undefined as T
  }

  const body: ApiResponse<T> = await res.json()

  if (!res.ok || !body.success) {
    throw new Error(body.error || `请求失败 (${res.status})`)
  }

  return body.data as T
}

/** 导出响应类型供 repositories 使用 */
export type { ApiResponse }
