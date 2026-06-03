<template>
  <div class="page-wrong">
    <div class="page-header">
      <h1 class="page-title">错题本</h1>
      <TcmButton variant="outline" size="sm" @click="goToSetup">
        开始刷题
      </TcmButton>
    </div>

    <!-- Filter -->
    <div class="wrong-filter-bar">
      <div class="filter-group">
        <label class="filter-label">科目筛选</label>
        <select
          v-model="filterSubjectId"
          class="filter-select"
          @change="applyFilter"
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
        <label class="filter-label">掌握状态</label>
        <select
          v-model="filterMastered"
          class="filter-select"
          @change="applyFilter"
        >
          <option value="all">全部</option>
          <option value="unmastered">未掌握</option>
          <option value="mastered">已掌握</option>
        </select>
      </div>
    </div>

    <!-- Stats summary -->
    <div class="wrong-stats" v-if="records.length > 0">
      <div class="stat-card">
        <span class="stat-num">{{ records.length }}</span>
        <span class="stat-label">错题总数</span>
      </div>
      <div class="stat-card">
        <span class="stat-num stat-warning">{{ unmasteredCount }}</span>
        <span class="stat-label">未掌握</span>
      </div>
      <div class="stat-card">
        <span class="stat-num stat-success">{{ masteredCount }}</span>
        <span class="stat-label">已掌握</span>
      </div>
    </div>

    <!-- Loading -->
    <template v-if="isLoading">
      <div class="wrong-loading">
        <TcmSkeleton variant="card" />
        <TcmSkeleton variant="card" />
        <TcmSkeleton variant="card" />
      </div>
    </template>

    <!-- Empty -->
    <template v-else-if="filteredRecords.length === 0">
      <TcmEmpty :description="emptyDescription" />
    </template>

    <!-- Wrong question list -->
    <template v-else>
      <div class="wrong-list">
        <div
          v-for="record in filteredRecords"
          :key="record.id"
          class="wrong-item"
        >
          <div class="wrong-item-header" @click="toggleExpand(record.id)">
            <div class="wrong-item-info">
              <TcmTag :type="getTagType(record.question)" size="sm">
                {{ record.question?.type ?? '?' }}
              </TcmTag>
              <span class="wrong-item-stem">
                {{ getStemPreview(record.question) }}
              </span>
            </div>
            <div class="wrong-item-meta">
              <span class="wrong-count">错 {{ record.wrongCount }} 次</span>
              <span class="wrong-date">{{ formatDate(record.lastWrongAt) }}</span>
              <TcmTag
                :type="record.isMastered ? 'success' : 'warning'"
                size="sm"
              >
                {{ record.isMastered ? '已掌握' : '未掌握' }}
              </TcmTag>
              <span class="expand-arrow" :class="{ expanded: expandedIds.has(record.id) }">
                &#x25BC;
              </span>
            </div>
          </div>

          <!-- Expanded detail with redo -->
          <div v-if="expandedIds.has(record.id)" class="wrong-item-detail">
            <template v-if="record.question">
              <div class="redo-area">
                <QuestionCard
                  v-if="record.question.type !== 'B1'"
                  :type="record.question.type"
                  :question-stem="record.question.questionStem"
                  :options="record.question.options"
                  :correct-answer="record.question.correctAnswer"
                  :explanation="record.question.explanation"
                  :difficulty="record.question.difficulty"
                  :exam-years="record.question.examYears"
                  :selected-answer="redoAnswers[record.questionId] ?? null"
                  :show-explanation="redoTimestamps[record.questionId] != null"
                  @select="onRedoAnswer(record.questionId, $event)"
                />

                <B1QuestionGroup
                  v-else-if="record.b1Group"
                  :shared-options="record.b1Group.sharedOptions"
                  :sub-questions="record.b1Group.subQuestions"
                  :show-results="redoTimestamps[record.questionId] != null"
                  @answer="(qId: string, ans: string) => onRedoAnswer(qId, ans)"
                />

                <div v-if="!redoTimestamps[record.questionId]" class="redo-hint">
                  上次错误答案：
                  <span class="last-wrong-answer">{{ record.lastWrongAnswer }}</span>
                </div>

                <div class="redo-actions">
                  <TcmButton
                    v-if="!redoTimestamps[record.questionId]"
                    variant="primary"
                    size="sm"
                    :disabled="!redoAnswers[record.questionId]"
                    @click="submitRedo(record)"
                  >
                    提交
                  </TcmButton>
                  <template v-else>
                    <span
                      :class="redoAnswerCorrect(record) ? 'text-success' : 'text-error'"
                    >
                      {{ redoAnswerCorrect(record) ? '回答正确' : '回答错误' }}
                    </span>
                    <TcmButton variant="outline" size="sm" @click="resetRedo(record.questionId)">
                      重新作答
                    </TcmButton>
                    <TcmButton
                      v-if="!record.isMastered"
                      variant="gold"
                      size="sm"
                      @click="handleMarkMastered(record)"
                    >
                      标记为已掌握
                    </TcmButton>
                  </template>
                </div>
              </div>
            </template>
            <div v-else class="redo-placeholder">
              <TcmEmpty description="题目数据不可用" />
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { Question, WrongQuestionRecord } from '@/types'
import { useSubjectStore } from '@/stores/useSubjectStore'
import { questionRepo } from '@/db/repositories/questionRepo'
import TcmButton from '@/components/ui/TcmButton.vue'
import TcmTag from '@/components/ui/TcmTag.vue'
import TcmEmpty from '@/components/ui/TcmEmpty.vue'
import TcmSkeleton from '@/components/ui/TcmSkeleton.vue'
import QuestionCard from '@/components/question/QuestionCard.vue'
import B1QuestionGroup from '@/components/question/B1QuestionGroup.vue'
import dayjs from 'dayjs'

