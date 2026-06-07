import { sharedConfig } from '@repo/vite-config'
import { resolve } from 'path'
import { mergeConfig } from 'vite'

export default mergeConfig(sharedConfig, {
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
