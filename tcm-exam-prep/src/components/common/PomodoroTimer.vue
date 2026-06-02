<template>
  <Teleport to="body">
    <div
      :class="[
        'pomodoro-widget',
        `pomodoro--${state}`,
        { 'pomodoro--minimized': minimized }
      ]"
    >
      <!-- 最小化状态 -->
      <div v-if="minimized" class="pomodoro-mini" @click="minimized = false" title="展开番茄钟">
        <svg class="pomodoro-mini-ring" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="17" fill="none" stroke="var(--tcm-border-light)" stroke-width="3" />
          <circle
            cx="20" cy="20" r="17" fill="none"
            :stroke="state === 'break' ? 'var(--tcm-jade-500)' : 'var(--tcm-primary-500)'"
            stroke-width="3"
            stroke-linecap="round"
            :stroke-dasharray="miniCircumference"
            :stroke-dashoffset="miniOffset"
            transform="rotate(-90 20 20)"
          />
        </svg>
        <span class="pomodoro-mini-text">{{ miniMinutes }}</span>
      </div>

      <!-- 展开状态 -->
      <div v-else class="pomodoro-full">
        <!-- 头部 -->
        <div class="pomodoro-header">
          <span class="pomodoro-title">
            {{ state === 'break' ? '&#x2615; 休息' : '&#x1F345; 番茄钟' }}
          </span>
          <div class="pomodoro-header-actions">
            <span class="pomodoro-sessions">已完成 {{ completedSessions }} 个</span>
            <button class="pomodoro-btn-icon" @click="minimized = true" title="最小化">&#x2014;</button>
          </div>
        </div>

        <!-- 计时显示 -->
        <div class="pomodoro-display">
          <svg class="pomodoro-ring" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="52" fill="none" stroke="var(--tcm-border-light)" stroke-width="5" />
            <circle
              cx="60" cy="60" r="52" fill="none"
              :stroke="state === 'break' ? 'var(--tcm-jade-500)' : 'var(--tcm-primary-500)'"
              stroke-width="5"
              stroke-linecap="round"
              :stroke-dasharray="circumference"
              :stroke-dashoffset="progressOffset"
              transform="rotate(-90 60 60)"
              class="pomodoro-ring-progress"
            />
          </svg>
          <div class="pomodoro-time">
            <span class="pomodoro-minutes">{{ displayMinutes }}</span>
            <span class="pomodoro-colon">:</span>
            <span class="pomodoro-seconds">{{ displaySeconds }}</span>
          </div>
        </div>

        <!-- 控制按钮 -->
        <div class="pomodoro-controls">
          <template v-if="state === 'idle'">
            <button class="pomodoro-btn pomodoro-btn--start" @click="start">
              &#x25B6; 开始
            </button>
          </template>
          <template v-else-if="state === 'running'">
            <button class="pomodoro-btn pomodoro-btn--pause" @click="pause">
              &#x23F8; 暂停
            </button>
            <button class="pomodoro-btn pomodoro-btn--reset" @click="reset">
              &#x23F9; 重置
            </button>
          </template>
          <template v-else-if="state === 'paused'">
            <button class="pomodoro-btn pomodoro-btn--start" @click="resume">
              &#x25B6; 继续
            </button>
            <button class="pomodoro-btn pomodoro-btn--reset" @click="reset">
              &#x23F9; 重置
            </button>
          </template>
          <template v-else-if="state === 'break'">
            <button class="pomodoro-btn pomodoro-btn--skip" @click="skipBreak">
              &#x23ED; 跳过休息
            </button>
            <button class="pomodoro-btn pomodoro-btn--reset" @click="reset">
              &#x23F9; 结束
            </button>
          </template>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted, watch } from 'vue'

type TimerState = 'idle' | 'running' | 'paused' | 'break'

const FOCUS_MINUTES = 25
const BREAK_MINUTES = 5
const STUDY_TIME_KEY = 'today_study_time'
const SESSIONS_KEY = 'pomodoro_sessions'

