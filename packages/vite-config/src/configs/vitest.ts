import { defineConfig } from 'vitest/config'

export const vitestConfig = defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      enabled: true,
      include: ['src/**'],
      reporter: ['text', 'json-summary']
    }
  }
})
