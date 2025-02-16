import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        // target: 'http://localhost:4000/api/v1', // URL of your backend
        target: 'https://amishop-api.vercel.app/api/v1', // Vercel URL of your backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor"; // Separate vendor libraries
          }
          return null;
        }
      }
    },
    chunkSizeWarningLimit: 1500, // Increase warning limit to 1.5 MB (temporary fix)
  }
})