<template>
  <div class="flashcard-container" @click="flip">
    <div :class="['flashcard', { 'is-flipped': isFlipped }]">
      <div class="flashcard-face flashcard-front">
        <div class="flashcard-content">
          <TcmTag v-if="card.category" :type="tagType" size="sm" class="flashcard-category">{{ categoryLabel }}</TcmTag>
          <div class="flashcard-question" v-html="renderedFront"></div>
          <p class="flashcard-hint">点击或按空格键翻转</p>
        </div>
      </div>
      <div class="flashcard-face flashcard-back">
        <div class="flashcard-content">
          <div class="flashcard-answer-label">答案</div>
          <div class="flashcard-answer" v-html="renderedBack"></div>
          <div v-if="card.mnemonic" class="flashcard-mnemonic">
            <div class="mnemonic-label">记忆口诀</div>
            <p>{{ card.mnemonic }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import MarkdownIt from 'markdown-it'
import TcmTag from '@/components/ui/TcmTag.vue'
import type { Flashcard } from '@/types'

const props = defineProps<{ card: Flashcard }>()

const isFlipped = ref(false)
const md = new MarkdownIt({ html: false, breaks: true })

const renderedFront = computed(() => md.render(props.card.frontContent))
const renderedBack = computed(() => md.render(props.card.backContent))

const categoryLabel = computed(() => {
  const labels: Record<string, string> = {
    definition: '概念', herb: '中药', formula: '方剂',
    acupoint: '穴位', song: '方歌', diagnosis: '诊断', clinical: '临床', other: '其他',
  }
  return labels[props.card.category] || '其他'
})

const tagType = computed(() => {
  const m: Record<string, string> = {
    definition: 'key', herb: 'memorize', formula: 'high-frequency',
    acupoint: 'difficult', song: 'memorize', diagnosis: 'default', clinical: 'success', other: 'default',
  }
  return (m[props.card.category] || 'default') as 'key' | 'difficult' | 'high-frequency' | 'memorize' | 'success' | 'default'
})

function flip() { isFlipped.value = !isFlipped.value }
function handleKeydown(e: KeyboardEvent) {
  if (e.code === 'Space') { e.preventDefault(); flip() }
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
</script>

<style scoped>
.flashcard-container { perspective: 1000px; width: 100%; max-width: 520px; margin: 0 auto; cursor: pointer; }
.flashcard { position: relative; width: 100%; min-height: 280px; transition: transform 0.5s; transform-style: preserve-3d; }
.flashcard.is-flipped { transform: rotateY(180deg); }
.flashcard-face { position: absolute; inset: 0; backface-visibility: hidden; border-radius: var(--tcm-radius-lg); overflow-y: auto; }
.flashcard-front { background: var(--tcm-bg-surface); border: 2px solid var(--tcm-border); display: flex; align-items: center; justify-content: center; padding: 32px; }
.flashcard-back { background: var(--tcm-bg-elevated); border: 2px solid var(--tcm-jade-500); transform: rotateY(180deg); padding: 24px 32px; }
.flashcard-content { width: 100%; text-align: center; }
.flashcard-category { margin-bottom: 16px; }
.flashcard-question { font-size: var(--tcm-font-lg); color: var(--tcm-text-primary); line-height: 1.8; }
.flashcard-hint { margin-top: 24px; font-size: var(--tcm-font-xs); color: var(--tcm-text-disabled); }
.flashcard-answer-label { font-family: var(--tcm-font-decorative); font-size: var(--tcm-font-sm); color: var(--tcm-jade-500); margin-bottom: 12px; }
.flashcard-answer { font-size: var(--tcm-font-md); color: var(--tcm-text-primary); line-height: 1.8; }
.flashcard-mnemonic { margin-top: 16px; padding: 12px; background: #FFF8E1; border-radius: var(--tcm-radius-md); }
.mnemonic-label { font-size: var(--tcm-font-xs); color: var(--tcm-gold-500); margin-bottom: 4px; }
</style>
