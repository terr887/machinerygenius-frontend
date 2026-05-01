<template>
  <div class="flex-1 overflow-y-auto bg-gradient-to-br from-slate-50 via-white to-emerald-50">
    <div class="max-w-4xl mx-auto px-6 py-10 lg:py-16">
      <div class="bg-white/90 backdrop-blur border border-gray-200 rounded-2xl shadow-sm p-8 lg:p-10">
        <div class="flex items-center justify-between mb-6">
          <div>
            <p class="text-sm uppercase tracking-[0.18em] text-emerald-500 font-semibold">Reset access</p>
            <h1 class="text-2xl font-semibold text-gray-900 mt-1">Forgot your password?</h1>
          </div>
          <RouterLink to="/login" class="text-sm text-blue-600 hover:text-blue-700 font-semibold">
            Back to login
          </RouterLink>
        </div>

        <p class="text-gray-600 mb-6">Enter the email you use for Machinery Genius and we will send a reset link.</p>

        <form class="space-y-4 max-w-xl" @submit.prevent="handleSubmit">
          <div class="space-y-1">
            <label class="text-sm font-medium text-gray-700">Email</label>
            <input v-model="email" type="email" required placeholder="you@company.com"
              class="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white shadow-xs" />
          </div>

          <button type="submit" :disabled="authStore.loading" class="inline-flex justify-center items-center gap-2 rounded-lg bg-emerald-600 text-white font-semibold px-5 py-3 shadow-md hover:bg-emerald-700 transition disabled:opacity-60 disabled:cursor-not-allowed">
            <span v-if="authStore.loading">Sending link...</span>
            <span v-else>Send reset link</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useToastStore } from '@/stores/toast'

const authStore = useAuthStore()
const toastStore = useToastStore()
const email = ref('')
const localError = ref('')
const successMessage = ref('')

const handleSubmit = async () => {
  localError.value = ''
  successMessage.value = ''

  if (!email.value) {
    const message = 'Please enter the email associated with your account.'
    localError.value = message
    toastStore.error(message)
    return
  }

  try {
    const response = await authStore.forgotPassword(email.value)
    const message =
      response?.message || 'If this email is registered, we have sent a reset link.'
    successMessage.value = message
    toastStore.success(message)
  } catch (error) {
    const message = authStore.error || 'Unable to send reset link right now.'
    localError.value = message
    toastStore.error(message)
  }
}
</script>
