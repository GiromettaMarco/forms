import { mergeConfig } from 'vite-plus'
import reactConfig from '../../vite-config/react'
import { resolve } from 'path'

export default mergeConfig(reactConfig, {
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  test: {
    name: 'react-ui',
    setupFiles: ['./vitest.setup.ts']
  }
})
