import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['groq-sdk'],
  },
  server: {
    proxy: {
      '/api/onecompiler': {
        target: 'https://api.onecompiler.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/onecompiler/, ''),
        secure: true,
      },
    },
  },
})
