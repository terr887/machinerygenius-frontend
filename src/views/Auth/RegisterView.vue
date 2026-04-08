<template>
  <div class="flex-1 overflow-y-auto bg-gradient-to-br from-white via-slate-50 to-indigo-50">
    <div class="max-w-5xl mx-auto px-6 py-10 lg:py-16">
      <div class="grid lg:grid-cols-2 gap-8 items-stretch">
        <div class="bg-slate-900 text-white rounded-3xl shadow-2xl p-10 relative overflow-hidden">
          <div class="absolute inset-0 opacity-30 bg-gradient-to-br from-amber-400/40 via-blue-500/40 to-indigo-700/60"></div>
          <div class="relative space-y-6">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 ring-1 ring-white/20 text-xs uppercase tracking-[0.2em]">
              Create account
            </div>
            <h2 class="text-3xl font-semibold leading-tight">Unlock personalized tooling, parts, and support.</h2>
            <p class="text-slate-200 text-base leading-relaxed">
              Register to save chat sessions, manage machines, and connect with our support team faster.
            </p>
            <div class="grid grid-cols-2 gap-4">
              <div class="rounded-2xl bg-white/10 ring-1 ring-white/15 p-4">
                <p class="text-sm text-slate-200">Machine garage</p>
                <p class="text-xl font-semibold">Keep serials, manuals, and parts together.</p>
              </div>
              <div class="rounded-2xl bg-white/10 ring-1 ring-white/15 p-4">
                <p class="text-sm text-slate-200">Team ready</p>
                <p class="text-xl font-semibold">Invite your maintenance crew with secure access.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white/90 backdrop-blur border border-gray-200 rounded-2xl shadow-sm p-8 lg:p-10 relative">
          <button
            class="absolute top-4 right-4 h-9 w-9 inline-flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            @click="router.back()">
            X
          </button>
          <div class="flex items-center justify-between mb-6">
            <div>
              <p class="text-sm uppercase tracking-[0.18em] text-indigo-500 font-semibold">Start here</p>
              <h1 class="text-2xl font-semibold text-gray-900 mt-1">Register your account</h1>
            </div>
            <RouterLink to="/login" class="text-sm text-blue-600 hover:text-blue-700 font-semibold">
              Already registered?
            </RouterLink>
          </div>

          <form class="space-y-4" @submit.prevent="handleSubmit">
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-gray-900 mb-1">First name</label>
                <input v-model="form.firstName" type="text" required placeholder="Alex"
                  class="w-full px-3 py-2 text-sm border border-gray-300 hover:border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-900 mb-1">Last name</label>
                <input v-model="form.lastName" type="text" required placeholder="Stone"
                  class="w-full px-3 py-2 text-sm border border-gray-300 hover:border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-gray-900 mb-1">Company (optional)</label>
              <input v-model="form.companyName" type="text" placeholder="Acme Manufacturing"
                class="w-full px-3 py-2 text-sm border border-gray-300 hover:border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
            </div>

            <div>
              <label class="block text-xs font-bold text-gray-900 mb-1">Email</label>
              <input v-model="form.email" type="email" required placeholder="you@company.com"
                class="w-full px-3 py-2 text-sm border border-gray-300 hover:border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
            </div>

            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-gray-900 mb-1">Password</label>
                <input v-model="form.password" type="password" required placeholder="At least 8 characters"
                  class="w-full px-3 py-2 text-sm border border-gray-300 hover:border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-900 mb-1">Confirm password</label>
                <input v-model="form.confirmPassword" type="password" required placeholder="Repeat password"
                  class="w-full px-3 py-2 text-sm border border-gray-300 hover:border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
              </div>
            </div>

            <button type="submit" :disabled="authStore.loading" class="w-full px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition">
              <span v-if="authStore.loading">Creating account...</span>
              <span v-else>Register</span>
            </button>
            <div v-if="successMessage" class="space-y-2 rounded-md border border-emerald-100 bg-emerald-50 px-3 py-2">
              <p class="text-sm text-emerald-700">
                {{ successMessage }}
              </p>
              <p class="text-sm text-emerald-800">
                Please check <strong class="font-semibold">{{ form.email }}</strong> for an activation link. Click it to approve your email before logging in.
              </p>
              <RouterLink to="/login" class="inline-flex items-center gap-1 text-sm font-semibold text-indigo-700 hover:text-indigo-900">
                Go to login
                <span aria-hidden="true">→</span>
              </RouterLink>
            </div>
          </form>
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
  firstName: '',
  lastName: '',
  companyName: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const localError = ref('')
const successMessage = ref('')

const handleSubmit = async () => {
  localError.value = ''
  successMessage.value = ''

  if (!form.firstName || !form.lastName || !form.email || !form.password || !form.confirmPassword) {
    const message = 'Please complete all required fields.'
    localError.value = message
    toastStore.error(message)
    return
  }

  if (form.password !== form.confirmPassword) {
    const message = 'Passwords do not match.'
    localError.value = message
    toastStore.error(message)
    return
  }

  try {
    await authStore.register({
      first_name: form.firstName,
      last_name: form.lastName,
      company_name: form.companyName || undefined,
      email: form.email,
      password: form.password,
      password_confirmation: form.confirmPassword
    })
    const message = 'Account created! We emailed you an activation link.'
    successMessage.value = message
    toastStore.success(message)
  } catch (error) {
    const message = authStore.error || 'Registration failed. Please try again.'
    localError.value = message
    toastStore.error(message)
  }
}
</script>
