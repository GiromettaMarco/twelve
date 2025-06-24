import { applyTheme, getThemeFromAppearance, type Appearance, type Theme } from '@/lib/appearance'
import { AppearanceContext } from '@/providers/appearance-context'
import { DecoratorHelpers } from '@storybook/addon-themes'
import type { StoryContext } from '@storybook/react-vite'
import { useEffect, useState } from 'react'
import type { PartialStoryFn } from 'storybook/internal/csf'

const { initializeThemeState, pluckThemeFromContext } = DecoratorHelpers

export default function withTheme() {
  initializeThemeState(['light', 'dark'], 'light')

  return (Story: PartialStoryFn, context: StoryContext) => {
    /** Theme as set in the story */
    const storyTheme = pluckThemeFromContext(context)
    /** Theme as requested by the user */
    const { themeOverride } = context.parameters.themes ?? {}
    /** Selected theme with default */
    const selectedTheme: Theme = themeOverride || storyTheme || 'light'

    const [appearance, setAppearance] = useState<Appearance>(selectedTheme)
    const [theme, setTheme] = useState(selectedTheme)

    function updateAppearance(newAppearance: Appearance) {
      // Infer theme
      const newTheme = getThemeFromAppearance(newAppearance)

      // Apply theme
      applyTheme(newTheme)

      // Update state
      setAppearance(newAppearance)
      setTheme(newTheme)
    }

    useEffect(() => {
      updateAppearance(selectedTheme)
    }, [selectedTheme])

    return (
      <AppearanceContext value={{ appearance, theme, updateAppearance }}>
        <Story />
      </AppearanceContext>
    )
  }
}