const state = ref<TimerState>('idle')
const remainingSeconds = ref(FOCUS_MINUTES * 60)
const minimized = ref(true)
const completedSessions = ref(getLocalNumber(SESSIONS_KEY, 0))

let intervalId: ReturnType<typeof setInterval> | null = null
const circumference = 2 * Math.PI * 52 // r=52
const miniCircumference = 2 * Math.PI * 17 // r=17

function getLocalNumber(key: string, fallback: number): number {
  try {
    const raw = localStorage.getItem(key)
    return raw ? Number(raw) : fallback
  } catch { return fallback }
}

function setLocalNumber(key: string, value: number) {
  try { localStorage.setItem(key, String(value)) } catch { /* ignore */ }
}

function removeLocal(key: string) {
  try { localStorage.removeItem(key) } catch { /* ignore */ }
}

function getLocalJson<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) as T : null
  } catch { return null }
}

function setLocalJson(key: string, value: unknown) {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* ignore */ }
}

const totalSeconds = computed(() => {
  return state.value === 'break' ? BREAK_MINUTES * 60 : FOCUS_MINUTES * 60
})

const progressOffset = computed(() => {
  const progress = remainingSeconds.value / totalSeconds.value
  return circumference * (1 - progress)
})

const miniOffset = computed(() => {
  const progress = remainingSeconds.value / totalSeconds.value
  return miniCircumference * (1 - progress)
})

const displayMinutes = computed(() => {
  return String(Math.floor(remainingSeconds.value / 60)).padStart(2, '0')
})

const displaySeconds = computed(() => {
  return String(remainingSeconds.value % 60).padStart(2, '0')
})

const miniMinutes = computed(() => {
  return Math.ceil(remainingSeconds.value / 60)
})

function tick() {
  if (remainingSeconds.value <= 0) {
    handleSessionEnd()
    return
  }
  remainingSeconds.value -= 1
}

function start() {
  remainingSeconds.value = FOCUS_MINUTES * 60
  state.value = 'running'
  minimized.value = false
  startInterval()
}

function pause() {
  state.value = 'paused'
  stopInterval()
}

function resume() {
  state.value = 'running'
  startInterval()
}

function reset() {
  stopInterval()
  remainingSeconds.value = FOCUS_MINUTES * 60
  state.value = 'idle'
}

function skipBreak() {
  stopInterval()
  remainingSeconds.value = FOCUS_MINUTES * 60
  state.value = 'idle'
}

function startInterval() {
  stopInterval()
  intervalId = setInterval(tick, 1000)
}

function stopInterval() {
  if (intervalId !== null) {
    clearInterval(intervalId)
    intervalId = null
  }
}

function playBeep() {
  try {
    const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    // 播放三声短促的提示音
    const notes = [880, 1100, 1320]
    notes.forEach((freq, i) => {
      const osc = audioCtx.createOscillator()
      const gain = audioCtx.createGain()
      osc.type = 'sine'
      osc.frequency.value = freq
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime + i * 0.15)
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + i * 0.15 + 0.25)
      osc.connect(gain)
      gain.connect(audioCtx.destination)
      osc.start(audioCtx.currentTime + i * 0.15)
      osc.stop(audioCtx.currentTime + i * 0.15 + 0.25)
    })
  } catch {
    // Web Audio API 不可用时静默
  }
}

function handleSessionEnd() {
  stopInterval()
  playBeep()

  if (state.value === 'break') {
    // 休息结束，回到空闲
    remainingSeconds.value = FOCUS_MINUTES * 60
    state.value = 'idle'
  } else {
    // 专注结束，开始休息
    completedSessions.value += 1
    setLocalNumber(SESSIONS_KEY, completedSessions.value)

    // 记录学习时间 (25分钟 = 25 * 60 秒)
    const todayTotal = getLocalNumber(STUDY_TIME_KEY, 0)
    setLocalNumber(STUDY_TIME_KEY, todayTotal + FOCUS_MINUTES * 60)

    remainingSeconds.value = BREAK_MINUTES * 60
    state.value = 'break'
    startInterval()
  }
}

onUnmounted(() => {
  stopInterval()
})

