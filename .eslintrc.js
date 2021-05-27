module.exports = {
  extends: ['@voiceflow/eslint-config', '@voiceflow/eslint-config/typescript'],
  overrides: [
    {
      files: ['.*rc.js', '*.config.js'],
      extends: ['@voiceflow/eslint-config/utility'],
    },
  ],
};
