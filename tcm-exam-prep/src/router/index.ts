import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from './routes'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

const PUBLIC_ROUTES = ['/login', '/register']

router.beforeEach((to, _from) => {
  const isPublic = PUBLIC_ROUTES.includes(to.path)

  if (isPublic) {
    // 已登录则直接跳转到首页
    const token = (() => {
      try { return localStorage.getItem('tcm_auth_token') } catch { return null }
    })()
    if (token) {
      return { path: '/' }
    }
    return true
  }

  // 非公开路由：检查是否已登录
  const token = (() => {
    try { return localStorage.getItem('tcm_auth_token') } catch { return null }
  })()
  if (!token) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }

  return true
})

router.afterEach((to) => {
  document.title = `${to.meta.title || '岐黄备考'} — 中医执业助理医师考试学习系统`
})

export default router
