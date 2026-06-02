import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { setApiTokenGetter, apiPost, apiGet } from '@/utils/api-client'

interface AuthUser {
  id: string
  username: string
  displayName: string
  role: string
}

interface LoginResponse {
  token: string
  user: AuthUser
}

interface RegisterResponse {
  token: string
  user: AuthUser
}

interface MeResponse {
  id: string
  username: string
  displayName: string
  role: string
}

const TOKEN_KEY = 'tcm_auth_token'

export const useAuthStore = defineStore('auth', () => {
  // ---- state ----
  const token = ref<string | null>(null)
  const user = ref<AuthUser | null>(null)
  const loading = ref(false)

  // ---- getters ----
  const isAuthenticated = computed(() => token.value !== null && user.value !== null)

  // ---- internal helpers ----
  function persistToken(t: string): void {
    token.value = t
    try {
      localStorage.setItem(TOKEN_KEY, t)
    } catch {
      // localStorage unavailable (e.g. private browsing) — non-critical
    }
  }

  function clearToken(): void {
    token.value = null
    try {
      localStorage.removeItem(TOKEN_KEY)
    } catch {
      // ignore
    }
  }

  // ---- actions ----
  async function login(username: string, password: string): Promise<AuthUser> {
    loading.value = true
    try {
      const data = await apiPost<LoginResponse>('/api/auth/login', { username, password })
      persistToken(data.token)
      user.value = data.user
      return data.user
    } finally {
      loading.value = false
    }
  }

  async function register(username: string, password: string, displayName: string): Promise<AuthUser> {
    loading.value = true
    try {
      const data = await apiPost<RegisterResponse>('/api/auth/register', {
        username,
        password,
        displayName,
      })
      persistToken(data.token)
      user.value = data.user
      return data.user
    } finally {
      loading.value = false
    }
  }

  function logout(): void {
    clearToken()
    user.value = null
  }

  async function checkAuth(): Promise<boolean> {
    const storedToken = ((): string | null => {
      try {
        return localStorage.getItem(TOKEN_KEY)
      } catch {
        return null
      }
    })()

    if (!storedToken) {
      clearToken()
      return false
    }

    // Temporarily set token so apiGet can use it
    const previousToken = token.value
    token.value = storedToken

    try {
      const data = await apiGet<MeResponse>('/api/auth/me')
      user.value = {
        id: data.id,
        username: data.username,
        displayName: data.displayName,
        role: data.role,
      }
      persistToken(storedToken)
      return true
    } catch {
      clearToken()
      return false
    } finally {
      // Restore previous token if it was different (shouldn't happen, but safe)
      if (token.value === storedToken && previousToken !== storedToken) {
        // token was set by persistToken above on success, or clearToken on failure
        // nothing to do
      }
    }
  }

  // ---- initialization ----
  // Restore token from localStorage so apiGet tokenGetter can use it immediately
  function initFromStorage(): void {
    try {
      const stored = localStorage.getItem(TOKEN_KEY)
      if (stored) {
        token.value = stored
      }
    } catch {
      // ignore
    }
  }

  // Register token getter with api-client so all requests carry the token
  setApiTokenGetter(() => token.value)

  // Load persisted token into memory (user data is loaded via checkAuth)
  initFromStorage()

  return {
    // state
    token,
    user,
    loading,
    // getters
    isAuthenticated,
    // actions
    login,
    register,
    logout,
    checkAuth,
  }
})
