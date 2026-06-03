<template>
  <div class="fc-progress">
    <span class="fc-progress-label">进度</span>
    <div class="fc-progress-bar">
      <div class="fc-progress-fill" :style="{ width: `${percent}%` }"></div>
    </div>
    <span class="fc-progress-text">{{ current }}<span class="fc-progress-total"> / {{ total }}</span></span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ current: number; total: number }>()
const percent = computed(() => (props.current / Math.max(1, props.total)) * 100)
</script>

<style scoped>
.fc-progress {
  display: flex;
  align-items: center;
  gap: 14px;
}

.fc-progress-label {
  font-size: 13px;
  color: #aaa;
  min-width: 28px;
}

.fc-progress-bar {
  flex: 1;
  height: 8px;
  background: #f0ebe0;
  border-radius: 4px;
  overflow: hidden;
}

.fc-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #c9a96e, #b8860b);
  border-radius: 4px;
  transition: width 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.fc-progress-text {
  font-size: 14px;
  font-weight: 600;
  color: #3d3027;
}

.fc-progress-total {
  font-weight: 400;
  color: #bbb;
}
</style>
