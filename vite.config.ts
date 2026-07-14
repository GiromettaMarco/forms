import { defineConfig } from 'vite-plus'

export default defineConfig({
  fmt: {
    htmlWhitespaceSensitivity: 'css',
    ignorePatterns: [
      'composer.lock',
      'pnpm-lock.yaml',
      '**/dist',
      'tooling/mocks/@inertiajs/core.js',
      '**/mockServiceWorker.js'
    ],
    overrides: [
      {
        files: ['packages/forms/**'],
        options: {
          sortTailwindcss: {
            functions: ['clsx', 'cn', 'cva'],
            stylesheet: './packages/forms/.storybook/theme.css'
          }
        }
      },
      {
        files: ['packages/react-ui/**'],
        options: {
          sortTailwindcss: {
            functions: ['clsx', 'cn', 'cva'],
            stylesheet: './tooling/themes/default.css'
          }
        }
      }
    ],
    printWidth: 80,
    semi: false,
    singleAttributePerLine: true,
    singleQuote: true,
    sortPackageJson: {
      sortScripts: true
    },
    tabWidth: 2,
    trailingComma: 'none'
  },
  lint: {
    categories: {
      correctness: 'warn'
    },
    env: {
      builtin: true
    },
    ignorePatterns: [
      '**/dist',
      'node_modules',
      'coverage',
      'tooling/mocks/@inertiajs/core.js',
      '**/mockServiceWorker.js'
    ],
    jsPlugins: [
      {
        name: 'vite-plus',
        specifier: 'vite-plus/oxlint-plugin'
      }
    ],
    options: {
      typeAware: true,
      typeCheck: true
    },
    overrides: [
      {
        files: [
          'packages/forms/**',
          'packages/react-ui/**',
          'packages/tsv-hookform/**'
        ],
        plugins: ['react'],
        rules: {
          'exhaustive-deps': 'error',
          'rules-of-hooks': 'error'
        }
      }
    ],
    plugins: ['oxc', 'typescript', 'unicorn'],
    rules: {
      'no-array-constructor': 'error',
      'no-unused-expressions': 'error',
      'no-unused-vars': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      'sort-imports': 'warn',
      'sort-keys': 'warn',
      'sort-vars': 'warn',
      'typescript/ban-ts-comment': 'error',
      'typescript/no-duplicate-enum-values': 'error',
      'typescript/no-empty-object-type': 'error',
      'typescript/no-explicit-any': 'error',
      'typescript/no-extra-non-null-assertion': 'error',
      'typescript/no-misused-new': 'error',
      'typescript/no-namespace': 'error',
      'typescript/no-non-null-asserted-optional-chain': 'error',
      'typescript/no-require-imports': 'error',
      'typescript/no-this-alias': 'error',
      'typescript/no-unnecessary-type-constraint': 'error',
      'typescript/no-unsafe-declaration-merging': 'error',
      'typescript/no-unsafe-function-type': 'error',
      'typescript/no-wrapper-object-types': 'error',
      'typescript/prefer-as-const': 'error',
      'typescript/prefer-namespace-keyword': 'error',
      'typescript/triple-slash-reference': 'error',
      'vite-plus/prefer-vite-plus-imports': 'error'
    }
  },
  run: {
    cache: true,
    tasks: {
      build: {
        command: 'vp run -r build'
      },
      ready: {
        command: ['vp check', 'vp run test', 'vp run build']
      },
      test: {
        command: 'vp run -r test',
        input: [{ auto: true }, '!**/coverage/.tmp/**']
      }
    }
  },
  staged: {
    '*': ['vp check --fix']
  },
  test: {
    coverage: {
      enabled: false,
      include: ['packages/*/src/**'],
      provider: 'istanbul',
      reporter: ['text', 'json-summary']
    },
    projects: ['packages/*']
  }
})
