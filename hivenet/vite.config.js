import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    host: true,          // bind 0.0.0.0 (all interfaces) — needed in Docker
    port: 5173,
    strictPort: true,
    // Helpful in Docker so HMR connects via your browser's host:
    hmr: { host: 'localhost', port: 5173 }
  },
  plugins: [
    laravel({
      input: 'resources/js/app.jsx',
      refresh: true,
    }),
    react(),
  ],
})
