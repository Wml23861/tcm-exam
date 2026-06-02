/** 系统设置相关类型定义 */

export type ThemeMode = 'light' | 'sepia'
export type FontSize = 'small' | 'medium' | 'large'

export interface AppSettings {
  /** 每日学习目标 (知识点数量) */
  dailyStudyGoal: number
  /** 每日刷题目标 */
  dailyQuestionGoal: number
  /** 每日复习目标 */
  dailyReviewGoal: number
  /** 默认模拟考试时长 (分钟) */
  defaultExamDuration: number
  /** 默认模拟考试题量 */
  defaultExamQuestionCount: number
  /** 主题模式 */
  theme: ThemeMode
  /** 字体大小 */
  fontSize: FontSize
  /** 闪卡每日新卡数量 */
  dailyNewCards: number
  /** 闪卡每日复习上限 */
  dailyReviewCards: number
  /** 是否开启学习提醒 */
  studyReminderEnabled: boolean
  /** 学习提醒时间 (HH:mm) */
  studyReminderTime: string
  /** 考试日期 (null 表示未设置) */
  examDate: number | null
}
