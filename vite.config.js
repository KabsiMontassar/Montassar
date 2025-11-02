import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  // GitHub Pages deployment base path
  base: '/Montassar/',

  build: {
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom', '@chakra-ui/react', 'framer-motion'],
          i18n: ['i18next', 'react-i18next'],
          gsap: ['gsap', '@gsap/react'],
        }
      }
    },
    assetsDir: 'assets',
    sourcemap: false,
    outDir: 'dist',
  }
})
