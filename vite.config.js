import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(),    tailwindcss()  // Plugin Tailwind pour Vite
], server: {
    watch: {
      usePolling: true // Pour améliorer la détection des fichiers
    }},
  optimizeDeps: {
    exclude: ['chunk-DC5AMYBS', 'chunk-RLJ2RCJQ']
  }
});