interface EnrichedRecord extends WrongQuestionRecord {
  question?: Question
  b1Group?: {
    sharedOptions: { key: string; text: string }[]
    subQuestions: {
      id: string
      questionStem: string
      correctAnswer: string
      userAnswer?: string | null
      isCorrect?: boolean
    }[]
  }
}

const router = useRouter()
const subjectStore = useSubjectStore()

const isLoading = ref(true)
const filterSubjectId = ref('')
const filterMastered = ref<'all' | 'unmastered' | 'mastered'>('unmastered')
const records = ref<EnrichedRecord[]>([])
const expandedIds = reactive<Set<string>>(new Set())
const redoAnswers = reactive<Record<string, string | null>>({})
const redoTimestamps = reactive<Record<string, number | null>>({})

const subjects = computed(() => subjectStore.subjects)

const unmasteredCount = computed(() => {
  return records.value.filter(r => !r.isMastered).length
})

const masteredCount = computed(() => {
  return records.value.filter(r => r.isMastered).length
})

const filteredRecords = computed(() => {
  let result = records.value

  if (filterSubjectId.value) {
    result = result.filter(r => r.subjectId === filterSubjectId.value)
  }

  if (filterMastered.value === 'unmastered') {
    result = result.filter(r => !r.isMastered)
  } else if (filterMastered.value === 'mastered') {
    result = result.filter(r => r.isMastered)
  }

  return result
})

const emptyDescription = computed(() => {
  if (records.value.length === 0) return '还没有错题记录，快去刷题吧'
  return '没有符合条件的错题'
})

onMounted(async () => {
  if (subjectStore.subjects.length === 0) {
    await subjectStore.loadSubjects()
  }
  await loadWrongQuestions()
})

