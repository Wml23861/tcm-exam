<template>
  <div class="b1-group">
    <div class="b1-header">
      <TcmTag type="high-frequency" size="sm">B1 配伍题</TcmTag>
      <span class="b1-instruction">以下5个备选答案用于回答随后的问题，每个答案可选一次、多次或不选</span>
    </div>
    <div class="b1-shared-options">
      <div
        v-for="opt in sharedOptions"
        :key="opt.key"
        class="b1-shared-option"
      >
        <span class="option-key">{{ opt.key }}</span>
        <span class="option-text">{{ opt.text }}</span>
      </div>
    </div>
    <div class="b1-sub-questions">
      <div v-for="(subQ, idx) in subQuestions" :key="subQ.id" class="b1-sub-question">
        <div class="sub-question-header">
          <span class="sub-question-num">第 {{ idx + 1 }} 题</span>
          <span v-if="showResults && subQ.userAnswer" :class="subQ.isCorrect ? 'text-tcm-success' : 'text-tcm-error'">
            {{ subQ.isCorrect ? '\u2713 正确' : `\u2717 正确答案: ${subQ.correctAnswer}` }}
          </span>
        </div>
        <div class="sub-question-stem" v-html="renderMd(subQ.questionStem)"></div>
        <div class="sub-question-select">
          <select
            :value="subQ.userAnswer || ''"
            @change="onSelect(subQ.id, ($event.target as HTMLSelectElement).value)"
            :disabled="showResults"
            class="answer-select"
          >
            <option value="">-- 请选择 --</option>
            <option v-for="opt in sharedOptions" :key="opt.key" :value="opt.key">
              {{ opt.key }}. {{ opt.text }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MarkdownIt from 'markdown-it'
import TcmTag from '@/components/ui/TcmTag.vue'

interface SubQuestion {
  id: string; questionStem: string; correctAnswer: string;
  userAnswer?: string | null; isCorrect?: boolean;
}

defineProps<{
  sharedOptions: { key: string; text: string }[]
  subQuestions: SubQuestion[]
  showResults?: boolean
}>()

const emit = defineEmits<{ answer: [questionId: string, answer: string] }>()

const md = new MarkdownIt({ html: false, breaks: true })

function renderMd(text: string): string { return md.render(text) }
function onSelect(qId: string, answer: string) { emit('answer', qId, answer) }
</script>

<style scoped>
.b1-group { margin-bottom: 24px; }
.b1-header { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; flex-wrap: wrap; }
.b1-instruction { font-size: var(--tcm-font-sm); color: var(--tcm-text-secondary); }
.b1-shared-options {
  display: flex; flex-direction: column; gap: 6px;
  padding: 16px; background: #FFF8E1; border: 1px solid #FFE082;
  border-radius: var(--tcm-radius-md); margin-bottom: 20px;
}
.b1-shared-option { display: flex; gap: 12px; font-size: var(--tcm-font-sm); }
.b1-sub-questions { display: flex; flex-direction: column; gap: 20px; }
.b1-sub-question { padding: 16px; background: var(--tcm-bg-surface); border: 1px solid var(--tcm-border-light); border-radius: var(--tcm-radius-md); }
.sub-question-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.sub-question-num { font-weight: 600; color: var(--tcm-primary-500); }
.sub-question-stem { font-size: var(--tcm-font-base); color: var(--tcm-text-primary); margin-bottom: 12px; }
.sub-question-select { }
.answer-select {
  width: 100%; padding: 8px 12px; border: 1px solid var(--tcm-border);
  border-radius: var(--tcm-radius-sm); font-size: var(--tcm-font-sm);
  background: var(--tcm-bg-base); color: var(--tcm-text-primary);
}
.text-tcm-success { color: var(--tcm-jade-500); }
.text-tcm-error { color: var(--tcm-error); }
.option-key { font-weight: 700; color: var(--tcm-primary-500); min-width: 20px; }
.option-text { color: var(--tcm-text-primary); }
</style>
