<template>
  <div class="app-layout" :class="{ 'app-layout--mobile': isMobile }">
    <AppHeader @toggle-sidebar="toggleSidebar" />
    <div class="app-layout-body">
      <AppSidebar
        :collapsed="sidebarCollapsed"
        @close="sidebarCollapsed = true"
      />
      <main class="app-layout-main">
        <div class="app-layout-content">
          <router-view v-slot="{ Component, route }">
            <Transition name="page" mode="out-in">
              <component :is="Component" :key="route.path" />
            </Transition>
          </router-view>
        </div>
      </main>
    </div>
    <AppMobileNav v-if="isMobile" />
    <SearchPanel ref="searchPanelRef" />
    <PomodoroTimer />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import AppHeader from './AppHeader.vue'
import AppSidebar from './AppSidebar.vue'
import AppMobileNav from './AppMobileNav.vue'
import SearchPanel from '@/components/common/SearchPanel.vue'
import PomodoroTimer from '@/components/common/PomodoroTimer.vue'

const isMobile = ref(false)
const sidebarCollapsed = ref(false)
const isTablet = ref(false)
const searchPanelRef = ref<InstanceType<typeof SearchPanel> | null>(null)

function updateBreakpoint() {
  const w = window.innerWidth
  isMobile.value = w < 768
  isTablet.value = w >= 768 && w < 1024
  if (w < 1024) {
    sidebarCollapsed.value = true
  } else {
    sidebarCollapsed.value = false
  }
}

function toggleSidebar() {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

function onGlobalKeydown(e: KeyboardEvent) {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault()
    searchPanelRef.value?.toggle()
  }
}

onMounted(() => {
  updateBreakpoint()
  window.addEventListener('resize', updateBreakpoint)
  document.addEventListener('keydown', onGlobalKeydown)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateBreakpoint)
  document.removeEventListener('keydown', onGlobalKeydown)
})
</script>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--tcm-bg-base);
}

.app-layout-body {
  display: flex;
  flex: 1;
  padding-top: 56px;
}

.app-layout--mobile .app-layout-body {
  padding-bottom: 56px;
}

.app-layout-main {
  flex: 1;
  overflow-y: auto;
  min-height: calc(100vh - 56px);
}

.app-layout--mobile .app-layout-main {
  min-height: calc(100vh - 112px);
}

.app-layout-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  width: 100%;
}

@media (max-width: 768px) {
  .app-layout-content {
    padding: 12px;
  }
}
</style>
