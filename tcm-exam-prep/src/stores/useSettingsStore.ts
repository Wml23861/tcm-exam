import { defineStore } from 'pinia'
import { ref } from 'vue'
import { settingsRepo } from '@/db/repositories/settingsRepo'
import type { AppSettings } from '@/types'

export const useSettingsStore = defineStore('settings', () => {
  const settings = ref<AppSettings>({
    dailyStudyGoal: 20,
    dailyQuestionGoal: 50,
    dailyReviewGoal: 30,
    defaultExamDuration: 60,
    defaultExamQuestionCount: 100,
    theme: 'light',
    fontSize: 'medium',
    dailyNewCards: 20,
    dailyReviewCards: 100,
    studyReminderEnabled: false,
    studyReminderTime: '09:00',
    examDate: null,
  })

  async function loadSettings() {
    settings.value = await settingsRepo.get()
    applyTheme()
  }

  async function updateSettings(patch: Partial<AppSettings>) {
    settings.value = await settingsRepo.update(patch)
    if (patch.theme) applyTheme()
  }

  function applyTheme() {
    document.documentElement.setAttribute('data-theme', settings.value.theme)
  }

  async function resetSettings() {
    settings.value = await settingsRepo.reset()
    applyTheme()
  }

  return { settings, loadSettings, updateSettings, resetSettings }
})
