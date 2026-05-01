<template>
  <div class="flex-1 overflow-y-auto bg-gradient-to-br from-slate-50 via-white to-emerald-50">
    <div class="max-w-4xl mx-auto px-6 py-10 lg:py-16">
      <div class="bg-white/90 backdrop-blur border border-gray-200 rounded-2xl shadow-sm p-8 lg:p-10">
        <div class="flex items-center justify-between mb-6">
          <div>
            <p class="text-sm uppercase tracking-[0.18em] text-emerald-500 font-semibold">Reset access</p>
            <h1 class="text-2xl font-semibold text-gray-900 mt-1">Set a new password</h1>
          </div>
          <RouterLink to="/login" class="text-sm text-blue-600 hover:text-blue-700 font-semibold">
            Back to login
          </RouterLink>
        </div>

        <p class="text-gray-600 mb-6">
          Enter a new password for <span class="font-semibold text-gray-800">{{ email || 'your account' }}</span>.
        </p>

        <form class="space-y-4 max-w-xl" @submit.prevent="handleSubmit">
          <div class="space-y-1">
            <label class="text-sm font-medium text-gray-700">New password</label>
            <input v-model="password" type="password" required placeholder="••••••••"
              class="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white shadow-xs" />
          </div>

          <div class="space-y-1">
            <label class="text-sm font-medium text-gray-700">Confirm password</label>
            <input v-model="passwordConfirmation" type="password" required placeholder="••••••••"
              class="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white shadow-xs" />
          </div>

          <button type="submit" :disabled="authStore.loading || !canSubmit"
            class="inline-flex justify-center items-center gap-2 rounded-lg bg-emerald-600 text-white font-semibold px-5 py-3 shadow-md hover:bg-emerald-700 transition disabled:opacity-60 disabled:cursor-not-allowed">
            <span v-if="authStore.loading">Updating...</span>
            <span v-else>Reset password</span>
          </button>
        </form>
        <RouterLink v-if="hasResetSuccess" to="/login"
          class="mt-4 inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700">
          Back to login
        </RouterLink>
        <p v-if="missingLink" class="mt-4 text-sm text-amber-700 bg-amber-50 border border-amber-100 rounded-md px-3 py-2 w-fit">
          This reset link is missing required information. Please request a new link.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useToastStore } from '@/stores/toast'

const route = useRoute()
const authStore = useAuthStore()
const toastStore = useToastStore()

const email = computed(() => (route.query.email as string | undefined) || '')
const token = computed(() => (route.query.token as string | undefined) || '')

const password = ref('')
const passwordConfirmation = ref('')
const localError = ref('')
const successMessage = ref('')
const hasResetSuccess = computed(() => Boolean(successMessage.value))

const missingLink = computed(() => !email.value || !token.value)
const canSubmit = computed(() => !missingLink.value)

onMounted(() => {
  const expectedHost = 'chat.machinerygenius.com'
  if (typeof window !== 'undefined' && window.location.hostname !== expectedHost) {
    const target = `https://${expectedHost}${window.location.pathname}${window.location.search}`
    window.location.replace(target)
  }
})

const handleSubmit = async () => {
  localError.value = ''
  successMessage.value = ''

  if (missingLink.value) {
    const message = 'This reset link is invalid. Please request a new link.'
    localError.value = message
    toastStore.error(message)
    return
  }

  if (!password.value || password.value.length < 8) {
    const message = 'Please enter a password with at least 8 characters.'
    localError.value = message
    toastStore.error(message)
    return
  }

  if (password.value !== passwordConfirmation.value) {
    const message = 'Passwords do not match.'
    localError.value = message
    toastStore.error(message)
    return
  }

  try {
    const response = await authStore.resetPassword({
      token: token.value,
      email: email.value,
      password: password.value,
      password_confirmation: passwordConfirmation.value
    })
    const message =
      response?.message || 'Your password has been updated. You can now log in.'
    successMessage.value = message
    toastStore.success(message)
    password.value = ''
    passwordConfirmation.value = ''
  } catch (error) {
    const message = authStore.error || 'Unable to reset password right now.'
    localError.value = message
    toastStore.error(message)
  }
}
</script>
