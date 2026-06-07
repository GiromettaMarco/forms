import storybook from 'eslint-plugin-storybook'
import { defineConfig } from 'eslint/config'
import reactConfig from './react.js'

export default defineConfig([
  reactConfig,

  // Storybook
  // @ts-expect-error: eslint-plugin-react-hooks broken declaration
  ...storybook.configs['flat/recommended']
])
