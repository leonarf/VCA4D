/* global __dirname */
import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), svgLoader()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@typography': fileURLToPath(new URL('./src/components/typography', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@charts': fileURLToPath(new URL('./src/components/charts', import.meta.url)),
      '@images': fileURLToPath(new URL('./src/images', import.meta.url)),
      '@data': fileURLToPath(new URL('./data', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/utils', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      input: [
        'index.html',
        'study.html',
        'comparison.html',
        'admin-import.html',
      ].map(f => resolve(__dirname, f))
    },
  }
})
