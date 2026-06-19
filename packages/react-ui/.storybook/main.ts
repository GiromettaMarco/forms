import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  addons: [
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-themes'
  ],
  core: {
    disableTelemetry: true
  },
  framework: '@storybook/react-vite',
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ]
}
export default config
