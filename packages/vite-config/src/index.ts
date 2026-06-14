import { mergeConfig } from 'vite'
import { viteESOnlyConfig } from './configs/vite-es-only.js'
import { viteConfig } from './configs/vite.js'
import { vitestConfig } from './configs/vitest.js'

export const sharedConfig = mergeConfig(viteConfig, vitestConfig)

export const sharedConfigESOnly = mergeConfig(viteESOnlyConfig, vitestConfig)
