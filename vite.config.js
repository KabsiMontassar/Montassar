import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/portfolio/',
  build: {
    chunkSizeWarningLimit: 1600,
    assetsDir: 'assets',
    sourcemap: false
  }
})
