import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  root: 'src',           // onde está o index.html e o código fonte
  base: '/',             // URL base
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx'], 
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: '../dist',    // gera dist/ na raiz do projeto
    emptyOutDir: true,    // esvazia dist antes de cada build
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'vendor.react';
            if (id.includes('three')) return 'vendor.three';
            if (id.includes('@lottiefiles') || id.includes('lottie-web')) return 'vendor.lottie';
            if (id.includes('html2canvas')) return 'vendor.html2canvas';
            return 'vendor.misc';
          }
        }
      }
    }
  },
  server: {
    open: true,
  },
});

