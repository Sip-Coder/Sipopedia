import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  publicDir: "public",
  build: {
    sourcemap: "hidden",
    rolldownOptions: {
      output: {
        codeSplitting: {
          includeDependenciesRecursively: false,
          groups: [
            {
              name: "vendor-three",
              test: /node_modules[\\/]three[\\/]/,
              minSize: 0,
              priority: 50
            },
            {
              name: "vendor-react",
              test: /node_modules[\\/](react|react-dom)[\\/]/,
              minSize: 0,
              priority: 30
            },
            {
              name: "vendor-supabase",
              test: /node_modules[\\/]@supabase[\\/]/,
              minSize: 0,
              priority: 30
            },
            {
              name: "vendor",
              test: /node_modules[\\/]/,
              minSize: 0,
              maxSize: 240000,
              priority: 1
            }
          ]
        }
      }
    }
  },
  server: {
    host: "0.0.0.0",
    port: 5000,
    allowedHosts: true
  },
  preview: {
    host: "0.0.0.0",
    port: 5000,
    allowedHosts: true
  }
});
