import { computed } from 'vue'
import { useSettingsStore } from '@/stores/useSettingsStore'

export function useTheme() {
  const store = useSettingsStore()
  const currentThemeId = computed(() => {
    const { season, themeMode } = store.settings
    const dark = themeMode === 'system' ? window.matchMedia('(prefers-color-scheme: dark)').matches : themeMode === 'dark'
    return `${season}-${dark ? 'dark' : 'light'}`
  })
  const isDark = computed(() => currentThemeId.value.includes('-dark'))
  const seasonLabel = computed(() => ({spring:'春',summer:'夏',autumn:'秋',winter:'冬'})[store.settings.season] || '夏')
  return { currentThemeId, isDark, seasonLabel, season: computed(() => store.settings.season), themeMode: computed(() => store.settings.themeMode), fontSize: computed(() => store.settings.fontSize), setSeason: store.setSeason, setThemeMode: store.setThemeMode, setFontSize: store.setFontSize }
}
