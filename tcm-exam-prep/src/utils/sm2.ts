/**
 * SM-2 改良间隔重复算法
 *
 * 基于 SuperMemo SM-2 算法，用于科学安排复习间隔。
 *
 * 评分质量 (Quality)：
 *   0 - 完全忘记 (complete blackout)
 *   1 - 错误，但看到答案后有印象
 *   2 - 错误，但答案感觉很熟悉
 *   3 - 正确，但非常困难 (严重犹豫)
 *   4 - 正确，稍有犹豫
 *   5 - 完美回答 (毫不犹豫)
 */

export interface SM2Input {
  quality: number
  repetitions: number
  easinessFactor: number
  interval: number
}

export interface SM2Output {
  repetitions: number
  easinessFactor: number
  interval: number
  nextReviewDate: number
}

/**
 * 计算下一次复习调度
 */
export function calculateNextReview(input: SM2Input): SM2Output {
  const { quality } = input
  let { repetitions, easinessFactor, interval } = input

  const q = Math.max(0, Math.min(5, Math.round(quality)))

  if (q < 3) {
    repetitions = 0
    interval = 1
  } else {
    if (repetitions === 0) {
      interval = 1
    } else if (repetitions === 1) {
      interval = 6
    } else {
      interval = Math.round(interval * easinessFactor)
    }
    repetitions += 1
  }

  easinessFactor = easinessFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))

  if (easinessFactor < 1.3) {
    easinessFactor = 1.3
  }

  const now = new Date()
  const nextDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + interval
  )

  return {
    repetitions,
    easinessFactor: Math.round(easinessFactor * 100) / 100,
    interval,
    nextReviewDate: nextDate.getTime(),
  }
}

/**
 * 考试冲刺模式：根据考试日期压缩长间隔
 */
export function calculateCramMode(
  input: SM2Input,
  examDate?: Date | null
): SM2Output {
  const result = calculateNextReview(input)

  if (examDate) {
    const daysUntilExam = Math.ceil(
      (examDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    )
    if (daysUntilExam > 0 && result.interval > daysUntilExam) {
      result.interval = Math.max(1, Math.floor(daysUntilExam / 2))
    }
  }

  return result
}

/**
 * 获取评分对应的标签文字
 */
export function getQualityLabel(quality: number): string {
  const labels: Record<number, string> = {
    0: '完全忘记',
    1: '稍有印象',
    2: '感觉熟悉',
    3: '非常困难',
    4: '稍有犹豫',
    5: '完美回答',
  }
  return labels[quality] || '未知'
}
