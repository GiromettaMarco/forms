import react from '@vitejs/plugin-react'
import { mergeConfig } from 'vite-plus'
import defaultConfig from '../../vite-config/default'

export default mergeConfig(defaultConfig, {
  plugins: react(),
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts']
  }
})
