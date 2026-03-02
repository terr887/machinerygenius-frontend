<template>
  <div class="w-full mx-auto px-4 py-6">
    <!-- HERO -->
    <section class="bg-gradient-to-br from-blue-50 via-white to-amber-50 border border-gray-200 rounded-2xl p-6 mb-6">
      <div class="flex items-center justify-between gap-6">
        <div class="flex-1">
          <span class="inline-flex items-center gap-2 border border-gray-200 rounded-full px-3 py-1 text-xs text-gray-600 bg-white">
            <span aria-hidden="true">👤</span><span>My Account</span>
          </span>
          <h1 class="text-3xl font-bold text-gray-900 mt-4 mb-3">
            Welcome back<span v-if="userDisplay">, {{ userDisplay }}</span>
          </h1>
          <p class="text-gray-600 max-w-3xl">
            Manage your profile, security, and account preferences.
          </p>

          <div class="flex flex-wrap gap-2 mt-5">
            <RouterLink to="/change-password" class="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">Change Password</RouterLink>
            <button @click="handleLogout" :disabled="authStore.loading"
              class="px-4 py-2 text-sm font-semibold text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition disabled:opacity-60 disabled:cursor-not-allowed">
              Logout
            </button>
          </div>
        </div>
        <img src="/assets/machinery-genius.png" alt="Machinery Genius" class="w-32 h-32 object-contain flex-shrink-0 hidden md:block" />
      </div>
    </section>

    <!-- CONTENT GRID -->
    <div class="grid lg:grid-cols-3 gap-6">
      <!-- PROFILE CARD -->
      <article class="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <h2 class="text-lg font-bold text-gray-900 mb-4">Profile Information</h2>
        <div class="space-y-4">
          <div>
            <p class="text-xs font-bold text-gray-900 mb-1">Name</p>
            <p class="text-sm text-gray-600">
              {{ authStore.userFullName || authStore.user?.email || 'Not provided' }}
            </p>
          </div>
          <div>
            <p class="text-xs font-bold text-gray-900 mb-1">Email</p>
            <p class="text-sm text-gray-600">{{ authStore.user?.email }}</p>
          </div>
          <div>
            <p class="text-xs font-bold text-gray-900 mb-1">Company</p>
            <p class="text-sm text-gray-600">{{ authStore.user?.company_name || authStore.user?.company || 'Not provided' }}</p>
          </div>
        </div>
      </article>

      <!-- SECURITY TIPS CARD -->
      <article class="bg-slate-900 text-white rounded-xl shadow-lg p-5 relative overflow-hidden">
        <div class="absolute inset-0 opacity-30 bg-gradient-to-br from-blue-400 via-amber-400 to-indigo-700"></div>
        <div class="relative space-y-3">
          <p class="text-xs uppercase tracking-[0.18em] text-white/80 font-semibold">Security tips</p>
          <ul class="space-y-2 text-slate-100 text-sm leading-relaxed">
            <li class="flex gap-2">
              <span class="inline-block h-6 w-6 rounded-full bg-white/15 text-center text-xs leading-6 font-semibold">1</span>
              Use a strong password with 12+ characters.
            </li>
            <li class="flex gap-2">
              <span class="inline-block h-6 w-6 rounded-full bg-white/15 text-center text-xs leading-6 font-semibold">2</span>
              Avoid reusing passwords between services.
            </li>
            <li class="flex gap-2">
              <span class="inline-block h-6 w-6 rounded-full bg-white/15 text-center text-xs leading-6 font-semibold">3</span>
              Update your password regularly and revoke old sessions.
            </li>
          </ul>
        </div>
      </article>
    </div>

    <!-- STATUS MESSAGES -->
    <p v-if="statusMessage" class="mt-6 text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2 w-fit">
      {{ statusMessage }}
    </p>
    <p v-if="errorMessage" class="mt-6 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 w-fit">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
  import {
    computed,
    onMounted,
    ref
  } from 'vue'
  import {
    useRouter
  } from 'vue-router'
  import {
    useAuthStore
  } from '@/stores/auth'

  const authStore = useAuthStore()
  const router = useRouter()
  const statusMessage = ref('')
  const errorMessage = ref('')
  const userDisplay = computed(() => authStore.userFullName || authStore.user?.email || '')
  const joinedDate = computed(() => {
    if (!authStore.user?.created_at) return ''
    const date = new Date(authStore.user.created_at)
    return Number.isNaN(date.getTime()) ? authStore.user.created_at : date.toLocaleDateString()
  })

  onMounted(async () => {
    if (!authStore.user && authStore.token) {
      try {
        await authStore.fetchProfile()
      } catch (error) {
        errorMessage.value = authStore.error || 'Unable to load your profile right now.'
      }
    }
  })

  const handleLogout = async () => {
    statusMessage.value = ''
    errorMessage.value = ''
    try {
      await authStore.logout()
      statusMessage.value = 'You have been logged out.'
      router.push({
        name: 'login'
      })
    } catch (error) {
      errorMessage.value = authStore.error || 'We could not log you out. Please try again.'
    }
  }
</script>