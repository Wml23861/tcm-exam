/** 系统设置相关类型定义 */

export type Season = 'spring' | 'summer' | 'autumn' | 'winter'
export type ThemeMode = 'light' | 'dark' | 'system'
export type FontSize = 'small' | 'medium' | 'large'

export type ThemeId =
  | 'spring-light' | 'spring-dark'
  | 'summer-light' | 'summer-dark'
  | 'autumn-light' | 'autumn-dark'
  | 'winter-light' | 'winter-dark'

export interface AppSettings {
  dailyStudyGoal: number
  dailyQuestionGoal: number
  dailyReviewGoal: number
  defaultExamDuration: number
  defaultExamQuestionCount: number
  /** 季节 (spring | summer | autumn | winter) */
  season: Season
  /** 明暗模式 (light | dark | system) */
  themeMode: ThemeMode
  fontSize: FontSize
  dailyNewCards: number
  dailyReviewCards: number
  studyReminderEnabled: boolean
  studyReminderTime: string
  examDate: number | null
}

export function resolveThemeId(season: Season, mode: ThemeMode): ThemeId {
  const dark = mode === 'system'
    ? window.matchMedia('(prefers-color-scheme: dark)').matches
    : mode === 'dark'
  return `${season}-${dark ? 'dark' : 'light'}` as ThemeId
}
