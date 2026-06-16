import { mergeConfig } from 'vite'
import { viteConfig } from './configs/vite.js'
import { vitestConfig } from './configs/vitest.js'

export const sharedConfig = mergeConfig(viteConfig, vitestConfig)
