module.exports = {
  extends: '../../.eslintrc.js',
  rules: {
    'no-continue': 'off',
    'quotes': ['error', 'single', 'avoid-escape'],
    'sonarjs/cognitive-complexity': 'warn',
    'promise/always-return': 'off',
    'require-jsdoc': 'off',
  }
};
