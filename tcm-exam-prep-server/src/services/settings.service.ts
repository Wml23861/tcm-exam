import { getDb } from '../config/database.js'

interface SettingsRow {
  id: string
  user_id: string
  daily_study_goal: number
  daily_question_goal: number
  daily_review_goal: number
  default_exam_duration: number
  default_exam_question_count: number
  theme: string
  font_size: string
  daily_new_cards: number
  daily_review_cards: number
  study_reminder_enabled: number
  study_reminder_time: string
  exam_date: number | null
}

function map(row: SettingsRow) {
  return {
    dailyStudyGoal: row.daily_study_goal,
    dailyQuestionGoal: row.daily_question_goal,
    dailyReviewGoal: row.daily_review_goal,
    defaultExamDuration: row.default_exam_duration,
    defaultExamQuestionCount: row.default_exam_question_count,
    theme: row.theme,
    fontSize: row.font_size,
    dailyNewCards: row.daily_new_cards,
    dailyReviewCards: row.daily_review_cards,
    studyReminderEnabled: row.study_reminder_enabled === 1,
    studyReminderTime: row.study_reminder_time,
    examDate: row.exam_date,
  }
}

const defaults = {
  daily_study_goal: 20,
  daily_question_goal: 50,
  daily_review_goal: 30,
  default_exam_duration: 60,
  default_exam_question_count: 100,
  theme: 'light',
  font_size: 'medium',
  daily_new_cards: 20,
  daily_review_cards: 100,
  study_reminder_enabled: 0,
  study_reminder_time: '09:00',
  exam_date: null as number | null,
}

export const settingsService = {
  async get(userId: string) {
    const db = getDb()
    const row = await db<SettingsRow>('app_settings').where({ user_id: userId }).first()
    if (!row) {
      // 如果没有设置记录，创建默认设置
      await db('app_settings').insert({ id: userId, user_id: userId, ...defaults })
      return map({ ...defaults, id: userId, user_id: userId } as SettingsRow)
    }
    return map(row)
  },

  async update(userId: string, patch: Record<string, unknown>) {
    const db = getDb()
    const dbPatch: Record<string, unknown> = {}

    // 转换 camelCase 到 snake_case
    if ('dailyStudyGoal' in patch) dbPatch.daily_study_goal = patch.dailyStudyGoal
    if ('dailyQuestionGoal' in patch) dbPatch.daily_question_goal = patch.dailyQuestionGoal
    if ('dailyReviewGoal' in patch) dbPatch.daily_review_goal = patch.dailyReviewGoal
    if ('defaultExamDuration' in patch) dbPatch.default_exam_duration = patch.defaultExamDuration
    if ('defaultExamQuestionCount' in patch) dbPatch.default_exam_question_count = patch.defaultExamQuestionCount
    if ('theme' in patch) dbPatch.theme = patch.theme
    if ('fontSize' in patch) dbPatch.font_size = patch.fontSize
    if ('dailyNewCards' in patch) dbPatch.daily_new_cards = patch.dailyNewCards
    if ('dailyReviewCards' in patch) dbPatch.daily_review_cards = patch.dailyReviewCards
    if ('studyReminderEnabled' in patch) dbPatch.study_reminder_enabled = patch.studyReminderEnabled ? 1 : 0
    if ('studyReminderTime' in patch) dbPatch.study_reminder_time = patch.studyReminderTime
    if ('examDate' in patch) dbPatch.exam_date = patch.examDate

    // 确保设置记录存在
    const existing = await db('app_settings').where({ user_id: userId }).first()
    if (!existing) {
      await db('app_settings').insert({ id: userId, user_id: userId, ...defaults, ...dbPatch })
    } else {
      await db('app_settings').where({ user_id: userId }).update(dbPatch)
    }

    return settingsService.get(userId)
  },
}
