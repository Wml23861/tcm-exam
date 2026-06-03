/** 设计令牌接口 */
export interface DesignTokens {
  bgBase: string; bgSurface: string; bgElevated: string; bgOverlay: string
  bgCode: string; bgInkTexture: string
  primary50: string; primary100: string; primary300: string; primary500: string; primary700: string; primary900: string
  accent300: string; accent500: string; accent700: string
  textPrimary: string; textSecondary: string; textDisabled: string; textLink: string; textOnPrimary: string; textOnAccent: string
  borderDefault: string; borderLight: string; borderFocus: string
  successBg: string; successText: string; successBorder: string
  warningBg: string; warningText: string; warningBorder: string
  errorBg: string; errorText: string; errorBorder: string
  infoBg: string; infoText: string; infoBorder: string
  goldBg: string; goldText: string; goldBorder: string
  purpleBg: string; purpleText: string; purpleBorder: string
  shadowSm: string; shadowMd: string; shadowLg: string
  inkColor: string; sealColor: string; scrollBorder: string; goldAccent: string
  seasonName: string; seasonLabel: string; isDark: boolean
}

export type Season = 'spring' | 'summer' | 'autumn' | 'winter'
export type ThemeMode = 'light' | 'dark' | 'system'
export type ThemeId = 'spring-light' | 'spring-dark' | 'summer-light' | 'summer-dark' | 'autumn-light' | 'autumn-dark' | 'winter-light' | 'winter-dark'
