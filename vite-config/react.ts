import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import { mergeConfig } from 'vite-plus'
import { playwright } from 'vite-plus/test/browser-playwright'
import defaultConfig from './default'

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
