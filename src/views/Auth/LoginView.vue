<template>
  <div class="flex-1 overflow-y-auto bg-gradient-to-br from-slate-50 via-white to-blue-50">
    <div class="max-w-5xl mx-auto px-6 py-10 lg:py-16">
      <div class="grid lg:grid-cols-2 gap-8 items-stretch">
        <div class="rounded-3xl bg-slate-900 text-white shadow-2xl p-10 relative overflow-hidden">
          <div class="absolute inset-0 opacity-20 bg-gradient-to-br from-blue-400 to-indigo-600"></div>
          <div class="relative space-y-6">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 ring-1 ring-white/20 text-xs uppercase tracking-[0.2em]">
              Precision matters
            </div>
            <h2 class="text-3xl font-semibold leading-tight">Stay in sync with your machines, teams, and parts.</h2>
            <p class="text-slate-200 text-base leading-relaxed">
              Access chat history, manage your requests, and keep your maintenance records in one place. Your secure account keeps everything organized across devices.
            </p>
            <ul class="space-y-3 text-slate-100">
              <li class="flex items-start gap-3">
                <span class="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-xs font-semibold">1</span>
                <div>
                  <p class="font-semibold">Fast sign-in</p>
                  <p class="text-slate-200 text-sm">Log in to pick up conversations right where you left off.</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <span class="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-xs font-semibold">2</span>
                <div>
                  <p class="font-semibold">Account tools</p>
                  <p class="text-slate-200 text-sm">Update your preferences, password, and profile effortlessly.</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <span class="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-xs font-semibold">3</span>
                <div>
                  <p class="font-semibold">Secure by design</p>
                  <p class="text-slate-200 text-sm">We never share your credentials; everything is encrypted in transit.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="bg-white/80 backdrop-blur border border-gray-200 rounded-2xl shadow-sm p-8 lg:p-10 relative">
          <button
            class="absolute top-4 right-4 h-9 w-9 inline-flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            @click="router.back()">
            X
          </button>
          <div class="flex items-center justify-between mb-6">
            <div>
              <p class="text-sm uppercase tracking-[0.18em] text-blue-500 font-semibold">Welcome back</p>
              <h1 class="text-2xl font-semibold text-gray-900 mt-1">Log in to Machinery Genius</h1>
            </div>
            <span class="inline-flex items-center gap-2 text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              Secure access
            </span>
          </div>

          <form class="space-y-4" @submit.prevent="handleSubmit">
            <div class="space-y-1">
              <label class="text-sm font-medium text-gray-700">Email</label>
              <input v-model="form.email" type="email" required placeholder="you@company.com"
                class="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-xs" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium text-gray-700">Password</label>
              <input v-model="form.password" type="password" required placeholder="Enter your password"
                class="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-xs" />
            </div>

            <div class="flex items-center justify-between pt-1">
              <RouterLink to="/forgot-password" class="text-sm font-medium text-blue-600 hover:text-blue-700">
                Forgot password?
              </RouterLink>
              <RouterLink to="/register" class="text-sm text-gray-600 hover:text-gray-800">
                New here? Create account
              </RouterLink>
            </div>

            <button type="submit" :disabled="authStore.loading" class="w-full inline-flex justify-center items-center gap-2 rounded-lg bg-blue-600 text-white font-semibold py-3 shadow-md hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed">
              <span v-if="authStore.loading">Signing in...</span>
              <span v-else>Login</span>
            </button>

            <p v-if="localError" class="text-sm text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">
              {{ localError }}
            </p>
            <p v-if="successMessage" class="text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-md px-3 py-2">
              {{ successMessage }}
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

const form = reactive({
  email: '',
  password: ''
})

const localError = ref('')
const successMessage = ref('')

const handleSubmit = async () => {
  localError.value = ''
  successMessage.value = ''

  if (!form.email || !form.password) {
    localError.value = 'Please fill in your email and password.'
    return
  }

  try {
    await authStore.login({ ...form })
    successMessage.value = 'Login successful. Redirecting...'
    const redirect = (route.query?.redirect as string) || { name: 'account' }
    setTimeout(() => router.push(redirect), 400)
  } catch (error) {
    localError.value = authStore.error || 'Unable to sign in right now.'
  }
}
</script>
