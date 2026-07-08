import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import defaultConfig from './default'
import { mergeConfig } from 'vite-plus'
import tailwindcss from '@tailwindcss/vite'

export default mergeConfig(defaultConfig, {
  pack: {
    minify: true,
    plugins: [babel({ presets: [reactCompilerPreset()] })]
  },
  plugins: [react(), tailwindcss()]
})
