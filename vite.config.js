// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  envDir: '.', // lê .env, .env.production, etc.
  plugins: [react()],
  root: 'src',
  define: {
    'import.meta.env.VITE_API_URL': JSON.stringify(
      process.env.VITE_API_URL || 'http://localhost:4000'
    ),
  },
  server: {
    open: true,
  },
  build: {
    outDir: '../dist',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/')) {
            // pega o nome do pacote imediatamente após node_modules
            const pieces = id.split('node_modules/')[1].split('/');
            const pkgName = pieces[0].startsWith('@')
              ? pieces.slice(0, 2).join('_')  // @scope/pkg -> @scope_pkg
              : pieces[0];
            return `vendor.${pkgName}`;
          }
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});

