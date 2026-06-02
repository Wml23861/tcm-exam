<template>
  <div class="auth-page">
    <!-- 装饰背景 -->
    <div class="auth-bg-pattern"></div>

    <div class="auth-card-wrapper">
      <TcmCard padding="lg" class="auth-card">
        <!-- 标题区域 -->
        <div class="auth-header">
          <div class="auth-icon">&#x262F;</div>
          <h1 class="auth-title">岐黄备考</h1>
          <p class="auth-subtitle">中医执业助理医师考试学习系统</p>
        </div>

        <!-- 分隔装饰 -->
        <div class="auth-divider">
          <span class="auth-divider-line"></span>
          <span class="auth-divider-text">注册账号</span>
          <span class="auth-divider-line"></span>
        </div>

        <!-- 表单 -->
        <form class="auth-form" @submit.prevent="handleRegister">
          <div class="auth-field">
            <label class="auth-label" for="username">用户名</label>
            <input
              id="username"
              v-model="form.username"
              type="text"
              class="auth-input"
              placeholder="至少 2 个字符"
              autocomplete="username"
              :disabled="submitting"
              @input="clearError"
            />
          </div>

          <div class="auth-field">
            <label class="auth-label" for="displayName">昵称</label>
            <input
              id="displayName"
              v-model="form.displayName"
              type="text"
              class="auth-input"
              placeholder="您的称呼（如：仲景传人）"
              autocomplete="name"
              :disabled="submitting"
              @input="clearError"
            />
          </div>

          <div class="auth-field">
            <label class="auth-label" for="password">密码</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              class="auth-input"
              placeholder="至少 6 个字符"
              autocomplete="new-password"
              :disabled="submitting"
              @input="clearError"
            />
          </div>

          <div class="auth-field">
            <label class="auth-label" for="confirmPassword">确认密码</label>
            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              type="password"
              class="auth-input"
              placeholder="再次输入密码"
              autocomplete="new-password"
              :disabled="submitting"
              @input="clearError"
            />
          </div>

          <!-- 错误提示 -->
          <p v-if="errorMessage" class="auth-error">{{ errorMessage }}</p>

          <!-- 注册按钮 -->
          <TcmButton
            variant="primary"
            size="lg"
            block
            :loading="submitting"
            @click="handleRegister"
          >
            注 册
          </TcmButton>
        </form>

        <!-- 底部链接 -->
        <div class="auth-footer">
          <router-link to="/login" class="auth-link">已有账号？去登录</router-link>
        </div>
      </TcmCard>

      <!-- 底部装饰 -->
      <p class="auth-copyright">杏林春暖，橘井泉香</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'
import TcmCard from '@/components/ui/TcmCard.vue'
import TcmButton from '@/components/ui/TcmButton.vue'

const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
  username: '',
  displayName: '',
  password: '',
  confirmPassword: '',
})

const submitting = ref(false)
const errorMessage = ref('')

function clearError(): void {
  errorMessage.value = ''
}

function validate(): string | null {
  if (!form.username.trim()) return '请输入用户名'
  if (form.username.trim().length < 2) return '用户名至少需要 2 个字符'
  if (!form.displayName.trim()) return '请输入昵称'
  if (!form.password) return '请输入密码'
  if (form.password.length < 6) return '密码至少需要 6 个字符'
  if (form.password !== form.confirmPassword) return '两次输入的密码不一致'
  return null
}

async function handleRegister(): Promise<void> {
  const validationError = validate()
  if (validationError) {
    errorMessage.value = validationError
    return
  }

  submitting.value = true
  errorMessage.value = ''

  try {
    await authStore.register(
      form.username.trim(),
      form.password,
      form.displayName.trim(),
    )
    await router.push('/')
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : '注册失败，请稍后重试'
    errorMessage.value = msg
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--tcm-bg-base);
  position: relative;
  overflow: hidden;
}

