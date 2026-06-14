import { resolve } from 'path'
import dts from 'unplugin-dts/vite'
import { defineConfig } from 'vite'

export const viteESOnlyConfig = defineConfig({
  build: {
    minify: true,
    reportCompressedSize: true,
    sourcemap: true,
    lib: {
      entry: resolve('src/index.ts'),
      fileName: 'index',
      formats: ['es']
    },
    outDir: 'dist'
  },
  plugins: [
    dts({
      bundleTypes: true,
      copyDtsFiles: true,
      exclude: ['dist', 'node_modules', 'tests']
    })
  ]
})
