/** 错题本相关类型定义 */

export interface WrongQuestionRecord {
  id: string
  questionId: string
  subjectId: string
  /** 做错次数 */
  wrongCount: number
  /** 最近做错时间 */
  lastWrongAt: number
  /** 用户当时的错误答案 */
  lastWrongAnswer: string
  /** 用户笔记 */
  notes: string
  /** 是否已掌握 (用户手动标记) */
  isMastered: boolean
}
