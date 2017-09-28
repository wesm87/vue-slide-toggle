
const { NODE_ENV } = process.env

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    browser: true,
  },
  extends: 'standard',
  plugins: [
    'html',
  ],
  'rules': {
    'no-var': 'error',
    'prefer-const': 'warn',
    'no-useless-concat': 'warn',
    'arrow-parens': ['warn', 'as-needed', { requireForBlockBody: true }],
    'comma-dangle': ['warn', 'always-multiline'],
    'no-debugger': NODE_ENV === 'production' ? 'error' : 'off',
  }
}
