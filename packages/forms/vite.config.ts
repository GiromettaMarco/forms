import { alias } from './.storybook/alias'
import defaultConfig from '../../tooling/vite/default'
import { mergeConfig } from 'vite-plus'
import { playwright } from 'vite-plus/test/browser-playwright'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import tailwindcss from '@tailwindcss/vite'

export default mergeConfig(defaultConfig, {
  pack: {
    entry: {
      index: './src/index.ts',
      validation: './src/validation.ts'
    },
    exports: true
  },
  plugins: [react(), tailwindcss()],
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
