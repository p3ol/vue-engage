import path from 'node:path';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@poool/vue-engage': path.resolve(__dirname, '../../src'),
    },
  },
});
