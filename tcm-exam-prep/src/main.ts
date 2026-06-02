import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { pinia } from './stores'
import { useAuthStore } from './stores/useAuthStore'
import './style.css'

async function bootstrap(): Promise<void> {
  const app = createApp(App)
  app.use(pinia)

  // 验证已存储的 token 是否仍然有效
  const authStore = useAuthStore()
  if (authStore.token) {
    try {
      await authStore.checkAuth()
    } catch {
      // checkAuth 内部已清除无效 token，忽略额外错误
    }
  }

  app.use(router)
  app.mount('#app')
}

void bootstrap()
