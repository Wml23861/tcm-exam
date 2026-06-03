<template>
  <div
    class="flashcard-container"
    :class="{ 'is-active': flipped }"
    @click="flip"
  >
    <div class="flashcard">
      <!-- Front -->
      <div class="flashcard-face flashcard-front">
        <div class="card-header">
          <TcmTag v-if="card.category" :type="tagType" class="flashcard-category">{{ categoryLabel }}</TcmTag>
          <span class="card-hint">点击或空格翻转</span>
        </div>
        <div class="flashcard-body">
          <div class="flashcard-question" v-html="renderedFront"></div>
        </div>
      </div>

      <!-- Back -->
      <div class="flashcard-face flashcard-back">
        <div class="card-header card-header--back">
          <span class="answer-badge">答案</span>
          <span class="card-hint">点击翻回</span>
        </div>
        <div class="flashcard-body">
          <div class="flashcard-answer" v-html="renderedBack"></div>
        </div>
        <div v-if="card.mnemonic" class="flashcard-mnemonic">
          <div class="mnemonic-label">记忆口诀</div>
          <p class="mnemonic-text">{{ card.mnemonic }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import MarkdownIt from 'markdown-it'
import TcmTag from '@/components/ui/TcmTag.vue'
import type { Flashcard } from '@/types'

const props = defineProps<{ card: Flashcard; flipped: boolean }>()
const emit = defineEmits<{ flip: [] }>()

const md = new MarkdownIt({ html: false, breaks: true })

const renderedFront = computed(() => props.card ? md.render(props.card.frontContent) : '')
const renderedBack = computed(() => props.card ? md.render(props.card.backContent) : '')

const categoryLabel = computed(() => {
  const labels: Record<string, string> = {
    definition: '概念', herb: '中药', formula: '方剂',
    acupoint: '穴位', song: '方歌', diagnosis: '诊断', clinical: '临床',
    regulation: '法规', other: '其他',
  }
  return labels[props.card?.category ?? 'other'] || '其他'
})

const tagType = computed(() => {
  const m: Record<string, string> = {
    definition: 'key', herb: 'memorize', formula: 'high-frequency',
    acupoint: 'difficult', song: 'memorize', diagnosis: 'default',
    clinical: 'success', regulation: 'default', other: 'default',
  }
  return (m[props.card?.category ?? 'other'] || 'default') as
    | 'key' | 'difficult' | 'high-frequency' | 'memorize' | 'success' | 'default'
})

function flip(): void { emit('flip') }

function handleKeydown(e: KeyboardEvent): void {
  if (e.code === 'Space') { e.preventDefault(); emit('flip') }
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
</script>

<style scoped>
.flashcard-container {
  perspective: 1200px;
  width: 100%;
  cursor: pointer;
}

.flashcard {
  display: grid;
  grid-template-areas: 'face';
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
}

.flashcard-container.is-active .flashcard {
  transform: rotateY(180deg);
}

/* Both faces share the same grid cell → container auto-sizes to tallest */
.flashcard-face {
  grid-area: face;
  display: flex;
  flex-direction: column;
  backface-visibility: hidden;
  border-radius: 16px;
  overflow: hidden;
  min-height: 260px;
}

.flashcard-front {
  background: linear-gradient(135deg, #fffefb 0%, #fef9f0 100%);
  border: 2px solid #e8dcc8;
  box-shadow: 0 4px 24px rgba(139, 69, 19, 0.06);
}

.flashcard-back {
  background: linear-gradient(135deg, #f9faf6 0%, #f2f6eb 100%);
  border: 2px solid #8fa87a;
  box-shadow: 0 4px 24px rgba(94, 130, 70, 0.08);
  transform: rotateY(180deg);
}

/* Header row */
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 32px;
  border-bottom: 1px solid #ece4d5;
  flex-shrink: 0;
}

.card-header--back {
  border-bottom-color: #d4e2c8;
}

.flashcard-category {
  flex-shrink: 0;
}

.answer-badge {
  font-size: 13px;
  font-weight: 600;
  color: #5e8246;
  background: #eaf3e2;
  padding: 3px 14px;
  border-radius: 100px;
  letter-spacing: 0.5px;
}

.card-hint {
  font-size: 12px;
  color: #c5bdaa;
}

/* Body — flexible, pads generously */
.flashcard-body {
  flex: 1;
  padding: 40px 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.flashcard-question {
  font-size: 18px;
  color: #3d3027;
  line-height: 2;
  text-align: center;
  width: 100%;
}

.flashcard-answer {
  font-size: 16px;
  color: #333;
  line-height: 2;
  text-align: left;
  width: 100%;
}

/* Rich answer content */
.flashcard-answer :deep(h2),
.flashcard-answer :deep(h3) {
  font-size: 17px;
  margin: 16px 0 8px;
  color: #4a6741;
}

.flashcard-answer :deep(ul),
.flashcard-answer :deep(ol) {
  padding-left: 24px;
  margin: 10px 0;
}

.flashcard-answer :deep(li) {
  margin-bottom: 6px;
}

.flashcard-answer :deep(strong) {
  color: #8b4513;
}

.flashcard-answer :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 14px 0;
  font-size: 14px;
}

.flashcard-answer :deep(th) {
  background: #eaf3e2;
  color: #4a6741;
  padding: 10px 14px;
  text-align: left;
  border: 1px solid #d4e2c8;
  font-weight: 600;
}

.flashcard-answer :deep(td) {
  padding: 8px 14px;
  border: 1px solid #eaf0e2;
}

.flashcard-answer :deep(blockquote) {
  border-left: 3px solid #8fa87a;
  background: #f5f9f1;
  margin: 14px 0;
  padding: 10px 20px;
  color: #666;
  font-style: italic;
  border-radius: 0 6px 6px 0;
}

.flashcard-answer :deep(code) {
  background: #f0ebe0;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.9em;
  color: #8b4513;
}

/* Mnemonic footer */
.flashcard-mnemonic {
  margin: 0 32px 24px;
  padding: 14px 24px;
  background: linear-gradient(135deg, #fffdf5 0%, #fff9e8 100%);
  border: 1px solid #e8d5a3;
  border-radius: 12px;
}

.mnemonic-label {
  font-size: 12px;
  font-weight: 700;
  color: #b8860b;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
  text-transform: uppercase;
}

.mnemonic-text {
  font-size: 14px;
  color: #6b5a30;
  line-height: 1.8;
  margin: 0;
}
</style>
