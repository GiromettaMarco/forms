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
    name: 'forms',
    setupFiles: ['./vitest.setup.ts']
  }
})
