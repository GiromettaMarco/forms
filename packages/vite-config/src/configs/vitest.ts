import { defineConfig } from 'vitest/config'

export const vitestConfig = defineConfig({
  test: {
    coverage: {
      provider: 'istanbul',
      enabled: true,
      include: ['src/**'],
      reporter: ['text', 'json-summary']
    }
  }
})
