import defaultConfig from '../../tooling/vite/default'
import { mergeConfig } from 'vite-plus'
import { resolve } from 'path'

export default mergeConfig(defaultConfig, {
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
