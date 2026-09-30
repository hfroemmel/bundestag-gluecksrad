import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' : die App wird per file:// aus dem Paket geladen (offline, ohne Server).
export default defineConfig({
  base: './',
  plugins: [react()],
  build: { outDir: 'dist', assetsInlineLimit: 0, chunkSizeWarningLimit: 1000 },
});
