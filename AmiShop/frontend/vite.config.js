import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor"; // Separate vendor libraries
          }
          return null;
        },
      },
    },
    chunkSizeWarningLimit: 1500, // Increase warning limit to 1.5 MB (temporary fix)
  },
});
