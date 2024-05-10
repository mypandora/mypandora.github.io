// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: resolve(__dirname, "src"),
  publicDir: resolve(__dirname, './public'),
  base: "/",
  build: {
    outDir: resolve(__dirname, 'dist'),
    chunkSizeWarningLimit: 1024,
    rollupOptions: {
      input: {
        index: resolve(__dirname, "src/index.html"),
        product: resolve(__dirname, "src/pages/product.html"),
      },
    },
  },
});
