import type { StorybookConfig } from '@storybook/react-vite'

const alias = {
  '@inertiajs/core': import.meta.resolve('@repo/mock-inertia/core.js')
}

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
  features: {
    sidebarOnboardingChecklist: false
  },
  framework: '@storybook/react-vite',
  staticDirs: [{ from: '../public', to: '../storybook-static' }],
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      // Default prop filter, which excludes props from node_modules
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
      shouldExtractLiteralValuesFromEnum: true
    }
  },
  viteFinal: async (config) => {
    if (config.resolve) {
      if (Array.isArray(config.resolve.alias)) {
        config.resolve.alias.push(alias)
      } else {
        config.resolve.alias = {
          // oxlint-disable-next-line typescript/no-misused-spread
          ...config.resolve.alias,
          ...alias
        }
      }
    }
    return config
  }
}
export default config
