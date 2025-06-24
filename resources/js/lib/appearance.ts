import { isBrowser, isWindow } from '@/lib/utils'

export type Theme = 'light' | 'dark'
export type Appearance = 'light' | 'dark' | 'system'

const mediaQuery = () => {
  if (!isBrowser()) {
    return null
  }

  return window.matchMedia('(prefers-color-scheme: dark)')
}

export function getUserStoredAppearance(): Appearance {
  if (isBrowser()) {
    return (localStorage.getItem('appearance') as Appearance) || 'system'
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

const handleSystemThemeChange = () => {
  const currentAppearance = localStorage.getItem('appearance') as Appearance
  applyThemeFromAppearance(currentAppearance || 'system')
}

export function initializeTheme() {
  applyThemeFromAppearance(getUserStoredAppearance())

  // Add the event listener for system theme changes...
  mediaQuery()?.addEventListener('change', handleSystemThemeChange)
}
