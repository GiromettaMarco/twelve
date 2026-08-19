/// <reference types="vite/client" />

import '../resources/css/app.css'

import withI18n from '@decorators/with-i18n'
import withLocaleSelector from '@decorators/with-locale-selector'
import withTheme from '@decorators/with-theme'
import withZiggy from '@decorators/with-ziggy'
import type { Preview } from '@storybook/react-vite'
import { mswLoader } from 'msw-storybook-addon/csf3'
import { setupWorker } from 'msw/browser'

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

  // @NOTE decorators are resolved in stack order
  decorators: [withTheme(), withLocaleSelector(), withI18n(), withZiggy()],

  loaders: [
    mswLoader(async () => {
      const worker = setupWorker()
      await worker.start({
        onUnhandledRequest: import.meta.env.MSW_ON_UNHANDLED_REQUEST ?? 'bypass',
        quiet: import.meta.env.MSW_QUIET ?? true
      })
      return worker
    })
  ] // Add the MSW loader to all stories
}

export default preview
