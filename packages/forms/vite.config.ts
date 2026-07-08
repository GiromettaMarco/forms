import { alias } from './.storybook/alias'
import { mergeConfig } from 'vite-plus'
import { playwright } from 'vite-plus/test/browser-playwright'
import reactConfig from '../../tooling/vite/react'
import { resolve } from 'path'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'

export default mergeConfig(reactConfig, {
  pack: {
    entry: {
      index: './src/index.ts',
      validation: './src/validation.ts'
    },
    exports: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  test: {
    projects: [
      {
        extends: true,
        plugins: [storybookTest()],
        test: {
          alias,
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
