<template>
  <div class="tcm-progress">
    <div class="tcm-progress-header" v-if="showLabel">
      <span class="tcm-progress-label">{{ label }}</span>
      <span class="tcm-progress-percent">{{ Math.round(percent) }}%</span>
    </div>
    <div class="tcm-progress-track">
      <div
        class="tcm-progress-fill"
        :style="{ width: `${Math.min(100, Math.max(0, percent))}%`, background: color }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  percent: { type: Number, default: 0 },
  label: { type: String, default: '' },
  showLabel: { type: Boolean, default: true },
  color: { type: String, default: 'var(--tcm-primary-500)' },
})
</script>

<style scoped>
.tcm-progress { width: 100%; }
.tcm-progress-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
}
.tcm-progress-label { font-size: var(--tcm-font-sm); color: var(--tcm-text-secondary); }
.tcm-progress-percent { font-size: var(--tcm-font-sm); color: var(--tcm-text-primary); font-weight: 600; }
.tcm-progress-track {
  height: 8px;
  background: var(--tcm-bg-elevated);
  border-radius: 4px;
  overflow: hidden;
}
.tcm-progress-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.5s ease;
}
</style>
