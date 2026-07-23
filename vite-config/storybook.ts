import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite-plus'
import { playwright } from 'vite-plus/test/browser-playwright'

export default defineConfig({
  plugins: [storybookTest(), tailwindcss()],
  resolve: {
    tsconfigPaths: true
  },
  test: {
    browser: {
      enabled: true,
      headless: true,
      instances: [{ browser: 'chromium' }],
      provider: playwright()
    },
    coverage: {
      enabled: false,
      include: ['src/**'],
      provider: 'istanbul',
      reporter: ['text', 'json-summary']
    }
  }
})
