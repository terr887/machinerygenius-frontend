import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { bootstrapApp } from '@/bootstrap'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

bootstrapApp().then(() => {
  app.mount('#app')
})
