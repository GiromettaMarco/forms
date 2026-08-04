import { mergeConfig } from 'vite-plus'
import defaultConfig from '../../vite-config/default'

export default mergeConfig(defaultConfig, {
  pack: {
    entry: {
      index: './src/index.ts',
      regex: './src/regex.ts'
    },
    exports: true
  }
})
