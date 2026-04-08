import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { bootstrapApp } from '@/bootstrap'
import { ServiceContainerPlugin } from '@/services/container'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(ServiceContainerPlugin)

bootstrapApp().then(() => {
  app.mount('#app')
})
