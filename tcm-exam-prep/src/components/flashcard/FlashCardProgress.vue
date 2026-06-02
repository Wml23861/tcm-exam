<template>
  <div class="fc-progress">
    <span class="fc-progress-text">{{ current }} / {{ total }}</span>
    <div class="fc-progress-bar">
      <div class="fc-progress-fill" :style="{ width: `${(current / Math.max(1, total)) * 100}%` }"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  current: number
  total: number
}>()
</script>

<style scoped>
.fc-progress {
  display: flex;
  align-items: center;
  gap: 12px;
}

.fc-progress-text {
  font-size: var(--tcm-font-sm);
  color: var(--tcm-text-secondary);
  min-width: 50px;
}

.fc-progress-bar {
  flex: 1;
  height: 6px;
  background: var(--tcm-bg-surface);
  border-radius: 3px;
  overflow: hidden;
}

.fc-progress-fill {
  height: 100%;
  background: var(--tcm-primary-500);
  border-radius: 3px;
  transition: width 0.3s;
}
</style>
