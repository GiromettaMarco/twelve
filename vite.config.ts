/// <reference types="vitest/config" />
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'
import laravel from 'laravel-vite-plugin'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url))

/**
 * Vitest or Storybook environment
 */
const testing = process.env.VITEST || process.argv[1]?.includes('storybook')

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/css/app.css', 'resources/js/app.tsx'],
      ssr: 'resources/js/ssr.tsx',
      refresh: true
    }),
    react(),
    tailwindcss()
  ],
  resolve: {
    tsconfigPaths: true
  },
  test: {
    reporters: ['default'],
    coverage: {
      provider: 'v8',
      include: ['resources/js/**'],
      exclude: ['resources/js/app.tsx', 'resources/js/ssr.tsx', 'resources/js/providers/*'],
      reportsDirectory: './reports/vitest'
    },
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          testing ? storybookTest({ configDir: path.join(dirname, '.storybook') }) : null
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: 'chromium' }]
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
          // This alias works only when running tests with the "vitest" command (ci), but not when running the "storybook" command (ui)
          alias: {
            '@inertiajs/react': path.resolve(import.meta.dirname, '.storybook/mocks/@inertiajs/react/index.mock.ts')
          }
        }
      }
    ]
  }
})
