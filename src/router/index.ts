import { createRouter, createWebHistory } from 'vue-router'

// Views
import HomeView from '@/views/HomeView.vue'
import ChatSession from '@/views/ChatSession.vue'
import PrivacyPolicyView from '@/views/PrivacyPolicyView.vue'
import AboutView from '@/views/AboutView.vue'
import ContactView from '@/views/ContactView.vue'
import FeedbackView from '@/views/FeedbackView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/c/:session',
      name: 'chat-session',
      component: ChatSession,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView,
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: FeedbackView,
    },
    {
      path: '/privacy-policy',
      name: 'privacy-policy',
      component: PrivacyPolicyView,
    }
  ],
})

export default router
