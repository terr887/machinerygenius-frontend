import { createRouter, createWebHistory } from 'vue-router'

// Views
import HomeView from '@/views/HomeView.vue'
import ChatSession from '@/views/ChatSession.vue'
import PrivacyPolicyView from '@/views/PrivacyPolicyView.vue'
import AboutView from '@/views/AboutView.vue'
import FeaturesView from '@/views/FeaturesView.vue'
import LathesView from '@/views/LathesView.vue'
import ContactView from '@/views/ContactView.vue'
import FeedbackView from '@/views/FeedbackView.vue'
import Acra from '@/views/OemSupplier/Acra.vue'
import Paramigiani from '@/views/OemSupplier/Paramigiani.vue'
import SingUpForm from '@/views/OemSupplier/SingUpForm.vue'

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
      path: '/features',
      name: 'feature',
      component: FeaturesView,
    },
    {
      path: '/lathes',
      name: 'lathes',
      component: LathesView,
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
      path: '/oem-partners/acra',
      name: 'oem-partners-acra',
      component: Acra,
    },
    {
      path: '/oem-partners/paramigiani',
      name: 'oem-partners-paramigiani',
      component: Paramigiani,
    },
    {
      path: '/oem-partners',
      name: 'oem-partners',
      component: Acra,
    },
    {
      path: '/oem-supplier-form',
      name: 'oem-supplier-form',
      component: SingUpForm,
    },
    {
      path: '/privacy-policy',
      name: 'privacy-policy',
      component: PrivacyPolicyView,
    }
  ],
})

export default router
