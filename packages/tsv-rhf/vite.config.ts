import { sharedConfig } from '@repo/vite-config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { mergeConfig } from 'vite'

export default mergeConfig(sharedConfig, {
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './tests/setup.ts'
  }
})
