/**
 * 考试评分计算
 */

import type { ExamAnswer } from '@/types'

export interface ScoreResult {
  total: number
  answered: number
  correct: number
  wrong: number
  score: number
  accuracy: number
}

/**
 * 计算考试成绩
 */
export function calculateScore(answers: ExamAnswer[], totalQuestions: number): ScoreResult {
  const answered = answers.filter(a => a.userAnswer !== null).length
  const correct = answers.filter(a => a.isCorrect).length
  const wrong = answered - correct
  const accuracy = answered > 0 ? correct / answered : 0
  const score = totalQuestions > 0 ? Math.round((correct / totalQuestions) * 100) : 0

  return {
    total: totalQuestions,
    answered,
    correct,
    wrong,
    score,
    accuracy: Math.round(accuracy * 100),
  }
}

/**
 * 获取评分等级
 */
export function getScoreGrade(score: number): { label: string; color: string } {
  if (score >= 90) return { label: '优秀', color: 'var(--tcm-jade-500)' }
  if (score >= 80) return { label: '良好', color: 'var(--tcm-jade-300)' }
  if (score >= 70) return { label: '一般', color: 'var(--tcm-warning)' }
  if (score >= 60) return { label: '及格', color: 'var(--tcm-gold-500)' }
  return { label: '不及格', color: 'var(--tcm-error)' }
}