async function loadWrongQuestions(): Promise<void> {
  isLoading.value = true
  try {
    const wrongRecords = await questionRepo.getWrongQuestions()

    // Enrich with question data
    const enriched: EnrichedRecord[] = []
    for (const wr of wrongRecords) {
      const q = await questionRepo.findById(wr.questionId)
      const enrichedRecord: EnrichedRecord = { ...wr, question: q }

      // For B1 sub-questions, try to load the group context
      if (q && q.type === 'B1' && q.groupId) {
        const rootQuestion = await questionRepo.findById(q.groupId)
        if (rootQuestion && rootQuestion.sharedOptions) {
          enrichedRecord.b1Group = {
            sharedOptions: rootQuestion.sharedOptions,
            subQuestions: [{
              id: q.id,
              questionStem: q.questionStem,
              correctAnswer: q.correctAnswer,
              userAnswer: redoAnswers[q.id] ?? null,
              isCorrect: redoTimestamps[q.id] != null
                ? redoAnswers[q.id] === q.correctAnswer
                : undefined,
            }],
          }
        }
      }

      enriched.push(enrichedRecord)
    }

    // Sort: unmastered first, then by wrong count descending, then by date
    enriched.sort((a, b) => {
      if (a.isMastered !== b.isMastered) return a.isMastered ? 1 : -1
      if (a.wrongCount !== b.wrongCount) return b.wrongCount - a.wrongCount
      return b.lastWrongAt - a.lastWrongAt
    })

    records.value = enriched
  } finally {
    isLoading.value = false
  }
}

function applyFilter(): void {
  // Filters are computed, no action needed
}

