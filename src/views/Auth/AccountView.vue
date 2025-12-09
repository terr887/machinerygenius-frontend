<template>
  <div class="flex-1 overflow-y-auto bg-gradient-to-br from-slate-50 via-white to-blue-50">
    <div class="max-w-5xl mx-auto px-6 py-10 lg:py-16">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <p class="text-sm uppercase tracking-[0.18em] text-blue-500 font-semibold">My account</p>
          <h1 class="text-3xl font-semibold text-gray-900">
            Welcome back<span v-if="userDisplay">, {{ userDisplay }}</span>
          </h1>
          <p class="text-gray-600 mt-2">Manage your profile, security, and account preferences.</p>
        </div>
        <div class="flex gap-3">
          <RouterLink to="/change-password" class="inline-flex items-center gap-2 rounded-lg border border-blue-200 px-4 py-2.5 text-blue-700 font-semibold hover:bg-blue-50 transition">
            Change password
          </RouterLink>
          <button @click="handleLogout" :disabled="authStore.loading"
            class="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-gray-800 font-semibold hover:bg-gray-100 transition disabled:opacity-60 disabled:cursor-not-allowed">
            Logout
          </button>
        </div>
      </div>

      <div class="grid lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Profile</h2>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500">Name</p>
                <p class="text-base font-medium text-gray-900">
                  {{ authStore.userFullName || authStore.user?.email || 'Not provided' }}
                </p>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500">Email</p>
                <p class="text-base font-medium text-gray-900">{{ authStore.user?.email }}</p>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500">Company</p>
                <p class="text-base font-medium text-gray-900">{{ authStore.user?.company_name || authStore.user?.company || 'Not provided' }}</p>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500">Role</p>
                <p class="text-base font-medium text-gray-900">{{ authStore.user?.role || 'Member' }}</p>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500">Status</p>
                <p class="text-base font-medium text-gray-900">
                  <span :class="authStore.user?.enabled ? 'text-emerald-600' : 'text-red-600'">
                    {{ authStore.user?.enabled ? 'Enabled' : 'Pending' }}
                  </span>
                </p>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500">Joined</p>
                <p class="text-base font-medium text-gray-900">{{ joinedDate || '–' }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-slate-900 text-white rounded-2xl shadow-lg p-6 relative overflow-hidden">
          <div class="absolute inset-0 opacity-30 bg-gradient-to-br from-blue-400 via-amber-400 to-indigo-700"></div>
          <div class="relative space-y-3">
            <p class="text-sm uppercase tracking-[0.18em] text-white/80 font-semibold">Security tips</p>
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
        </div>
      </div>

      <p v-if="statusMessage" class="mt-6 text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-md px-3 py-2 w-fit">
        {{ statusMessage }}
      </p>
      <p v-if="errorMessage" class="mt-6 text-sm text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2 w-fit">
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

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
    router.push({ name: 'login' })
  } catch (error) {
    errorMessage.value = authStore.error || 'We could not log you out. Please try again.'
  }
}
</script>
