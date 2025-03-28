import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(),tailwindcss()],
  optimizeDeps: {
    exclude: ['chunk-DC5AMYBS', 'chunk-RLJ2RCJQ']
  }
});
