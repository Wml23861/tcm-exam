<template>
  <router-view />
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'
import { useSettingsStore } from '@/stores/useSettingsStore'

const authStore = useAuthStore()
const settingsStore = useSettingsStore()

// 登录成功后加载用户设置
watch(
  () => authStore.isAuthenticated,
  (authenticated) => {
    if (authenticated) {
      settingsStore.loadSettings()
    }
  },
  { immediate: true }
)
</script>
