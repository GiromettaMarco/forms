import prettier from 'eslint-config-prettier'
import turbo from 'eslint-plugin-turbo'
import { defineConfig, globalIgnores } from 'eslint/config'
import typescript from 'typescript-eslint'

export default defineConfig([
  // Ignore
  globalIgnores(['**/dist', 'node_modules', 'coverage']),

  // Turbo
  {
    plugins: {
      turbo
    },
    rules: {
      'turbo/no-undeclared-env-vars': 'warn'
    }
  },

  // Typescript
  ...typescript.configs.recommended,

  // Prettier
  prettier
])