// 页面加载时恢复状态
const savedState = getLocalJson<{ state: TimerState; remaining: number; sessions: number }>('pomodoro_state')
if (savedState && savedState.state !== 'idle') {
  state.value = 'idle'
  completedSessions.value = savedState.sessions || completedSessions.value
}

// 自动保存状态
watch([state, remainingSeconds], () => {
  if (state.value !== 'idle') {
    setLocalJson('pomodoro_state', {
      state: state.value,
      remaining: remainingSeconds.value,
      sessions: completedSessions.value,
    })
  } else {
    removeLocal('pomodoro_state')
  }
})
</script>

<style scoped>
.pomodoro-widget {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
  font-family: var(--tcm-font-family);
}

.pomodoro-full {
  background: var(--tcm-bg-surface);
  border: 1px solid var(--tcm-border);
  border-radius: var(--tcm-radius-lg);
  box-shadow: var(--tcm-shadow-md);
  padding: 20px;
  width: 240px;
}

.pomodoro-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.pomodoro-title {
  font-size: var(--tcm-font-sm);
  font-weight: 600;
  color: var(--tcm-text-primary);
}

.pomodoro-header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.pomodoro-sessions {
  font-size: var(--tcm-font-xs);
  color: var(--tcm-text-disabled);
}

.pomodoro-btn-icon {
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--tcm-border);
  background: var(--tcm-bg-base);
  border-radius: var(--tcm-radius-sm);
  cursor: pointer;
  font-size: 12px;
  color: var(--tcm-text-secondary);
  line-height: 1;
}

.pomodoro-btn-icon:hover {
  background: var(--tcm-border-light);
}

.pomodoro-display {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto 16px;
}

.pomodoro-ring {
  width: 100%;
  height: 100%;
}

.pomodoro-ring-progress {
  transition: stroke-dashoffset 1s linear;
}

.pomodoro-time {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
}

.pomodoro-minutes,
.pomodoro-seconds {
  font-size: 28px;
  font-weight: 700;
  color: var(--tcm-text-primary);
  font-family: var(--tcm-font-mono);
}

.pomodoro-colon {
  font-size: 24px;
  color: var(--tcm-text-secondary);
}

.pomodoro-controls {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.pomodoro-btn {
  padding: 6px 16px;
  border: none;
  border-radius: var(--tcm-radius-md);
  cursor: pointer;
  font-size: var(--tcm-font-sm);
  font-weight: 500;
  font-family: var(--tcm-font-family);
  transition: all var(--tcm-transition-fast);
}

.pomodoro-btn--start {
  background: var(--tcm-primary-500);
  color: #fff;
}
.pomodoro-btn--start:hover {
  background: var(--tcm-primary-700);
}

.pomodoro-btn--pause {
  background: var(--tcm-gold-500);
  color: #fff;
}
.pomodoro-btn--pause:hover {
  background: var(--tcm-gold-700);
}

.pomodoro-btn--reset {
  background: var(--tcm-bg-base);
  color: var(--tcm-text-secondary);
  border: 1px solid var(--tcm-border);
}
.pomodoro-btn--reset:hover {
  background: var(--tcm-border-light);
}

.pomodoro-btn--skip {
  background: var(--tcm-jade-500);
  color: #fff;
}
.pomodoro-btn--skip:hover {
  background: var(--tcm-jade-700);
}

/* 最小化状态 */
.pomodoro--minimized .pomodoro-mini {
  width: 52px;
  height: 52px;
  position: relative;
  cursor: pointer;
  filter: drop-shadow(var(--tcm-shadow-md));
  transition: transform var(--tcm-transition-fast);
}

.pomodoro--minimized .pomodoro-mini:hover {
  transform: scale(1.08);
}

.pomodoro-mini-ring {
  width: 100%;
  height: 100%;
}

.pomodoro-mini-text {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  color: var(--tcm-text-primary);
  font-family: var(--tcm-font-mono);
}

/* 响应式 */
@media (max-width: 768px) {
  .pomodoro-widget {
    bottom: 68px;
    right: 12px;
    z-index: 1000;
  }
  .pomodoro-full {
    width: 220px;
  }
}
</style>
