import { mergeConfig } from 'vite-plus'
import reactConfig from '../../tooling/vite/react'
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
      '@inertiajs/core': import.meta
        .resolve('../../tooling/mocks/@inertiajs/core.js')
    },
    name: 'forms',
    setupFiles: ['./vitest.setup.ts']
  }
})
