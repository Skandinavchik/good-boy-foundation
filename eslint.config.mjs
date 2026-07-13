import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import stylistic from '@stylistic/eslint-plugin'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      // Stylistic
      '@stylistic/indent': ['error', 2],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/quote-props': ['error', 'as-needed'],
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/object-curly-spacing': ['error', 'always', { objectsInObjects: false }],
      '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: false }],
      '@stylistic/object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
      '@stylistic/key-spacing': ['error', { beforeColon: false }],
      '@stylistic/no-multi-spaces': 'error',
      '@stylistic/rest-spread-spacing': ['error', 'never'],
      '@stylistic/array-bracket-spacing': ['error', 'never'],
      '@stylistic/eol-last': ['error', 'always'],
      '@stylistic/no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      '@stylistic/arrow-spacing': ['error', { before: true, after: true }],
      '@stylistic/arrow-parens': ['error', 'as-needed'],
      '@stylistic/no-trailing-spaces': ['error', { skipBlankLines: false }],
      '@stylistic/comma-spacing': ['error', { before: false, after: true }],
      '@stylistic/max-len': ['error', { code: 120, ignoreTrailingComments: true, ignoreStrings: true }],

      // General JavaScript / Code Quality
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      'no-debugger': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'no-unused-expressions': 'error',

      // React Best Practices
      'react/self-closing-comp': ['error', { component: true, html: true }],
      'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
      'react/no-array-index-key': 'warn',
      'react/no-unescaped-entities': 'warn',

      // Accessibility (a11y)
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/aria-props': 'error',
      'jsx-a11y/aria-proptypes': 'error',
      'jsx-a11y/aria-unsupported-elements': 'error',
      'jsx-a11y/role-has-required-aria-props': 'error',
      'jsx-a11y/role-supports-aria-props': 'error',

      // TypeScript Best Practices
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      }],
      '@typescript-eslint/consistent-type-imports': ['error', {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports',
      }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-empty-interface': 'error',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/prefer-as-const': 'error',
      'no-restricted-syntax': [
        'error',
        {
          selector: 'TSEnumDeclaration',
          message: 'Use union types instead of TypeScript enums for better bundle size and type safety.',
        },
      ],
    },
  },
])

export default eslintConfig
