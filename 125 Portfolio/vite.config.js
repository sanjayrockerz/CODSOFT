import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  publicDir: 'assets',   // serves assets/ at root → /favicon.svg, /Moti-Sanjay-Resume.pdf
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['gsap', 'framer-motion'],
        },
      },
    },
  },
  server: {
    port: 5173,
    open: true,
  },
})
