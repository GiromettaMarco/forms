import { mergeConfig } from 'vite-plus'
import { resolve } from 'path'
import storybookConfig from '../../vite-config/storybook'

export default mergeConfig(storybookConfig, {
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  test: {
    alias: {
      '@inertiajs/core': import.meta.resolve('@repo/mock-inertia/core.js')
    },
    name: 'storybook'
  }
})
