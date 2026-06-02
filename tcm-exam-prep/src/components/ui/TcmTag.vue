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
.tcm-tag--key { background: #FDF0ED; color: #C0392B; border: 1px solid #F5C1B6; }
.tcm-tag--difficult { background: #FFF3E0; color: #E65100; border: 1px solid #FFCC80; }
.tcm-tag--high-frequency { background: #FFF8E1; color: #B8860B; border: 1px solid #FFE082; }
.tcm-tag--predicted { background: #E8F5E9; color: #2E5E4E; border: 1px solid #A5D6A7; }
.tcm-tag--memorize { background: #EDE7F6; color: #4527A0; border: 1px solid #B39DDB; }
.tcm-tag--success { background: #E8F5E9; color: #2E5E4E; }
.tcm-tag--warning { background: #FFF3E0; color: #E65100; }
</style>
