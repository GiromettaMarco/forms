import { mergeConfig } from 'vite-plus'
import { resolve } from 'path'
import storybookConfig from '../../tooling/vite/storybook'

export default mergeConfig(storybookConfig, {
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
    name: 'storybook'
  }
})
