import { mergeConfig } from 'vite-plus'
import reactConfig from '../../vite-config/react'

export default mergeConfig(reactConfig, {
  test: {
    name: 'react-ui',
    setupFiles: ['./vitest.setup.ts']
  }
})
