import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@flavia-dev/a11y-ui-kit-react': path.resolve(__dirname, '../ui-kit/src'),
    },
  },
});
