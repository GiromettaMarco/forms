import defaultConfig from './default'
import { mergeConfig } from 'vite-plus'
import { playwright } from 'vite-plus/test/browser-playwright'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'

/** Vitest or Storybook environment */
const testing = process.env.VITEST || process.argv[1]?.includes('storybook')

export default mergeConfig(defaultConfig, {
  test: {
    projects: [
      {
        extends: true,
        plugins: [testing ? storybookTest() : null],
        test: {
          browser: {
            enabled: true,
            headless: true,
            instances: [{ browser: 'chromium' }],
            provider: playwright({})
          },
          name: 'storybook'
        }
      }
    ]
  }
})
