import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@typography': fileURLToPath(new URL('./src/components/typography', import.meta.url)),
      '@charts': fileURLToPath(new URL('./src/components/charts', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      input: [
        'index.html',
        'study.html',
      ].map(f => resolve(__dirname, f))
    },
  }
})
