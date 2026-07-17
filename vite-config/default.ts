import type { UserConfig } from 'vite-plus'

export default {
  pack: {
    minify: true
  },
  test: {
    coverage: {
      enabled: false,
      include: ['src/**'],
      provider: 'istanbul',
      reporter: ['text', 'json-summary']
    }
  }
} satisfies UserConfig
