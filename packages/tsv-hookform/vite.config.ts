import defaultConfig from '../../vite-config/default'
import { mergeConfig } from 'vite-plus'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default mergeConfig(defaultConfig, {
  plugins: react(),
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts']
  }
})
