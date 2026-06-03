import { defineStore } from 'pinia'
import { ref, onUnmounted } from 'vue'
import { settingsRepo } from '@/db/repositories/settingsRepo'
import { resolveThemeId } from '@/types'
import type { AppSettings, ThemeMode, Season, FontSize } from '@/types'

let systemDarkListener: (() => void) | null = null

export const useSettingsStore = defineStore('settings', () => {
  const settings = ref<AppSettings>({
    dailyStudyGoal: 20,
    dailyQuestionGoal: 50,
    dailyReviewGoal: 30,
    defaultExamDuration: 60,
    defaultExamQuestionCount: 100,
    season: 'summer',
    themeMode: 'light',
    fontSize: 'medium',
    dailyNewCards: 20,
    dailyReviewCards: 100,
    studyReminderEnabled: false,
    studyReminderTime: '09:00',
    examDate: null,
  })

  async function loadSettings(): Promise<void> {
    try {
      const saved = await settingsRepo.get()
      settings.value = { ...settings.value, ...saved }
    } catch {
      // 用默认值
    }
    applyTheme()
    applyFontSize()
    watchSystemPreference()
  }

  async function updateSettings(patch: Partial<AppSettings>): Promise<void> {
    settings.value = await settingsRepo.update(patch)
    if ('season' in patch || 'themeMode' in patch) applyTheme()
    if ('fontSize' in patch) applyFontSize()
  }

  async function resetSettings(): Promise<void> {
    settings.value = await settingsRepo.reset()
    applyTheme()
    applyFontSize()
  }

  function setSeason(season: Season): void {
    settings.value.season = season
    applyTheme()
  }

  function setThemeMode(mode: ThemeMode): void {
    settings.value.themeMode = mode
    applyTheme()
    watchSystemPreference()
  }

  function setFontSize(size: FontSize): void {
    settings.value.fontSize = size
    applyFontSize()
  }

  function applyTheme(): void {
    const themeId = resolveThemeId(settings.value.season, settings.value.themeMode)
    document.documentElement.setAttribute('data-theme', themeId)

    document.documentElement.classList.add('theme-transitioning')
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transitioning')
    }, 300)
  }

  function applyFontSize(): void {
    document.documentElement.setAttribute('data-font-size', settings.value.fontSize)
  }

  function watchSystemPreference(): void {
    if (systemDarkListener) {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', systemDarkListener)
    }
    if (settings.value.themeMode === 'system') {
      systemDarkListener = () => {
        if (settings.value.themeMode === 'system') applyTheme()
      }
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', systemDarkListener)
    }
  }

  onUnmounted(() => {
    if (systemDarkListener) {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', systemDarkListener)
    }
  })

  return {
    settings,
    loadSettings,
    updateSettings,
    resetSettings,
    setSeason,
    setThemeMode,
    setFontSize,
    applyTheme,
    applyFontSize,
  }
})