/* 背景纹理装饰 */
.auth-bg-pattern {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 20% 20%, rgba(192, 57, 43, 0.04) 0%, transparent 50%),
    radial-gradient(circle at 80% 60%, rgba(184, 134, 11, 0.04) 0%, transparent 50%),
    radial-gradient(circle at 50% 80%, rgba(46, 94, 78, 0.03) 0%, transparent 50%);
  pointer-events: none;
}

.auth-card-wrapper {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 420px;
  padding: 0 var(--tcm-space-lg);
}

.auth-card {
  border-color: var(--tcm-border-light);
}

.auth-header {
  text-align: center;
  padding-bottom: var(--tcm-space-md);
}

.auth-icon {
  font-size: 48px;
  color: var(--tcm-primary-500);
  line-height: 1;
  margin-bottom: var(--tcm-space-sm);
}

.auth-title {
  font-family: var(--tcm-font-decorative);
  font-size: var(--tcm-font-3xl);
  color: var(--tcm-text-primary);
  font-weight: 600;
  margin: 0 0 var(--tcm-space-xs) 0;
}

.auth-subtitle {
  font-size: var(--tcm-font-sm);
  color: var(--tcm-text-secondary);
  margin: 0;
}

/* 分隔装饰 */
.auth-divider {
  display: flex;
  align-items: center;
  gap: var(--tcm-space-md);
  margin: var(--tcm-space-lg) 0;
}

.auth-divider-line {
  flex: 1;
  height: 1px;
  background: var(--tcm-border-light);
}

.auth-divider-text {
  font-size: var(--tcm-font-sm);
  color: var(--tcm-text-disabled);
  font-family: var(--tcm-font-decorative);
  white-space: nowrap;
}

/* 表单 */
.auth-form {
  display: flex;
  flex-direction: column;
  gap: var(--tcm-space-base);
}

.auth-field {
  display: flex;
  flex-direction: column;
  gap: var(--tcm-space-xs);
}

.auth-label {
  font-size: var(--tcm-font-sm);
  font-weight: 500;
  color: var(--tcm-text-secondary);
  font-family: var(--tcm-font-decorative);
}

.auth-input {
  width: 100%;
  height: 44px;
  padding: 0 var(--tcm-space-md);
  border: 1px solid var(--tcm-border);
  border-radius: var(--tcm-radius-md);
  background: var(--tcm-bg-elevated);
  font-size: var(--tcm-font-base);
  font-family: var(--tcm-font-family);
  color: var(--tcm-text-primary);
  outline: none;
  transition: border-color var(--tcm-transition-fast);
  box-sizing: border-box;
}

.auth-input::placeholder {
  color: var(--tcm-text-disabled);
}

.auth-input:focus {
  border-color: var(--tcm-primary-500);
  box-shadow: 0 0 0 2px rgba(192, 57, 43, 0.1);
}

.auth-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* 错误提示 */
.auth-error {
  margin: 0;
  padding: var(--tcm-space-sm) var(--tcm-space-md);
  font-size: var(--tcm-font-sm);
  color: var(--tcm-error);
  background: rgba(192, 57, 43, 0.06);
  border-radius: var(--tcm-radius-sm);
  border-left: 3px solid var(--tcm-error);
}

/* 底部 */
.auth-footer {
  text-align: center;
  padding-top: var(--tcm-space-lg);
}

.auth-link {
  font-size: var(--tcm-font-sm);
  color: var(--tcm-text-link);
  text-decoration: none;
  transition: color var(--tcm-transition-fast);
}

.auth-link:hover {
  color: var(--tcm-primary-700);
  text-decoration: underline;
}

/* 底部装饰文字 */
.auth-copyright {
  text-align: center;
  font-family: var(--tcm-font-decorative);
  font-size: var(--tcm-font-sm);
  color: var(--tcm-text-disabled);
  margin-top: var(--tcm-space-xl);
}

/* 响应式 */
@media (max-width: 480px) {
  .auth-card-wrapper {
    padding: 0 var(--tcm-space-md);
  }

  .auth-title {
    font-size: var(--tcm-font-2xl);
  }
}
</style>
