import { mergeConfig } from 'vite-plus'
import { resolve } from 'path'
import storybookConfig from '../../tooling/vite/storybook'

export default mergeConfig(storybookConfig, {
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
