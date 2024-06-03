import { fileURLToPath, URL } from 'node:url'
// import { VitePWA } from 'vite-plugin-pwa'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueDevTools()
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
    // })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
