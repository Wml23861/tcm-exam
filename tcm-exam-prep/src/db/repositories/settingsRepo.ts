import { apiGet, apiPut } from '@/utils/api-client'
import type { AppSettings } from '@/types'

const defaultSettings: AppSettings = {
  dailyStudyGoal: 20,
  dailyQuestionGoal: 50,
  dailyReviewGoal: 30,
  defaultExamDuration: 60,
  defaultExamQuestionCount: 100,
  season: "spring", themeMode: "light",
  fontSize: 'medium',
  dailyNewCards: 20,
  dailyReviewCards: 100,
  studyReminderEnabled: false,
  studyReminderTime: '09:00',
  examDate: null,
}

export const settingsRepo = {
  async get(): Promise<AppSettings> {
    try { return await apiGet<AppSettings>('/api/settings') } catch { return defaultSettings }
  },

  async update(patch: Partial<AppSettings>): Promise<AppSettings> {
    return apiPut<AppSettings>('/api/settings', patch)
  },

  async reset(): Promise<AppSettings> {
    return apiPut<AppSettings>('/api/settings', defaultSettings)
  },
}
