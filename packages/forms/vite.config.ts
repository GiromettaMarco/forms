import { mergeConfig } from 'vite-plus'
import reactConfig from '../../vite-config/react'
import { resolve } from 'path'

export default mergeConfig(reactConfig, {
  pack: {
    entry: {
      index: './src/index.ts',
      locales: './src/locales/index.ts'
    },
    exports: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
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
