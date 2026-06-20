import defaultConfig from '../../tooling/vite/default'
import { fileURLToPath } from 'node:url'
import { mergeConfig } from 'vite-plus'
import path from 'node:path'
import { playwright } from 'vite-plus/test/browser-playwright'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import tailwindcss from '@tailwindcss/vite'

const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url))

/** Vitest or Storybook environment */
const testing = process.env.VITEST || process.argv[1]?.includes('storybook')

export default mergeConfig(defaultConfig, {
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
        plugins: [
          testing
            ? storybookTest({ configDir: path.join(dirname, '.storybook') })
            : null
        ],
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
