import { mergeConfig } from 'vite-plus'
import reactConfig from '../../vite-config/react'

export default mergeConfig(reactConfig, {
  test: {
    alias: {
      '@inertiajs/core': import.meta.resolve('@repo/mock-inertia/core.js')
    },
    clearMocks: true,
    name: 'inertia-hook-form',
    setupFiles: ['./test/vitest.setup.ts'],
    testTimeout: 5_000
  }
})
