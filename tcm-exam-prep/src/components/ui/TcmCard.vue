<template>
  <div :class="cardClasses" @click="$emit('click')">
    <div v-if="$slots.header || title" class="tcm-card-header">
      <h3 v-if="title" class="tcm-card-title">{{ title }}</h3>
      <slot name="header" />
    </div>
    <div class="tcm-card-body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="tcm-card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  title: { type: String, default: '' },
  hoverable: { type: Boolean, default: false },
  padding: { type: String, default: 'md' },
})

defineEmits<{ click: [] }>()

const cardClasses = computed(() => [
  'tcm-card',
  `tcm-card--${props.padding}`,
  props.hoverable ? 'tcm-card--hoverable' : '',
])
</script>

<style scoped>
.tcm-card {
  background: var(--tcm-bg-surface);
  border: 1px solid var(--tcm-border-light);
  border-radius: var(--tcm-radius-lg);
  box-shadow: var(--tcm-shadow-md);
  overflow: hidden;
  transition: all var(--tcm-transition-normal);
}

.tcm-card--hoverable:hover {
  box-shadow: var(--tcm-shadow-lg);
  transform: translateY(-2px);
  cursor: pointer;
}

.tcm-card--sm .tcm-card-body { padding: 12px; }
.tcm-card--md .tcm-card-body { padding: 20px; }
.tcm-card--lg .tcm-card-body { padding: 28px; }

.tcm-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px 0;
}

.tcm-card-title {
  font-size: var(--tcm-font-lg);
  font-weight: 600;
  color: var(--tcm-text-primary);
  font-family: var(--tcm-font-decorative);
}

.tcm-card-footer {
  padding: 12px 20px;
  border-top: 1px solid var(--tcm-border-light);
}
</style>
