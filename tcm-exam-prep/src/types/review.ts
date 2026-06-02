/** 间隔重复复习相关类型定义 */

export type ReviewItemType = 'knowledgePoint' | 'flashcard' | 'question' | 'formulaSong'

export interface ReviewSchedule {
  id: string
  /** 复习项类型 */
  itemType: ReviewItemType
  /** 复习项 ID */
  itemId: string
  /** SM-2 算法参数 */
  /** 简易度因子 (初始 2.5, 最小 1.3) */
  easinessFactor: number
  /** 当前间隔 (天) */
  interval: number
  /** 重复次数 */
  repetitions: number
  /** 下次复习日期 (timestamp) */
  nextReviewDate: number
  /** 上次复习日期 (timestamp) */
  lastReviewDate: number | null
  /** 上次评分质量 (0-5) */
  lastQuality: number | null
  /** 所属科目 */
  subjectId: string
}

export interface ReviewStats {
  total: number
  completed: number
  remaining: number
  dueToday: number
  overdue: number
}

export interface DayForecast {
  date: number
  count: number
}
