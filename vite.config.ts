import { fileURLToPath, URL } from 'node:url'
// import { VitePWA } from 'vite-plugin-pwa'
import { compression } from 'vite-plugin-compression2'
import Icons from 'unplugin-icons/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/raffles-app/',
  plugins: [
    Icons({ compiler: 'vue3' }),
    vue(),
    VueDevTools(),
    // VitePWA({
    //   registerType: 'autoUpdate',
    //   injectRegister: 'script-defer',

    //   pwaAssets: {
    //     disabled: false,
    //     config: true
    //   },

    //   workbox: {
    //     globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
    //     cleanupOutdatedCaches: true,
    //     clientsClaim: true
    //   },

    //   manifest: {
    //     name: 'MS App',
    //     short_name: 'MS App',
    //     description: 'Miguel Santos Raffles App',
    //     theme_color: '#ffffff'
    //   },

    //   devOptions: {
    //     enabled: false,
    //     navigateFallback: 'index.html',
    //     suppressWarnings: false,
    //     type: 'module'
    //   }
    // }),
    compression({ algorithm: 'deflate' }),
    compression({ algorithm: 'gzip' }),
    compression({
      algorithm: 'brotliCompress',
      deleteOriginalAssets: false
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  esbuild: { legalComments: 'none' },
  build: {
    emptyOutDir: true
  }
})
