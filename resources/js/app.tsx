import '../css/app.css'

import { initializeTheme } from '@/lib/appearance'
import { createInertiaApp } from '@inertiajs/react'
import { LaravelReactI18nProvider } from 'laravel-react-i18n'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { createRoot, hydrateRoot } from 'react-dom/client'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel'

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
  setup({ el, App, props }) {
    if (import.meta.env.SSR) {
      // SSR
      hydrateRoot(
        el,
        <LaravelReactI18nProvider
          fallbackLocale={'en'}
          files={import.meta.glob('/lang/*.json')}
        >
          <App {...props} />
        </LaravelReactI18nProvider>
      )
    } else {
      // CSR
      const root = createRoot(el)

      root.render(
        <LaravelReactI18nProvider
          fallbackLocale={'en'}
          files={import.meta.glob('/lang/*.json')}
        >
          <App {...props} />
        </LaravelReactI18nProvider>
      )
    }
  },
  progress: {
    color: '#4B5563'
  }
})

// This will set light / dark mode on load...
initializeTheme()
