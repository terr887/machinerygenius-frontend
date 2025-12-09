<template>
  <div class="flex-1 overflow-y-auto bg-gradient-to-br from-slate-50 via-white to-amber-50">
    <div class="max-w-4xl mx-auto px-6 py-10 lg:py-16">
      <div class="flex items-center justify-between mb-6">
        <div>
          <p class="text-sm uppercase tracking-[0.18em] text-amber-600 font-semibold">Security</p>
          <h1 class="text-2xl font-semibold text-gray-900 mt-1">Change your password</h1>
          <p class="text-gray-600 mt-2">Keep your account secure by updating your password regularly.</p>
        </div>
        <RouterLink to="/account" class="text-sm text-blue-600 hover:text-blue-700 font-semibold">
          Back to account
        </RouterLink>
      </div>

      <div class="bg-white/90 backdrop-blur border border-gray-200 rounded-2xl shadow-sm p-8 lg:p-10">
        <form class="space-y-4 max-w-2xl" @submit.prevent="handleSubmit">
          <div class="space-y-1">
            <label class="text-sm font-medium text-gray-700">Current password</label>
            <input v-model="form.currentPassword" type="password" required placeholder="Enter current password"
              class="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white shadow-xs" />
          </div>

          <div class="space-y-1">
            <label class="text-sm font-medium text-gray-700">New password</label>
            <input v-model="form.newPassword" type="password" required placeholder="New password"
              class="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white shadow-xs" />
          </div>

          <div class="space-y-1">
            <label class="text-sm font-medium text-gray-700">Confirm new password</label>
            <input v-model="form.confirmPassword" type="password" required placeholder="Repeat new password"
              class="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white shadow-xs" />
          </div>

          <button type="submit" :disabled="authStore.loading" class="inline-flex justify-center items-center gap-2 rounded-lg bg-amber-600 text-white font-semibold px-6 py-3 shadow-md hover:bg-amber-700 transition disabled:opacity-60 disabled:cursor-not-allowed">
            <span v-if="authStore.loading">Updating...</span>
            <span v-else>Change password</span>
          </button>
        </form>

        <p v-if="localError" class="mt-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2 w-fit">
          {{ localError }}
        </p>
        <p v-if="successMessage" class="mt-4 text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-md px-3 py-2 w-fit">
          {{ successMessage }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()

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
    localError.value = 'All fields are required.'
    return
  }

  if (form.newPassword !== form.confirmPassword) {
    localError.value = 'New passwords do not match.'
    return
  }

  try {
    await authStore.changePassword({
      current_password: form.currentPassword,
      password: form.newPassword,
      password_confirmation: form.confirmPassword
    })
    successMessage.value = 'Password updated successfully.'
    setTimeout(() => router.push({ name: 'account' }), 500)
  } catch (error) {
    localError.value = authStore.error || 'Unable to change password right now.'
  }
}
</script>
