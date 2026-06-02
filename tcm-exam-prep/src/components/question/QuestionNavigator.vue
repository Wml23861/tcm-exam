<template>
  <div class="q-nav">
    <div class="q-nav-grid">
      <button
        v-for="(status, idx) in questionStatuses"
        :key="idx"
        :class="['q-nav-btn', `q-nav-btn--${status}`, { active: idx === currentIndex }]"
        @click="$emit('go', idx)"
      >
        {{ idx + 1 }}
      </button>
    </div>
    <div class="q-nav-legend">
      <span class="legend-item"><span class="legend-dot legend-dot--unanswered"></span>未答</span>
      <span class="legend-item"><span class="legend-dot legend-dot--answered"></span>已答</span>
      <span class="legend-item"><span class="legend-dot legend-dot--marked"></span>标记</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  questionStatuses: ('unanswered' | 'answered' | 'marked')[]
  currentIndex: number
}>()
defineEmits<{ go: [index: number] }>()
</script>

<style scoped>
.q-nav { padding: 16px; background: var(--tcm-bg-surface); border-radius: var(--tcm-radius-md); }
.q-nav-grid { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px; }
.q-nav-btn {
  width: 32px; height: 32px; border: 1px solid var(--tcm-border);
  border-radius: var(--tcm-radius-sm); font-size: var(--tcm-font-xs);
  cursor: pointer; transition: all 0.15s; display: flex;
  align-items: center; justify-content: center;
}
.q-nav-btn--unanswered { background: var(--tcm-bg-base); color: var(--tcm-text-disabled); }
.q-nav-btn--answered { background: #E8F5E9; color: var(--tcm-jade-500); border-color: #A5D6A7; }
.q-nav-btn--marked { background: #FFF8E1; color: var(--tcm-gold-500); border-color: #FFE082; }
.q-nav-btn.active { border-color: var(--tcm-primary-500); border-width: 2px; font-weight: 700; }
.q-nav-legend { display: flex; gap: 16px; font-size: var(--tcm-font-xs); color: var(--tcm-text-secondary); }
.legend-dot { display: inline-block; width: 10px; height: 10px; border-radius: 50%; margin-right: 4px; }
.legend-dot--unanswered { background: var(--tcm-bg-base); border: 1px solid var(--tcm-border); }
.legend-dot--answered { background: #A5D6A7; }
.legend-dot--marked { background: #FFE082; }
</style>
