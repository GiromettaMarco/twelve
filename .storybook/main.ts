import type { StorybookConfig } from '@storybook/react-vite'
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
  /**
   * Fix for asset loading due to Laravel-Vite setup
   * https://github.com/storybookjs/storybook/issues/22550#issuecomment-1661920350
   */
  async viteFinal(config) {
    return mergeConfig(config, {
      server: {
        origin: ''
      }
    })
  }
}
export default config
