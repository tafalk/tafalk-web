module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'indent': ['error', 2],
    'quotes': [2, 'single', { 'allowTemplateLiterals': true }],
    'semi': [2, 'never']
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
}
