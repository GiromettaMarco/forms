import { mergeConfig } from 'vite-plus'
import storybookConfig from '../../vite-config/storybook'

export default mergeConfig(storybookConfig, {
  test: {
    alias: {
      '@inertiajs/core': import.meta.resolve('@repo/mock-inertia/core.js')
    },
    name: 'storybook'
  }
})
