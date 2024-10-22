import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["redux-thunk"], // Pre-bundle redux-thunk
  },
  server: {
    proxy: {
      '/api' : {
        target: "http://localhost:5454/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
