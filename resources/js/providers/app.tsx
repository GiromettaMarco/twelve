import { applyTheme, getThemeFromAppearance, getUserStoredAppearance, type Appearance } from '@/lib/appearance'
import { setCookie } from '@/lib/cookie'
import { AppearanceContext } from '@/providers/appearance-context'
import { useState, type ReactNode } from 'react'

export default function App({ children }: { children: ReactNode }) {
  const storedAppearance = getUserStoredAppearance()
  const [appearance, setAppearance] = useState(storedAppearance)
  const [theme, setTheme] = useState(getThemeFromAppearance(storedAppearance))

  function updateAppearance(newAppearance: Appearance) {
    // Store in localStorage for client-side persistence...
    localStorage.setItem('appearance', newAppearance)

    // Store in cookie for SSR...
    setCookie('appearance', newAppearance)

    // Infer theme
    const newTheme = getThemeFromAppearance(newAppearance)

    // Apply theme
    applyTheme(newTheme)

    // Update state
    setAppearance(newAppearance)
    setTheme(newTheme)
  }

  return <AppearanceContext value={{ appearance, theme, updateAppearance }}>{children}</AppearanceContext>
}
