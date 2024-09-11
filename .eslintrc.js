/* eslint-env node */
const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    // A: Essential
    "vue/multi-word-component-names": WARNING,
    "vue/no-mutating-props": ERROR,

    // B: Recommended
    "vue/first-attribute-linebreak": WARNING,
    "vue/html-closing-bracket-newline": WARNING,
    "vue/html-closing-bracket-spacing": WARNING,
    "vue/html-quotes": ERROR,
    "vue/max-attributes-per-line": OFF,
    "vue/mustache-interpolation-spacing": [WARNING, "always"],
    "vue/no-multi-spaces": ERROR,
    "vue/no-spaces-around-equal-signs-in-attribute": WARNING,
    "vue/singleline-html-element-content-newline": OFF,

    // Extension Rules
    "vue/array-bracket-newline": WARNING,
    "vue/padding-line-between-blocks": WARNING,
    "vue/padding-line-between-tags": OFF,
    "vue/padding-lines-in-component-definition": WARNING,
    "vue/script-indent": [ERROR, 2],
    "vue/new-line-between-multi-line-property": OFF,
  }
}
