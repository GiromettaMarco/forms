import { vitestConfig } from '@repo/vite-config/vitest'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    projects: [
      {
        root: './packages',
        test: vitestConfig.test
      }
    ]
  }
})
