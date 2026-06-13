import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],
  base: '/fleet-asset-manager/',
  build: { outDir: 'dist' }
})
