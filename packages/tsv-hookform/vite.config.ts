import defaultConfig from '../../vite-config/default'
import { mergeConfig } from 'vite-plus'
import react from '@vitejs/plugin-react'

export default mergeConfig(defaultConfig, {
  plugins: react(),
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts']
  }
})
