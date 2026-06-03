<template>
  <span :class="['tcm-badge', `tcm-badge--${variant}`]">
    <slot />
  </span>
</template>

<script setup lang="ts">
defineProps({
  variant: {
    type: String as () => 'seal' | 'dot' | 'number',
    default: 'seal',
  },
})
</script>

<style scoped>
.tcm-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.tcm-badge--seal {
  width: 52px;
  height: 52px;
  border: 2px solid var(--tcm-primary-500);
  border-radius: 50%;
  color: var(--tcm-primary-500);
  font-family: var(--tcm-font-decorative);
  font-size: var(--tcm-font-lg);
  transform: rotate(-15deg);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--tcm-seal-color) 15%, transparent);
}

.tcm-badge--dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--tcm-primary-500);
}

.tcm-badge--number {
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: 10px;
  background: var(--tcm-primary-500);
  color: var(--tcm-text-on-primary);
  font-size: var(--tcm-font-xs);
  font-weight: 600;
}
</style>
