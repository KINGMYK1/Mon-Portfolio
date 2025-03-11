import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['chunk-DC5AMYBS', 'chunk-RLJ2RCJQ']
  }
});
