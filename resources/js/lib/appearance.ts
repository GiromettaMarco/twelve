import { getCookie } from '@/lib/cookie'
import { isBrowser, isWindow } from '@/lib/utils'

export type Theme = 'light' | 'dark'
export type Appearance = 'light' | 'dark' | 'system'

export function isAppearance(appearance: string | undefined): appearance is Appearance {
  return appearance !== undefined && ['dark', 'light', 'system'].includes(appearance)
}

function mediaQuery() {
  if (!isBrowser()) {
    return null
  }

  return window.matchMedia('(prefers-color-scheme: dark)')
}

export function getUserStoredAppearance(): Appearance {
  if (isBrowser()) {
    const appearanceCookie = getCookie('appearance')

    if (isAppearance(appearanceCookie)) {
      return appearanceCookie
    }

    return 'system'
  }

  return 'system'
}

export function userPrefersDark() {
  if (isWindow()) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  return false
}

export function getThemeFromAppearance(appearance: Appearance) {
  if (appearance === 'system') {
    if (userPrefersDark()) {
      return 'dark'
    }

    return 'light'
  }

  return appearance
}

export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
}

export function applyThemeFromAppearance(appearance: Appearance) {
  applyTheme(getThemeFromAppearance(appearance))
}

function handleSystemThemeChange() {
  const appearanceCookie = getCookie('appearance')

  if (isAppearance(appearanceCookie)) {
    applyThemeFromAppearance(appearanceCookie)
  } else {
    applyThemeFromAppearance('system')
  }
}

export function initializeTheme() {
  applyThemeFromAppearance(getUserStoredAppearance())

  // Add the event listener for system theme changes...
  mediaQuery()?.addEventListener('change', handleSystemThemeChange)
}
