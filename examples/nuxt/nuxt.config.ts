import path from 'node:path';

import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: '2025-12-10',
  alias: {
    '@poool/vue-engage': path.resolve(__dirname, '../../src'),
  },
});
