/// <reference types="vitest/config" />
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import laravel from 'laravel-vite-plugin'
import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/css/app.css', 'resources/js/app.tsx'],
      ssr: 'resources/js/ssr.tsx',
      refresh: true
    }),
    react(),
    tailwindcss(),
    tsConfigPaths()
  ],
  esbuild: {
    jsx: 'automatic'
  },
  test: {
    reporters: ['default'],
    coverage: {
      provider: 'v8',
      include: ['resources/js/**'],
      exclude: ['resources/js/app.tsx', 'resources/js/ssr.tsx', 'resources/js/providers/*'],
      reportsDirectory: './reports/vitest'
    }
  }
})
