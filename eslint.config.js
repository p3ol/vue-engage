import { defineConfig } from 'eslint/config';
import pooolint from '@poool/eslint-config';
import vuelint from 'eslint-plugin-vue';
import globals from 'globals';

export default defineConfig(
  { ignores: [
    'dist',
    '**/dist',
    'coverage',
    '.yarn',
    'node_modules',
    'examples/nuxt/.nuxt/**',
  ] },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        globalThis: 'readonly',
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  ...pooolint.configs.recommended,
  ...vuelint.configs['flat/recommended'],
  {
    rules: {
      'vue/max-attributes-per-line': 'off',
      'vue/attribute-hyphenation': 'off',
      'vue/multi-word-component-names': 'off',
    },
  }
);
