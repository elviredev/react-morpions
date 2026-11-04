import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import parenthesizeMultilineJsx from './eslint-rules/parenthesize-multiline-jsx.js'

export default [
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.flat.recommended.rules,
      'no-unused-vars': 'warn',
      'no-restricted-globals': ['error', 'name'],
      'react/prop-types': 'off',
    },
  },
  {
    plugins: {
      local: {
        rules: {
          'parenthesize-multiline-jsx': parenthesizeMultilineJsx,
        },
      },
    },
    rules: {
      'local/parenthesize-multiline-jsx': 'error',
    },
  },
]
