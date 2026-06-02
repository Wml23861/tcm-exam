<template>
  <div class="tcm-empty">
    <div class="tcm-empty-icon">&#x7A7A;</div>
    <p class="tcm-empty-text">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  description: { type: String, default: '暂无数据' },
})
</script>

<style scoped>
.tcm-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
}
.tcm-empty-icon {
  font-size: 64px;
  color: var(--tcm-border);
  font-family: var(--tcm-font-decorative);
  margin-bottom: 16px;
  opacity: 0.6;
}
.tcm-empty-text {
  color: var(--tcm-text-disabled);
  font-size: var(--tcm-font-base);
}
</style>
