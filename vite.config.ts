import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

const isDev = process.env.NODE_ENV !== 'production'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    // Only load devtools in development — adds significant overhead in prod
    ...(isDev ? [vueDevTools()] : []),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    // Target modern browsers — smaller output, no legacy polyfills
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          // Core Vue runtime in its own cached chunk
          'vendor-vue': ['vue', 'vue-router', 'pinia'],
          // HTTP client separate so it can be cached independently
          'vendor-axios': ['axios'],
        },
      },
    },
  },
})
