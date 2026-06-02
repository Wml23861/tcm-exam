/** 考试记录相关类型定义 */

export type ExamType = 'chapter' | 'subject' | 'mock' | 'custom'

export interface ExamConfig {
  examType: ExamType
  scopeId: string
  scopeName: string
  subjectIds: string[]
  questionCount: number
  timeLimit: number
}

export interface ExamAnswer {
  questionId: string
  userAnswer: string | null
  isCorrect: boolean
  timeSpent: number
  isMarked: boolean
}

export interface ExamRecord {
  id: string
  /** 考试类型 */
  examType: ExamType
  /** 考试范围 ID */
  scopeId: string
  /** 考试范围名称 */
  scopeName: string
  /** 开始时间 */
  startTime: number
  /** 结束时间 */
  endTime: number | null
  /** 是否完成 */
  isCompleted: boolean
  /** 总题数 */
  totalQuestions: number
  /** 已答题数 */
  answeredQuestions: number
  /** 正确题数 */
  correctCount: number
  /** 得分 (百分制) */
  score: number
  /** 考试用时 (秒) */
  duration: number
  /** 每题答题详情 */
  answers: ExamAnswer[]
  /** 设定的考试时长 (秒) */
  timeLimit: number
}
