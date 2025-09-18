import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"
import path from "path"

export default defineConfig({
   plugins: [react(), tailwindcss()],
  base: '/portfolio/',
  build: {
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom', '@chakra-ui/react', 'framer-motion'],
          i18n: ['i18next', 'react-i18next'],
        }
      }
    },
    assetsDir: 'assets',
    sourcemap: false
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  }
})
