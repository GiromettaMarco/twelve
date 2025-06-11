/// <reference types="vite/client" />

import '../resources/css/app.css'

import { withThemeByClassName } from '@storybook/addon-themes'
import type { Preview } from '@storybook/react-vite'
import { LaravelReactI18nProvider, useLaravelReactI18n } from 'laravel-react-i18n'
import { useEffect } from 'react'

const preview: Preview = {
  globalTypes: {
    locale: {
      description: 'Internationalization locale',
      toolbar: {
        // The label to show for this toolbar item
        title: 'Locale',
        icon: 'globe',
        // Array of plain string values or MenuItem shape
        items: [
          { value: undefined, title: 'Default' },
          { value: 'en', title: 'English', right: '🇬🇧' },
          { value: 'it', title: 'Italiano', right: '🇮🇹' }
        ],
        // Change title based on selected value
        dynamicTitle: true
      }
    }
  },

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },

  decorators: [
    // Dark theme
    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark'
      },
      defaultTheme: 'light'
    }),

    // I18n
    (Story, context) => {
      // Setup translations
      const { setLocale } = useLaravelReactI18n()

      const { locale } = context.globals

      // When the locale global changes set the new locale in i18n
      useEffect(() => {
        setLocale(locale)
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [locale])

      return (
        <LaravelReactI18nProvider
          locale={locale}
          fallbackLocale={'en'}
          files={import.meta.glob('../lang/*.json')}
        >
          <Story />
        </LaravelReactI18nProvider>
      )
    },

    // Ziggy route global function filler
    (Story) => {
      globalThis.route = () => '#'
      return <Story />
    }
  ]
}

export default preview
