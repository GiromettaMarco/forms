import { defineConfig } from 'vite-plus'

export default defineConfig({
  fmt: {
    htmlWhitespaceSensitivity: 'css',
    ignorePatterns: [
      'composer.lock',
      'pnpm-lock.yaml',
      '**/dist',
      'internal/mock-inertia/core.js',
      '**/mockServiceWorker.js'
    ],
    overrides: [
      {
        files: ['packages/forms/**'],
        options: {
          sortTailwindcss: {
            functions: ['clsx', 'cn', 'cva'],
            stylesheet: './packages/forms/theme.css'
          }
        }
      },
      {
        files: ['packages/react-ui/**'],
        options: {
          sortTailwindcss: {
            functions: ['clsx', 'cn', 'cva'],
            stylesheet: './packages/react-ui/theme.css'
          }
        }
      }
    ],
    printWidth: 80,
    semi: false,
    singleAttributePerLine: true,
    singleQuote: true,
    sortImports: {
      newlinesBetween: false,
      partitionByComment: true,
      partitionByNewline: true
    },
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
      'internal/mock-inertia/core.js',
      '**/mockServiceWorker.js'
    ],
    jsPlugins: [
      'eslint-plugin-perfectionist',
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
      // React
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
      'perfectionist/sort-interfaces': 'warn',
      'perfectionist/sort-jsx-props': 'warn',
      'perfectionist/sort-object-types': 'warn',
      'perfectionist/sort-objects': 'warn',
      'prefer-const': 'error',
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
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
        command: [
          'vp run -t @gmcode/forms#build',
          'vp run --filter=tsv-advanced build'
        ]
      },
      ready: {
        command: ['vp check', 'vp run test'],
        dependsOn: ['build']
      },
      test: {
        command: 'vp run -r test',
        dependsOn: ['build'],
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
