import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/FeaturesLandingView.vue'),
      meta: { hideLeftSidebar: true },
    },
    {
      path: '/app',
      name: 'app',
      component: () => import('@/views/HomeView.vue'),
      meta: { requiresAuth: true, chatLayout: true },
    },
    {
      path: '/c/:session',
      name: 'chat-session',
      component: () => import('@/views/ChatSession.vue'),
      meta: { requiresAuth: true, chatLayout: true },
    },
    {
      path: '/features',
      name: 'feature',
      component: () => import('@/views/FeaturesView.vue'),
    },
    {
      path: '/features/:slug',
      name: 'feature-detail',
      component: () => import('@/views/FeatureDetailView.vue'),
    },
    {
      path: '/features/:slug',
      name: 'feature-detail',
      component: FeatureDetailView,
    },
    {
      path: '/lathes',
      name: 'lathes',
      component: () => import('@/views/LathesView.vue'),
    },
    {
      path: '/machine-categories',
      name: 'machine-categories',
      component: () => import('@/views/MachineCategoriesView.vue'),
    },
    {
      path: '/machine-categories/:slug',
      name: 'machine-category-detail',
      component: () => import('@/views/MachineCategoryDetailView.vue'),
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
      component: () => import('@/views/AboutView.vue'),
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/views/ContactView.vue'),
    },
    {
      path: '/thank-you',
      name: 'thank-you',
      component: () => import('@/views/ThankyouView.vue'),
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: () => import('@/views/FeedbackView.vue'),
    },
    {
      path: '/oem-partners/acra',
      name: 'oem-partners-acra',
      component: () => import('@/views/OemSupplier/Acra.vue'),
    },
    {
      path: '/oem-partners/paramigiani',
      name: 'oem-partners-paramigiani',
      component: () => import('@/views/OemSupplier/Paramigiani.vue'),
    },
    {
      path: '/oem-partners',
      name: 'oem-partners',
      component: () => import('@/views/OemSupplier/Acra.vue'),
    },
    {
      path: '/manufacturers',
      name: 'manufacturers',
      component: () => import('@/views/ManufacturersView.vue'),
    },
    {
      path: '/manufacturers/:slug',
      name: 'manufacturer-detail',
      component: () => import('@/views/ManufacturerDetailView.vue'),
    },
    {
      path: '/oem-supplier-form',
      name: 'oem-supplier-form',
      component: () => import('@/views/OemSupplier/SingUpForm.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Auth/LoginView.vue'),
      meta: { guestOnly: true, hideSidebar: true, popup: true }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Auth/RegisterView.vue'),
      meta: { guestOnly: true, hideSidebar: true, popup: true }
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('@/views/Auth/ForgotPasswordView.vue'),
      meta: { guestOnly: true, popup: true }
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: () => import('@/views/Auth/ResetPasswordView.vue'),
      meta: { guestOnly: true, popup: true }
    },
    {
      path: '/activate-account',
      name: 'activate-account',
      component: () => import('@/views/Auth/EmailVerificationView.vue'),
      meta: { guestOnly: true, popup: true }
    },
    {
      path: '/email/verify/:userId?/:hash?',
      name: 'email-verify-link',
      component: () => import('@/views/Auth/EmailVerificationView.vue'),
      meta: { guestOnly: true, popup: true }
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('@/views/Auth/AccountView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/garage/machines/:id',
      name: 'machine-detail',
      component: () => import('@/views/MachineDetailView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/change-password',
      name: 'change-password',
      component: () => import('@/views/Auth/ChangePasswordView.vue'),
      meta: { requiresAuth: true, popup: true }
    },
    {
      path: '/privacy-policy',
      name: 'privacy-policy',
      component: () => import('@/views/PrivacyPolicyView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'cms-page',
      component: () => import('@/views/CmsPageView.vue'),
    },
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (to.hash) {
      return new Promise((resolve) => {
        setTimeout(() => resolve({ el: to.hash, behavior: 'smooth' }), 300)
      })
    }

    const container = document.getElementById('main-content')
    if (container) {
      const top = savedPosition ? savedPosition.top : 0
      container.scrollTo({ top, behavior: savedPosition ? 'auto' : 'smooth' })
      return false
    }

    return savedPosition ?? { top: 0, behavior: 'smooth' }
  }
})

router.beforeEach((to, _, next) => {
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
