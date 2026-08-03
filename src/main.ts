import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { bootstrapApp } from '@/bootstrap'
import { ServiceContainerPlugin } from '@/services/container'
import { getSections } from '@/utils/sectionsStore'

// Kick off the sections fetch immediately — before Vue even mounts.
// By the time any component's onMounted runs, the request is already
// in-flight (or served from sessionStorage cache on refresh).
getSections().catch(() => { /* components handle their own errors */ })

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(ServiceContainerPlugin)

// Mount immediately — bootstrap hydrates stores in the background.
app.mount('#app')
bootstrapApp().catch(console.error)
