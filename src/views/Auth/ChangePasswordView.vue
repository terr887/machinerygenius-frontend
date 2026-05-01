<template>
  <div class="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 w-full">
    <!-- HERO -->
    <section class="bg-gradient-to-br from-blue-50 via-white to-amber-50 border border-gray-200 rounded-2xl p-6 mb-6">
      <div class="flex items-center justify-between gap-6">
        <div class="flex-1">
          <span class="inline-flex items-center gap-2 border border-gray-200 rounded-full px-3 py-1 text-xs text-gray-600 bg-white">
          <span aria-hidden="true">🔐</span><span>Security</span>
        </span>
          <h1 class="text-3xl font-bold text-gray-900 mt-4 mb-3">Change Your Password</h1>
          <p class="text-gray-600 max-w-3xl">
            Keep your account secure by updating your password regularly.
          </p>

          <div class="flex flex-wrap gap-2 mt-5">
            <RouterLink to="/account" class="px-4 py-2 text-sm font-semibold text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              ← Back to Account
            </RouterLink>
          </div>
        </div>
        <img src="/assets/machinery-genius.png" alt="Machinery Genius" class="w-32 h-32 object-contain flex-shrink-0 hidden md:block" />
      </div>
    </section>

    <hr class="border-gray-200 mb-6" />

    <div class="grid lg:grid-cols-3 gap-6">
      <!-- CHANGE PASSWORD FORM -->
      <div class="lg:col-span-2">
        <form class="space-y-4" @submit.prevent="handleSubmit">
          <div>
            <label class="block text-xs font-bold text-gray-900 mb-1">Current Password *</label>
            <input v-model="form.currentPassword" type="password" required placeholder="Enter current password"
              class="w-full px-3 py-2 text-sm border border-gray-300 hover:border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
          </div>

          <div>
            <label class="block text-xs font-bold text-gray-900 mb-1">New Password *</label>
            <input v-model="form.newPassword" type="password" required placeholder="New password (12+ characters)"
              class="w-full px-3 py-2 text-sm border border-gray-300 hover:border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
          </div>

          <div>
            <label class="block text-xs font-bold text-gray-900 mb-1">Confirm New Password *</label>
            <input v-model="form.confirmPassword" type="password" required placeholder="Repeat new password"
              class="w-full px-3 py-2 text-sm border border-gray-300 hover:border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
          </div>

          <button type="submit" :disabled="authStore.loading"
            class="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition">
            <span v-if="authStore.loading">Updating...</span>
            <span v-else>Change Password</span>
          </button>
        </form>
      </div>

      <!-- SECURITY TIPS -->
      <div class="bg-slate-900 text-white rounded-xl shadow-lg p-5 relative overflow-hidden">
        <div class="absolute inset-0 opacity-30 bg-gradient-to-br from-blue-400 via-amber-400 to-indigo-700"></div>
        <div class="relative space-y-3">
          <p class="text-xs uppercase tracking-[0.18em] text-white/80 font-semibold">Password tips</p>
          <ul class="space-y-2 text-slate-100 text-sm leading-relaxed">
            <li class="flex gap-2">
              <span class="inline-block h-6 w-6 rounded-full bg-white/15 text-center text-xs leading-6 font-semibold">1</span>
              Use at least 12 characters.
            </li>
            <li class="flex gap-2">
              <span class="inline-block h-6 w-6 rounded-full bg-white/15 text-center text-xs leading-6 font-semibold">2</span>
              Mix letters, numbers, and symbols.
            </li>
            <li class="flex gap-2">
              <span class="inline-block h-6 w-6 rounded-full bg-white/15 text-center text-xs leading-6 font-semibold">3</span>
              Never reuse passwords across sites.
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useToastStore } from '@/stores/toast'

const authStore = useAuthStore()
const router = useRouter()
const toastStore = useToastStore()

const form = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const localError = ref('')
const successMessage = ref('')

const handleSubmit = async () => {
  localError.value = ''
  successMessage.value = ''

  if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
    const message = 'All fields are required.'
    localError.value = message
    toastStore.error(message)
    return
  }

  if (form.newPassword !== form.confirmPassword) {
    const message = 'New passwords do not match.'
    localError.value = message
    toastStore.error(message)
    return
  }

  try {
    await authStore.changePassword({
      current_password: form.currentPassword,
      password: form.newPassword,
      password_confirmation: form.confirmPassword
    })
    const message = 'Password updated successfully.'
    successMessage.value = message
    toastStore.success(message)
    setTimeout(() => router.push({ name: 'account' }), 500)
  } catch (error) {
    const message = authStore.error || 'Unable to change password right now.'
    localError.value = message
    toastStore.error(message)
  }
}
</script>
