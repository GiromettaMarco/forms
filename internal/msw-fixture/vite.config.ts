import type { UserConfig } from 'vite-plus'

export default {
  pack: {
    entry: {
      index: './src/index.ts'
    },
    exports: true,
    minify: false,
    sourcemap: false
  }
} satisfies UserConfig
