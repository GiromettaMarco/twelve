import type { StoryContext } from '@storybook/react-vite'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import { useEffect } from 'react'
import type { PartialStoryFn } from 'storybook/internal/csf'

export default function withLocaleSelector() {
  return (Story: PartialStoryFn, context: StoryContext) => {
    // Setup translations
    const { setLocale } = useLaravelReactI18n()

    const { locale } = context.globals

    // When the locale global changes set the new locale in i18n
    useEffect(() => {
      setLocale(locale || 'en')
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [locale])

    return <Story />
  }
}
