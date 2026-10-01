import { mergeConfig } from 'vite-plus'
import reactConfig from '../../vite-config/react'

export default mergeConfig(reactConfig, {
  pack: {
    entry: {
      index: './src/use-form.ts',
      tsv: './src/tsv.ts'
    },
    exports: true
  },
  test: {
    alias: {
      '@inertiajs/core': import.meta.resolve('@repo/mock-inertia/core.js')
    },
    name: 'inertia-hook-form',
    setupFiles: ['./test/vitest.setup.ts'],
    testTimeout: 5_000
  }
})
