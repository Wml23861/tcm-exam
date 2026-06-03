<template>
  <span :class="tagClasses">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String as () => 'key' | 'difficult' | 'high-frequency' | 'predicted' | 'memorize' | 'default' | 'success' | 'warning',
    default: 'default',
  },
  size: {
    type: String as () => 'sm' | 'md',
    default: 'sm',
  },
})

const tagClasses = computed(() => [
  'tcm-tag',
  `tcm-tag--${props.type}`,
  `tcm-tag--${props.size}`,
])
</script>

<style scoped>
.tcm-tag {
  display: inline-flex;
  align-items: center;
  border-radius: var(--tcm-radius-sm);
  font-weight: 500;
  white-space: nowrap;
}

.tcm-tag--sm { padding: 1px 8px; font-size: var(--tcm-font-xs); }
.tcm-tag--md { padding: 2px 12px; font-size: var(--tcm-font-sm); }

.tcm-tag--default { background: var(--tcm-bg-surface); color: var(--tcm-text-secondary); border: 1px solid var(--tcm-border); }
.tcm-tag--key { background: var(--tcm-primary-50); color: var(--tcm-primary-500); border: 1px solid var(--tcm-primary-100); }
.tcm-tag--difficult { background: var(--tcm-warning-bg); color: var(--tcm-warning-text); border: 1px solid var(--tcm-warning-border); }
.tcm-tag--high-frequency { background: var(--tcm-gold-bg); color: var(--tcm-gold-text); border: 1px solid var(--tcm-gold-border); }
.tcm-tag--predicted { background: var(--tcm-success-bg); color: var(--tcm-success-text); border: 1px solid var(--tcm-success-border); }
.tcm-tag--memorize { background: var(--tcm-purple-bg); color: var(--tcm-purple-text); border: 1px solid var(--tcm-purple-border); }
.tcm-tag--success { background: var(--tcm-success-bg); color: var(--tcm-success-text); }
.tcm-tag--warning { background: var(--tcm-warning-bg); color: var(--tcm-warning-text); }
</style>
