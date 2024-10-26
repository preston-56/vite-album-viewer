import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    },
    define: {
      'process.env.VITE_AWS_API_URL': JSON.stringify(process.env.VITE_AWS_API_URL)
    }
});
