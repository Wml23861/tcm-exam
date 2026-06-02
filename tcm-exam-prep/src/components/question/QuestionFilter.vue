<template>
  <div class="question-filter">
    <div class="filter-row">
      <div class="filter-group">
        <label class="filter-label">科目</label>
        <select
          :value="modelValue.subjectId ?? ''"
          @change="onSubjectChange"
          class="filter-select"
        >
          <option value="">全部科目</option>
          <option
            v-for="subject in subjects"
            :key="subject.id"
            :value="subject.id"
          >
            {{ subject.name }}
          </option>
        </select>
      </div>

      <div class="filter-group">
        <label class="filter-label">题型</label>
        <div class="filter-chips">
          <button
            v-for="t in questionTypes"
            :key="t.value"
            :class="['chip', { active: isTypeActive(t.value) }]"
            @click="toggleType(t.value)"
          >
            {{ t.label }}
          </button>
        </div>
      </div>

      <div class="filter-group">
        <label class="filter-label">难度</label>
        <div class="filter-chips">
          <button
            v-for="d in difficulties"
            :key="d"
            :class="['chip', { active: isDifficultyActive(d) }]"
            @click="toggleDifficulty(d)"
          >
            {{ d }}
          </button>
        </div>
      </div>

      <div class="filter-group" v-if="showChapter">
        <label class="filter-label">章节</label>
        <select
          :value="modelValue.chapterId ?? ''"
          @change="onChapterChange"
          class="filter-select"
        >
          <option value="">全部章节</option>
          <option
            v-for="ch in chapters"
            :key="ch.id"
            :value="ch.id"
          >
            {{ ch.title }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import type { QuestionFilter, QuestionType, QuestionDifficulty } from '@/types'
import { useSubjectStore } from '@/stores/useSubjectStore'

const subjectStore = useSubjectStore()

const props = defineProps<{
  modelValue: QuestionFilter
  showChapter?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: QuestionFilter]
}>()

const questionTypes: { label: string; value: QuestionType }[] = [
  { label: 'A1 单选题', value: 'A1' },
  { label: 'A2 病例题', value: 'A2' },
  { label: 'B1 配伍题', value: 'B1' },
]

const difficulties: QuestionDifficulty[] = [1, 2, 3, 4, 5]

const subjects = computed(() => subjectStore.subjects)
const chapters = computed(() => subjectStore.currentSubjectChapters)

onMounted(async () => {
  if (subjectStore.subjects.length === 0) {
    await subjectStore.loadSubjects()
  }
})

function isTypeActive(type: QuestionType): boolean {
  return props.modelValue.type === type
}

function isDifficultyActive(d: QuestionDifficulty): boolean {
  return props.modelValue.difficulty === d
}

function toggleType(type: QuestionType): void {
  const newType = props.modelValue.type === type ? undefined : type
  emit('update:modelValue', { ...props.modelValue, type: newType })
}

function toggleDifficulty(d: QuestionDifficulty): void {
  const newDifficulty = props.modelValue.difficulty === d ? undefined : d
  emit('update:modelValue', { ...props.modelValue, difficulty: newDifficulty })
}

function onSubjectChange(event: Event): void {
  const target = event.target as HTMLSelectElement
  const subjectId = target.value || undefined
  emit('update:modelValue', { ...props.modelValue, subjectId, chapterId: undefined })
  if (subjectId) {
    subjectStore.loadSubjectDetail(subjectId)
  }
}

function onChapterChange(event: Event): void {
  const target = event.target as HTMLSelectElement
  emit('update:modelValue', { ...props.modelValue, chapterId: target.value || undefined })
}
</script>

<style scoped>
.question-filter {
  padding: 16px;
  background: var(--tcm-bg-surface);
  border: 1px solid var(--tcm-border-light);
  border-radius: var(--tcm-radius-md);
}
.filter-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: flex-start;
}
.filter-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.filter-label {
  font-size: var(--tcm-font-xs);
  font-weight: 600;
  color: var(--tcm-text-secondary);
}
.filter-select {
  padding: 6px 12px;
  border: 1px solid var(--tcm-border);
  border-radius: var(--tcm-radius-sm);
  font-size: var(--tcm-font-sm);
  font-family: var(--tcm-font-family);
  background: var(--tcm-bg-base);
  color: var(--tcm-text-primary);
  min-width: 140px;
  cursor: pointer;
}
.filter-chips {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.chip {
  padding: 4px 12px;
  border: 1px solid var(--tcm-border);
  border-radius: var(--tcm-radius-sm);
  font-size: var(--tcm-font-xs);
  font-family: var(--tcm-font-family);
  background: var(--tcm-bg-base);
  color: var(--tcm-text-secondary);
  cursor: pointer;
  transition: all var(--tcm-transition-fast);
}
.chip:hover {
  border-color: var(--tcm-primary-300);
  color: var(--tcm-primary-500);
}
.chip.active {
  background: #FDF0ED;
  border-color: var(--tcm-primary-500);
  color: var(--tcm-primary-500);
  font-weight: 600;
}
</style>
