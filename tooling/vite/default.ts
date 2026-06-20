import type { UserConfig } from 'vite-plus'

export default {
  test: {
    coverage: {
      enabled: true,
      include: ['src/**'],
      provider: 'istanbul',
      reporter: ['text', 'json-summary']
    }
  }
} satisfies UserConfig
