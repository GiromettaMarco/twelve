import type { StorybookConfig } from '@storybook/react-vite'
import path from 'path'
import { mergeConfig } from 'vite'

const config: StorybookConfig = {
  stories: ['../tests/stories/**/*.mdx', '../tests/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
    '@storybook/addon-themes'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  core: {
    disableTelemetry: true
  },
  staticDirs: ['../public'],
  viteFinal: async (config) => {
    // This alias works only when running tests with the "storybook" command (ui), but not when running the "vitest" command (ci)
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve?.alias,
        '@inertiajs/react': require.resolve('./mocks/@inertiajs/react/index.mock.ts'),
        '@/providers/app': path.resolve(__dirname, './mocks/app.mock.tsx')
      }
    }

    /**
     * Fix for asset loading due to Laravel-Vite setup
     * https://github.com/storybookjs/storybook/issues/22550#issuecomment-1661920350
     */
    return mergeConfig(config, {
      server: {
        origin: '',
        port: '6006'
      }
    })
  }
}
export default config
