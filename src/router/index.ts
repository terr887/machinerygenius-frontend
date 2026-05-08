import { createRouter, createWebHistory } from 'vue-router'

// Views
import FeaturesLandingView from '@/views/FeaturesLandingView.vue'
import ChatSession from '@/views/ChatSession.vue'
import HomeView from '@/views/HomeView.vue'
import PrivacyPolicyView from '@/views/PrivacyPolicyView.vue'
import AboutView from '@/views/AboutView.vue'
import FeaturesView from '@/views/FeaturesView.vue'
import FeatureDetailView from '@/views/FeatureDetailView.vue'
import LathesView from '@/views/LathesView.vue'
import MachineCategoriesView from '@/views/MachineCategoriesView.vue'
import MachineCategoryDetailView from '@/views/MachineCategoryDetailView.vue'
import ContactView from '@/views/ContactView.vue'
import ThankyouView from '@/views/ThankyouView.vue'
import FeedbackView from '@/views/FeedbackView.vue'
import Acra from '@/views/OemSupplier/Acra.vue'
import Paramigiani from '@/views/OemSupplier/Paramigiani.vue'
import SingUpForm from '@/views/OemSupplier/SingUpForm.vue'
import LoginView from '@/views/Auth/LoginView.vue'
import RegisterView from '@/views/Auth/RegisterView.vue'
import ForgotPasswordView from '@/views/Auth/ForgotPasswordView.vue'
import ResetPasswordView from '@/views/Auth/ResetPasswordView.vue'
import AccountView from '@/views/Auth/AccountView.vue'
import ChangePasswordView from '@/views/Auth/ChangePasswordView.vue'
import EmailVerificationView from '@/views/Auth/EmailVerificationView.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: FeaturesLandingView,
      meta: { hideLeftSidebar: true },
    },
    {
      path: '/app',
      name: 'app',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/c/:session',
      name: 'chat-session',
      component: ChatSession,
      meta: { requiresAuth: true },
    },
    {
      path: '/features',
      name: 'feature',
      component: FeaturesView,
    },
    {
      path: '/features/:slug',
      name: 'feature-detail',
      component: FeatureDetailView,
    },
    {
      path: '/lathes',
      name: 'lathes',
      component: LathesView,
    },
    {
      path: '/machine-categories',
      name: 'machine-categories',
      component: MachineCategoriesView,
    },
    {
      path: '/machine-categories/:slug',
      name: 'machine-category-detail',
      component: MachineCategoryDetailView,
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
      path: '/thank-you',
      name: 'thank-you',
      component: ThankyouView,
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
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { guestOnly: true, hideSidebar: true, popup: true }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { guestOnly: true, hideSidebar: true, popup: true }
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgotPasswordView,
      meta: { guestOnly: true, popup: true }
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: ResetPasswordView,
      meta: { guestOnly: true, popup: true }
    },
    {
      path: '/activate-account',
      name: 'activate-account',
      component: EmailVerificationView,
      meta: { guestOnly: true, popup: true }
    },
    {
      path: '/email/verify/:userId?/:hash?',
      name: 'email-verify-link',
      component: EmailVerificationView,
      meta: { guestOnly: true, popup: true }
    },
    {
      path: '/account',
      name: 'account',
      component: AccountView,
      meta: { requiresAuth: true }
    },
    {
      path: '/change-password',
      name: 'change-password',
      component: ChangePasswordView,
      meta: { requiresAuth: true, popup: true }
    },
    {
      path: '/privacy-policy',
      name: 'privacy-policy',
      component: PrivacyPolicyView,
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    if (to.hash) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            el: to.hash,
            behavior: 'smooth'
          })
        }, 300)
      })
    }

    return { top: 0 }
  }
})

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore()

  if (to.meta?.requiresAuth && !authStore.isAuthenticated) {
    return next({ name: 'login', query: { redirect: to.fullPath } })
  }

  if (to.meta?.guestOnly && authStore.isAuthenticated) {
    return next({ name: 'account' })
  }

  return next()
})

export default router
