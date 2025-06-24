import type { StoryContext } from '@storybook/react-vite'
import { LaravelReactI18nProvider } from 'laravel-react-i18n'
import type { PartialStoryFn } from 'storybook/internal/csf'

export default function withI18n() {
  return (Story: PartialStoryFn, context: StoryContext) => {
    const { locale } = context.globals

    return (
      <LaravelReactI18nProvider
        locale={locale || 'en'}
        fallbackLocale={'en'}
        files={import.meta.glob('../../lang/*.json', { eager: true })}
      >
        <Story />
      </LaravelReactI18nProvider>
    )
  }
}
