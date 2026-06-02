<template>
  <div class="page-settings">
    <h1 class="page-title">设置</h1>
    <p class="page-subtitle">调整学习目标和偏好，打造专属学习体验</p>

    <div v-if="!isLoaded" class="loading-state">
      <TcmSkeleton variant="card" />
    </div>

    <template v-else>
      <!-- 每日目标 -->
      <TcmCard title="每日目标" class="settings-section">
        <div class="form-grid">
          <div class="form-item">
            <label class="form-label">每日学习知识点</label>
            <p class="form-hint">计划每天学习的知识点数量</p>
            <input
              v-model.number="form.dailyStudyGoal"
              type="number"
              min="1"
              max="200"
              class="form-input"
            />
          </div>

          <div class="form-item">
            <label class="form-label">每日刷题目标</label>
            <p class="form-hint">计划每天完成的题目数量</p>
            <input
              v-model.number="form.dailyQuestionGoal"
              type="number"
              min="1"
              max="500"
              class="form-input"
            />
          </div>

          <div class="form-item">
            <label class="form-label">每日复习目标</label>
            <p class="form-hint">计划每天复习的题目/知识点数量</p>
            <input
              v-model.number="form.dailyReviewGoal"
              type="number"
              min="1"
              max="200"
              class="form-input"
            />
          </div>
        </div>
      </TcmCard>

      <!-- 默认考试设置 -->
      <TcmCard title="默认考试设置" class="settings-section">
        <div class="form-grid">
          <div class="form-item">
            <label class="form-label">默认考试时长（分钟）</label>
            <p class="form-hint">模拟考试默认时长</p>
            <div class="select-wrapper">
              <select v-model.number="form.defaultExamDuration" class="form-select">
                <option :value="30">30 分钟</option>
                <option :value="60">60 分钟</option>
                <option :value="90">90 分钟</option>
                <option :value="120">120 分钟</option>
              </select>
            </div>
          </div>

          <div class="form-item">
            <label class="form-label">默认题量</label>
            <p class="form-hint">模拟考试默认题目数量</p>
            <div class="select-wrapper">
              <select v-model.number="form.defaultExamQuestionCount" class="form-select">
                <option :value="50">50 题</option>
                <option :value="100">100 题</option>
                <option :value="150">150 题</option>
              </select>
            </div>
          </div>

          <div class="form-item">
            <label class="form-label">考试日期</label>
            <p class="form-hint">设置你的执业医师考试日期，系统将倒计时提醒</p>
            <input
              v-model="form.examDateStr"
              type="date"
              class="form-input"
            />
            <p v-if="examCountdown" class="form-countdown">
              距离考试还有 <strong>{{ examCountdown }}</strong> 天
            </p>
          </div>
        </div>
      </TcmCard>

      <!-- 闪卡设置 -->
      <TcmCard title="闪卡记忆设置" class="settings-section">
        <div class="form-grid">
          <div class="form-item">
            <label class="form-label">每日新卡数量</label>
            <p class="form-hint">每天新增学习的闪卡数量上限</p>
            <input
              v-model.number="form.dailyNewCards"
              type="number"
              min="1"
              max="200"
              class="form-input"
            />
          </div>

          <div class="form-item">
            <label class="form-label">每日复习上限</label>
            <p class="form-hint">每天复习闪卡的数量上限</p>
            <input
              v-model.number="form.dailyReviewCards"
              type="number"
              min="1"
              max="500"
              class="form-input"
            />
          </div>
        </div>
      </TcmCard>

      <!-- 外观设置 -->
      <TcmCard title="外观设置" class="settings-section">
        <div class="form-grid">
          <div class="form-item">
            <label class="form-label">主题模式</label>
            <p class="form-hint">选择适合你的视觉主题</p>
            <div class="option-row">
              <button
                :class="['option-btn', { 'is-active': form.theme === 'light' }]"
                @click="form.theme = 'light'"
              >
                明亮
              </button>
              <button
                :class="['option-btn', { 'is-active': form.theme === 'sepia' }]"
                @click="form.theme = 'sepia'"
              >
                护眼纸质
              </button>
            </div>
          </div>

          <div class="form-item">
            <label class="form-label">字体大小</label>
            <p class="form-hint">调整界面文字大小</p>
            <div class="option-row">
              <button
                :class="['option-btn', { 'is-active': form.fontSize === 'small' }]"
                @click="form.fontSize = 'small'"
              >
                小
              </button>
              <button
                :class="['option-btn', { 'is-active': form.fontSize === 'medium' }]"
                @click="form.fontSize = 'medium'"
              >
                中
              </button>
              <button
                :class="['option-btn', { 'is-active': form.fontSize === 'large' }]"
                @click="form.fontSize = 'large'"
              >
                大
              </button>
            </div>
          </div>
        </div>
      </TcmCard>

      <!-- 操作按钮 -->
      <div class="settings-actions">
        <TcmButton variant="primary" size="lg" :loading="saving" @click="handleSave">
          保存设置
        </TcmButton>
        <TcmButton variant="secondary" size="lg" @click="handleReset">
          恢复默认
        </TcmButton>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed, onMounted } from 'vue'
import TcmCard from '@/components/ui/TcmCard.vue'
import TcmButton from '@/components/ui/TcmButton.vue'
import TcmSkeleton from '@/components/ui/TcmSkeleton.vue'
import { useSettingsStore } from '@/stores/useSettingsStore'
import { daysUntilExam } from '@/utils/date'
import type { AppSettings, ThemeMode, FontSize } from '@/types'

