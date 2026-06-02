<template>
  <Transition name="fade">
    <div v-if="visible" :class="['tcm-toast', `tcm-toast--${type}`]">
      <span class="tcm-toast-icon">{{ iconChar }}</span>
      <span>{{ message }}</span>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  message: { type: String, default: '' },
  type: {
    type: String as () => 'success' | 'warning' | 'error' | 'info',
    default: 'info',
  },
  visible: { type: Boolean, default: false },
})

const iconChar = computed(() => {
  const icons: Record<string, string> = {
    success: '\u2713',
    warning: '\u26A0',
    error: '\u2717',
    info: '\u2139',
  }
  return icons[props.type] || ''
})
</script>

<style scoped>
.tcm-toast {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: var(--tcm-radius-md);
  font-size: var(--tcm-font-sm);
  box-shadow: var(--tcm-shadow-lg);
  position: fixed;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  white-space: nowrap;
}

.tcm-toast--success { background: #E8F5E9; color: #2E5E4E; border: 1px solid #A5D6A7; }
.tcm-toast--warning { background: #FFF3E0; color: #E65100; border: 1px solid #FFCC80; }
.tcm-toast--error { background: #FDF0ED; color: #C0392B; border: 1px solid #F5C1B6; }
.tcm-toast--info { background: #E3F2FD; color: #4A7C96; border: 1px solid #90CAF9; }

.tcm-toast-icon { font-size: 16px; }
</style>
