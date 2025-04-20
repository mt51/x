import js from '@eslint/js';
import globals from 'globals';
import ts from 'typescript-eslint';
import pluginJest from 'eslint-plugin-jest'

export default [
  { languageOptions: { globals: globals.browser } },
  js.configs.recommended,
  ...ts.configs.recommended,
  { ignores: ['dist/'] },
  {
    files: ['**/*.spec.js', '**/*.test.js'],
    plugins: { jest: pluginJest },
    languageOptions: {
      globals: pluginJest.environments.globals.globals,
    },
    rules: {
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error',
      "@typescript-eslint/no-explicit-any": "off"
    },
  },
];
