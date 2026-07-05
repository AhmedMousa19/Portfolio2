import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // Optimize Hot Module Replacement (HMR) based on environment flags
      hmr: process.env.DISABLE_HMR !== 'true',
      // Adjust file watch behavior to optimize system resource utilization
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
