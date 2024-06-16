import './assets/css/app.css'
import { removeOverlay } from './startup'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(autoAnimatePlugin)
app.use(pinia)
app.use(router)

app.mount('#app')

removeOverlay()
