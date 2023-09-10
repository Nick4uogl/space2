module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    jest: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', 'import'],
  rules: {
    'react-refresh/only-export-components': [
      'off',
      { allowConstantExport: true },
    ],
    'react/prop-types': 'off',
    'react/display-name': 'off',

    'react/react-in-jsx-scope': 'off',
    'padded-blocks': ['error', 'never'],
    'no-empty-function': 'off',
    'no-multiple-empty-lines': ['error', { 'max': 2, 'maxBOF': 0, 'maxEOF': 1 }],
    'eol-last': ['error', 'always'],
    'quotes': ['error', 'single'],
    'semi': 'error',
    'indent': 'off',
    'switch-colon-spacing': 'error',
    'object-curly-spacing': ['error', 'always'],
    'no-irregular-whitespace': 'error',
    'space-before-blocks': 'error',
    'no-mixed-spaces-and-tabs': 'error',
    'no-multi-spaces': 'error',
    'no-whitespace-before-property': 'error',
    'no-prototype-builtins': 'off',
    'space-in-parens': 'error',
    'lines-between-class-members': 'error',
    'no-trailing-spaces': 'error',
    'comma-spacing': ['error', {
      'before': false,
      'after': true,
    }],
    'key-spacing': ['error', { 'beforeColon': false }],
    'no-var-requires': 0,
    'no-this-alias': 'off',
    'no-unused-vars': 'warn',

    'import/order': [
      'error',
      {
        groups: [
          ['external', 'builtin'],
          'internal',
          ['sibling', 'parent'],
          'index',
        ],
        pathGroups: [
          {
            pattern: '@(react|react-native)',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@src/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '**/*.+(css|sass|scss)',
            patternOptions: { 'dot': true, 'nocomment': true },
            group: 'unknown',
            position: 'after'
          },
          {
            pattern: '{.,..}/**/*.+(css|sass|scss)',
            patternOptions: { 'dot': true, 'nocomment': true },
            group: 'unknown',
            position: 'after'
          }
        ],
        pathGroupsExcludedImportTypes: ['internal', 'react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
};
