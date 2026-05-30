import { copyFileSync } from 'node:fs'
import { resolve } from 'path'
import dts from 'unplugin-dts/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    minify: true,
    reportCompressedSize: true,
    sourcemap: true,
    lib: {
      entry: resolve('src/index.ts'),
      fileName: 'index',
      formats: ['es', 'cjs']
    },
    outDir: 'dist'
  },
  plugins: [
    dts({
      bundleTypes: true,
      copyDtsFiles: true,
      afterBuild: () => {
        copyFileSync('dist/index.d.ts', 'dist/index.d.cts')
      }
    })
  ]
})
