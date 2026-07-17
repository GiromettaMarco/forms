import defaultConfig from '../../vite-config/default'
import { mergeConfig } from 'vite-plus'
import { resolve } from 'path'

export default mergeConfig(defaultConfig, {
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
