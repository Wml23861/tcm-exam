/** 学习记录相关类型定义 */

export type StudyItemType = 'knowledgePoint' | 'flashcard' | 'question' | 'section'

export interface StudyRecord {
  id: string
  /** 学习类型 */
  itemType: StudyItemType
  /** 学习项 ID */
  itemId: string
  /** 所属科目 */
  subjectId: string
  /** 学习次数 */
  studyCount: number
  /** 首次学习时间 */
  firstStudiedAt: number
  /** 最近学习时间 */
  lastStudiedAt: number
  /** 累计学习时长 (秒) */
  totalTimeSpent: number
  /** 最近掌握度评分 (0-100) */
  masteryLevel: number
  /** 用户笔记 (可选) */
  notes: string
}

export interface SubjectProgress {
  subjectId: string
  totalItems: number
  studiedItems: number
  masteredItems: number
  progressPercent: number
  avgMasteryLevel: number
  totalTimeSpent: number
}

export interface DailyStudyRecord {
  date: string
  totalTimeSpent: number
  itemsStudied: number
  questionsAnswered: number
  correctCount: number
}

export interface StudyRecommendation {
  itemType: StudyItemType
  itemId: string
  subjectId: string
  subjectName: string
  title: string
  reason: string
  priority: number
}
