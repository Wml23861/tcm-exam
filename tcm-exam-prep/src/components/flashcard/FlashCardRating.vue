<template>
  <div class="rating-bar">
    <button class="rating-btn rating-btn--again" @click="$emit('rate', 1)">
      <span class="rating-label">忘记</span>
      <span class="rating-interval">1天</span>
    </button>
    <button class="rating-btn rating-btn--hard" @click="$emit('rate', 3)">
      <span class="rating-label">困难</span>
      <span class="rating-interval">&lt;10分</span>
    </button>
    <button class="rating-btn rating-btn--good" @click="$emit('rate', 4)">
      <span class="rating-label">良好</span>
      <span class="rating-interval">&lt;1天</span>
    </button>
    <button class="rating-btn rating-btn--easy" @click="$emit('rate', 5)">
      <span class="rating-label">简单</span>
      <span class="rating-interval">&gt;3天</span>
    </button>
  </div>
</template>

<script setup lang="ts">
defineEmits<{ rate: [quality: number] }>()
</script>

<style scoped>
.rating-bar {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 24px;
  flex-wrap: wrap;
}

.rating-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 24px;
  border: 2px solid var(--tcm-border);
  border-radius: var(--tcm-radius-md);
  background: var(--tcm-bg-surface);
  cursor: pointer;
  transition: all 0.2s;
  min-width: 80px;
}

.rating-btn:hover {
  transform: translateY(-2px);
}

.rating-btn--again:hover {
  border-color: #E53935;
  background: #FFEBEE;
}

.rating-btn--hard:hover {
  border-color: #F57C00;
  background: #FFF3E0;
}

.rating-btn--good:hover {
  border-color: #43A047;
  background: #E8F5E9;
}

.rating-btn--easy:hover {
  border-color: #1E88E5;
  background: #E3F2FD;
}

.rating-label {
  font-weight: 600;
  font-size: var(--tcm-font-md);
  color: var(--tcm-text-primary);
  margin-bottom: 2px;
}

.rating-interval {
  font-size: var(--tcm-font-xs);
  color: var(--tcm-text-disabled);
}
</style>
