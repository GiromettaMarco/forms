import { mergeConfig } from 'vite-plus'
import { playwright } from 'vite-plus/test/browser-playwright'
import reactConfig from './react'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'

export default mergeConfig(reactConfig, {
  test: {
    projects: [
      {
        extends: true,
        plugins: [storybookTest()],
        test: {
          browser: {
            enabled: true,
            headless: true,
            instances: [{ browser: 'chromium' }],
            provider: playwright()
          },
          name: 'storybook'
        }
      }
    ]
  }
})