const settingsStore = useSettingsStore()
const isLoaded = ref(false)
const saving = ref(false)

const form = reactive({
  dailyStudyGoal: 20,
  dailyQuestionGoal: 50,
  dailyReviewGoal: 30,
  defaultExamDuration: 60,
  defaultExamQuestionCount: 100,
  theme: 'light' as ThemeMode,
  fontSize: 'medium' as FontSize,
  dailyNewCards: 20,
  dailyReviewCards: 100,
  examDateStr: '',
})

const examCountdown = computed(() => {
  if (!form.examDateStr) return null
  const ts = new Date(form.examDateStr + 'T00:00:00').getTime()
  if (isNaN(ts)) return null
  return daysUntilExam(ts)
})

function loadFormFromSettings(settings: AppSettings): void {
  form.dailyStudyGoal = settings.dailyStudyGoal
  form.dailyQuestionGoal = settings.dailyQuestionGoal
  form.dailyReviewGoal = settings.dailyReviewGoal
  form.defaultExamDuration = settings.defaultExamDuration
  form.defaultExamQuestionCount = settings.defaultExamQuestionCount
  form.theme = settings.theme
  form.fontSize = settings.fontSize
  form.dailyNewCards = settings.dailyNewCards
  form.dailyReviewCards = settings.dailyReviewCards
  form.examDateStr = settings.examDate
    ? new Date(settings.examDate).toISOString().slice(0, 10)
    : ''
}

async function handleSave(): Promise<void> {
  saving.value = true
  try {
    const examDate = form.examDateStr
      ? new Date(form.examDateStr + 'T00:00:00').getTime()
      : null

    await settingsStore.updateSettings({
      dailyStudyGoal: form.dailyStudyGoal,
      dailyQuestionGoal: form.dailyQuestionGoal,
      dailyReviewGoal: form.dailyReviewGoal,
      defaultExamDuration: form.defaultExamDuration,
      defaultExamQuestionCount: form.defaultExamQuestionCount,
      theme: form.theme,
      fontSize: form.fontSize,
      dailyNewCards: form.dailyNewCards,
      dailyReviewCards: form.dailyReviewCards,
      examDate,
    })
  } finally {
    saving.value = false
  }
}

async function handleReset(): Promise<void> {
  await settingsStore.resetSettings()
  loadFormFromSettings(settingsStore.settings)
}

onMounted(async () => {
  try {
    await settingsStore.loadSettings()
  } finally {
    loadFormFromSettings(settingsStore.settings)
    isLoaded.value = true
  }
})
</script>

<style scoped>
.page-settings {
  max-width: 700px;
  margin: 0 auto;
}

.page-title {
  font-family: var(--tcm-font-decorative);
  font-size: var(--tcm-font-2xl);
  color: var(--tcm-text-primary);
  margin-bottom: 8px;
}

.page-subtitle {
  font-size: var(--tcm-font-base);
  color: var(--tcm-text-secondary);
  margin-bottom: 24px;
}

.loading-state {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* ===== 设置分区 ===== */
.settings-section {
  margin-bottom: 20px;
}

/* ===== 表单项 ===== */
.form-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-item {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-size: var(--tcm-font-base);
  font-weight: 600;
  color: var(--tcm-text-primary);
  margin-bottom: 4px;
}

.form-hint {
  font-size: var(--tcm-font-sm);
  color: var(--tcm-text-secondary);
  margin: 0 0 8px 0;
}

.form-input {
  width: 100%;
  max-width: 240px;
  padding: 8px 12px;
  border: 1px solid var(--tcm-border);
  border-radius: var(--tcm-radius-md);
  background: var(--tcm-bg-base);
  color: var(--tcm-text-primary);
  font-size: var(--tcm-font-base);
  font-family: var(--tcm-font-family);
  transition: border-color var(--tcm-transition-fast);
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: var(--tcm-primary-500);
}

.form-input[type='date'] {
  font-family: var(--tcm-font-family);
}

.select-wrapper {
  max-width: 240px;
}

.form-select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--tcm-border);
  border-radius: var(--tcm-radius-md);
  background: var(--tcm-bg-base);
  color: var(--tcm-text-primary);
  font-size: var(--tcm-font-base);
  font-family: var(--tcm-font-family);
  cursor: pointer;
  transition: border-color var(--tcm-transition-fast);
  appearance: auto;
}

.form-select:focus {
  outline: none;
  border-color: var(--tcm-primary-500);
}

.form-countdown {
  margin: 8px 0 0 0;
  font-size: var(--tcm-font-sm);
  color: var(--tcm-primary-500);
}

.form-countdown strong {
  font-family: var(--tcm-font-mono);
  font-size: var(--tcm-font-lg);
}

/* ===== 选项按钮 ===== */
.option-row {
  display: flex;
  gap: 8px;
}

.option-btn {
  padding: 8px 20px;
  border: 1px solid var(--tcm-border);
  border-radius: var(--tcm-radius-md);
  background: var(--tcm-bg-base);
  color: var(--tcm-text-secondary);
  font-size: var(--tcm-font-base);
  font-family: var(--tcm-font-family);
  cursor: pointer;
  transition: all var(--tcm-transition-fast);
}

.option-btn:hover {
  border-color: var(--tcm-primary-300);
}

.option-btn.is-active {
  border-color: var(--tcm-primary-500);
  background: var(--tcm-primary-50);
  color: var(--tcm-primary-700);
  font-weight: 600;
}

/* ===== 操作按钮 ===== */
.settings-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  padding: 8px 0 40px;
}
</style>
