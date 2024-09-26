import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/evvgas",
  plugins: [react()],
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  }
})
