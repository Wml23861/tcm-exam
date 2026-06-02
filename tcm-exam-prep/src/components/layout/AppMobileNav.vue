<template>
  <nav class="mobile-nav">
    <router-link
      v-for="item in mobileNavItems"
      :key="item.path"
      :to="item.path"
      class="mobile-nav-item"
      :class="{ 'router-link-active': isActive(item.path) }"
    >
      <span class="mobile-nav-icon" v-html="item.icon"></span>
      <span class="mobile-nav-label">{{ item.label }}</span>
    </router-link>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const mobileNavItems = [
  { path: '/', label: '学习', icon: '&#x2606;' },
  { path: '/subjects', label: '科目', icon: '&#x1F4D6;' },
  { path: '/practice', label: '刷题', icon: '&#x270E;' },
  { path: '/flashcards', label: '闪卡', icon: '&#x1F0CF;' },
  { path: '/recite', label: '背诵', icon: '&#x1F4D6;' },
]

function isActive(path: string): boolean {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>

<style scoped>
.mobile-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 56px;
  display: flex;
  align-items: center;
  background: var(--tcm-bg-elevated);
  border-top: 1px solid var(--tcm-border-light);
  box-shadow: 0 -2px 8px rgba(44, 24, 16, 0.06);
  z-index: 100;
  padding: 0 4px;
}

.mobile-nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 6px 0;
  color: var(--tcm-text-disabled);
  text-decoration: none;
  transition: color 0.2s;
  min-width: 0;
}

.mobile-nav-item.router-link-active {
  color: var(--tcm-primary-500);
}

.mobile-nav-icon {
  font-size: 20px;
}

.mobile-nav-label {
  font-size: 10px;
}
</style>
