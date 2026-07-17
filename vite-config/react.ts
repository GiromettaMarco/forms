import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import defaultConfig from './default'
import { mergeConfig } from 'vite-plus'
import { playwright } from 'vite-plus/test/browser-playwright'
import tailwindcss from '@tailwindcss/vite'

export default mergeConfig(defaultConfig, {
  pack: {
    plugins: [babel({ presets: [reactCompilerPreset()] })]
  },
  plugins: [...react(), ...tailwindcss()],
  test: {
    browser: {
      enabled: true,
      headless: true,
      instances: [{ browser: 'chromium' }],
      provider: playwright()
    }
  }
})