function getStemPreview(question?: Question): string {
  if (!question) return '(题目数据不可用)'
  const text = question.questionStem.replace(/[#*`_~\[\]]/g, '').trim()
  return text.length > 80 ? text.slice(0, 80) + '...' : text
}

function getTagType(question?: Question): 'key' | 'difficult' | 'high-frequency' | 'default' {
  if (!question) return 'default'
  if (question.type === 'A1') return 'key'
  if (question.type === 'A2') return 'difficult'
  return 'high-frequency'
}

function formatDate(timestamp: number): string {
  return dayjs(timestamp).format('MM-DD HH:mm')
}

function toggleExpand(recordId: string): void {
  const newSet = new Set(expandedIds)
  if (newSet.has(recordId)) {
    newSet.delete(recordId)
  } else {
    newSet.add(recordId)
  }
  expandedIds.clear()
  for (const id of newSet) expandedIds.add(id)
}

function onRedoAnswer(questionId: string, answer: string): void {
  if (redoTimestamps[questionId]) return
  redoAnswers[questionId] = answer
}

function submitRedo(record: EnrichedRecord): void {
  redoTimestamps[record.questionId] = Date.now()

  // If correct, optionally auto-mark as mastered after first correct redo
  if (record.question && redoAnswers[record.questionId] === record.question.correctAnswer) {
    if (record.wrongCount <= 2 && !record.isMastered) {
      handleMarkMastered(record)
    }
  } else if (record.question && redoAnswers[record.questionId] !== record.question.correctAnswer) {
    // Save as additional wrong record
    saveWrongRecord(record)
  }
}

function redoAnswerCorrect(record: EnrichedRecord): boolean {
  if (!record.question || !redoTimestamps[record.questionId]) return false
  return redoAnswers[record.questionId] === record.question.correctAnswer
}

async function saveWrongRecord(record: EnrichedRecord): Promise<void> {
  try {
    const updated: WrongQuestionRecord = {
      id: record.id,
      questionId: record.questionId,
      subjectId: record.subjectId,
      wrongCount: record.wrongCount + 1,
      lastWrongAt: Date.now(),
      lastWrongAnswer: redoAnswers[record.questionId] ?? '',
      notes: record.notes,
      isMastered: record.isMastered,
    }
    await questionRepo.addWrongQuestion(updated)

    // Update local record
    const idx = records.value.findIndex(r => r.id === record.id)
    if (idx >= 0) {
      records.value[idx] = { ...records.value[idx], ...updated }
    }
  } catch {
    // Silently handle
  }
}

function resetRedo(questionId: string): void {
  redoAnswers[questionId] = null
  redoTimestamps[questionId] = null
}

async function handleMarkMastered(record: EnrichedRecord): Promise<void> {
  try {
    await questionRepo.markMastered(record.id)
    const idx = records.value.findIndex(r => r.id === record.id)
    if (idx >= 0) {
      records.value[idx] = { ...records.value[idx], isMastered: true }
    }
  } catch {
    // Silently handle
  }
}

function goToSetup(): void {
  router.push({ name: 'practice-setup' })
}
</script>

<style scoped>
.page-wrong {
  max-width: var(--tcm-content-max-width);
}
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
.page-title {
  font-family: var(--tcm-font-decorative);
  font-size: var(--tcm-font-2xl);
  color: var(--tcm-text-primary);
}

/* Filter */
.wrong-filter-bar {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  padding: 12px 16px;
  background: var(--tcm-bg-surface);
  border: 1px solid var(--tcm-border-light);
  border-radius: var(--tcm-radius-md);
}
.filter-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.filter-label {
  font-size: var(--tcm-font-xs);
  font-weight: 600;
  color: var(--tcm-text-secondary);
}
.filter-select {
  padding: 4px 10px;
  border: 1px solid var(--tcm-border);
  border-radius: var(--tcm-radius-sm);
  font-size: var(--tcm-font-sm);
  font-family: var(--tcm-font-family);
  background: var(--tcm-bg-base);
  color: var(--tcm-text-primary);
  min-width: 120px;
  cursor: pointer;
}

/* Stats */
.wrong-stats {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}
.stat-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 14px;
  background: var(--tcm-bg-surface);
  border: 1px solid var(--tcm-border-light);
  border-radius: var(--tcm-radius-md);
}
.stat-num {
  font-size: var(--tcm-font-2xl);
  font-weight: 700;
  color: var(--tcm-primary-500);
  font-family: var(--tcm-font-decorative);
}
.stat-num.stat-warning { color: var(--tcm-warning); }
.stat-num.stat-success { color: var(--tcm-jade-500); }
.stat-label {
  font-size: var(--tcm-font-xs);
  color: var(--tcm-text-secondary);
}

/* Loading */
.wrong-loading {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* List */
.wrong-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.wrong-item {
  border: 1px solid var(--tcm-border-light);
  border-radius: var(--tcm-radius-md);
  overflow: hidden;
  background: var(--tcm-bg-surface);
  transition: border-color var(--tcm-transition-fast);
}
.wrong-item:hover {
  border-color: var(--tcm-border);
}
.wrong-item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  gap: 12px;
  flex-wrap: wrap;
}
.wrong-item-info {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 0;
}
.wrong-item-stem {
  font-size: var(--tcm-font-sm);
  color: var(--tcm-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}
.wrong-item-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: var(--tcm-font-xs);
  color: var(--tcm-text-secondary);
  flex-shrink: 0;
}
.wrong-count {
  color: var(--tcm-error);
  font-weight: 600;
}
.wrong-date {
  color: var(--tcm-text-disabled);
}
.expand-arrow {
  font-size: var(--tcm-font-xs);
  transition: transform var(--tcm-transition-fast);
  color: var(--tcm-text-disabled);
}
.expand-arrow.expanded {
  transform: rotate(180deg);
}

/* Detail / redo area */
.wrong-item-detail {
  padding: 16px 20px 20px;
  border-top: 1px solid var(--tcm-border-light);
  background: var(--tcm-bg-base);
}
.redo-area {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.redo-hint {
  font-size: var(--tcm-font-sm);
  color: var(--tcm-text-secondary);
  padding: 8px 12px;
  background: var(--tcm-gold-bg);
  border: 1px solid var(--tcm-gold-border);
  border-radius: var(--tcm-radius-sm);
}
.last-wrong-answer {
  font-weight: 700;
  color: var(--tcm-error);
}
.redo-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}
.redo-placeholder {
  padding: 24px;
}
.text-success {
  font-weight: 600;
  color: var(--tcm-jade-500);
}
.text-error {
  font-weight: 600;
  color: var(--tcm-error);
}
</style>
