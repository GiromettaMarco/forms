import { mergeConfig } from 'vite-plus'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import storybookConfig from '../../tooling/vite/storybook'
import tailwindcss from '@tailwindcss/vite'

export default mergeConfig(storybookConfig, {
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
