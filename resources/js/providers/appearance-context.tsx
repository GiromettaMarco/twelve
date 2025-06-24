import type { Appearance, Theme } from '@/lib/appearance'
import { createContext } from 'react'

// @BUG react context api doesn't work with inertia
// useContext returns default values in the page component

type AppearanceContextType = {
  appearance: Appearance
  theme: Theme
  updateAppearance: (appearance: Appearance) => void
}

export const AppearanceContext = createContext<AppearanceContextType>({
  appearance: 'system',
  theme: 'light',
  updateAppearance: () => {}
})
