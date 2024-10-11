/* eslint-env node */
const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  extends: [
    '../.eslintrc.cjs',
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    "vue/multi-word-component-names": OFF,
  }
}
