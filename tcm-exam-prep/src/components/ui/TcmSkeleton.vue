<template>
  <div :class="['tcm-skeleton', `tcm-skeleton--${variant}`]">
    <div class="tcm-skeleton-shimmer"></div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  variant: {
    type: String as () => 'text' | 'card' | 'circle' | 'rect',
    default: 'text',
  },
})
</script>

<style scoped>
.tcm-skeleton {
  background: var(--tcm-bg-surface);
  border-radius: var(--tcm-radius-md);
  overflow: hidden;
  position: relative;
}

.tcm-skeleton--text { height: 16px; width: 100%; }
.tcm-skeleton--card { height: 120px; width: 100%; }
.tcm-skeleton--circle { height: 48px; width: 48px; border-radius: 50%; }
.tcm-skeleton--rect { height: 200px; width: 100%; }

.tcm-skeleton-shimmer {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--tcm-bg-elevated) 50%,
    transparent 100%
  );
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
</style>
