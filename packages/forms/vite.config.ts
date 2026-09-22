import { mergeConfig } from 'vite-plus'
import reactConfig from '../../vite-config/react'

export default mergeConfig(reactConfig, {
  pack: {
    entry: {
      index: './src/index.ts',
      locales: './src/locales/index.ts'
    },
    exports: true
  },
  test: {
    alias: {
      '@inertiajs/core': import.meta.resolve('@repo/mock-inertia/core.js')
    },
    clearMocks: true,
    coverage: {
      exclude: ['src/i18n.ts']
    },
    name: 'forms',
    setupFiles: ['./test/vitest.setup.ts'],
    testTimeout: 5_000
  }
})
