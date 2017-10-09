
const { NODE_ENV } = process.env

const isProd = NODE_ENV === 'production'

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
    'no-console': isProd ? 'error' : 'off',
    'no-debugger': isProd ? 'error' : 'off',
    'no-var': 'error',
    'prefer-const': 'warn',
    'no-useless-concat': 'warn',
    'arrow-parens': ['warn', 'as-needed', { requireForBlockBody: true }],
    'comma-dangle': ['warn', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'only-multiline',
    }],
  }
}
