import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import { defineConfig } from 'eslint/config'
import baseConfig from './base.js'

export default defineConfig([
  baseConfig,

  // React
  {
    plugins: {
      react
    },
    rules: {
      ...react.configs['jsx-runtime'].rules,
      'react/jsx-sort-props': 'error'
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  },

  // React Hooks
  {
    plugins: {
      // @ts-expect-error: eslint-plugin-react-hooks broken declaration
      'react-hooks': reactHooks
    },
    rules: reactHooks.configs.recommended.rules
  }
])
