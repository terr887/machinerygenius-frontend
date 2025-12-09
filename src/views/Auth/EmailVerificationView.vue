<template>
  <div class="flex-1 overflow-y-auto bg-gradient-to-br from-slate-50 via-white to-indigo-50">
    <div class="max-w-3xl mx-auto px-6 py-10 lg:py-16">
      <div class="bg-white/90 backdrop-blur border border-gray-200 rounded-2xl shadow-sm p-8 lg:p-10 space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm uppercase tracking-[0.18em] text-indigo-500 font-semibold">Email activation</p>
            <h1 class="text-2xl font-semibold text-gray-900 mt-1">Approve your Machinery Genius account</h1>
          </div>
          <RouterLink to="/login" class="text-sm text-blue-600 hover:text-blue-700 font-semibold">
            Back to login
          </RouterLink>
        </div>

        <p class="text-gray-600 leading-relaxed">
          When you click the activation link we sent after registration, we will verify your email here automatically.
          If the automatic verification does not run, paste the token and email from your message below.
        </p>

        <div
          v-if="verificationState !== 'idle'"
          class="rounded-2xl border px-5 py-5 shadow-inner transition-all"
          :class="statusWrapperClass"
        >
          <div class="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div class="flex items-start gap-4">
              <div :class="['flex h-12 w-12 items-center justify-center rounded-full', statusIconClass]">
                <svg
                  v-if="verificationState === 'success'"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="h-6 w-6"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 0 0-1.22-.872l-3.236 4.526-1.742-1.74a.75.75 0 1 0-1.06 1.062l2.25 2.25a.75.75 0 0 0 1.147-.089l3.86-5.137Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <svg
                  v-else-if="verificationState === 'error'"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="h-6 w-6"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 1.5a10.5 10.5 0 1 0 0 21 10.5 10.5 0 0 0 0-21ZM9.53 8.47a.75.75 0 0 0-1.06 1.06L10.94 12l-2.47 2.47a.75.75 0 1 0 1.06 1.06L12 13.06l2.47 2.47a.75.75 0 0 0 1.06-1.06L13.06 12l2.47-2.47a.75.75 0 0 0-1.06-1.06L12 10.94 9.53 8.47Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  class="h-6 w-6 animate-spin text-current"
                >
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4Z" />
                </svg>
              </div>
              <div class="space-y-1">
                <p class="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">Activation status</p>
                <h2 class="text-xl font-semibold text-gray-900">{{ statusHeading }}</h2>
                <p class="text-gray-700 leading-relaxed" v-if="statusText">
                  {{ statusText }}
                </p>
                <p v-if="activatedEmail && verificationState === 'success'" class="text-sm text-gray-600">
                  Verified email:
                  <span class="font-semibold text-gray-900">{{ activatedEmail }}</span>
                </p>
              </div>
            </div>
            <div class="flex flex-wrap gap-3" v-if="verificationState === 'success'">
              <RouterLink
                to="/login"
                class="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
              >
                Go to login
              </RouterLink>
              <RouterLink
                to="/"
                class="inline-flex items-center justify-center rounded-lg border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-white"
              >
                Back to home
              </RouterLink>
            </div>
            <div v-else-if="verificationState === 'error'" class="text-sm leading-relaxed text-gray-600">
              Paste the token and email from your activation message below to try again or request a new link.
            </div>
            <div v-else class="text-sm leading-relaxed text-gray-600">
              Hang tight while we confirm your activation link. This usually finishes in a moment.
            </div>
          </div>
        </div>

        <form class="space-y-4" @submit.prevent="handleManualSubmit">
          <div class="space-y-1">
            <label class="text-sm font-medium text-gray-700">Activation token</label>
            <input v-model="form.token" type="text" placeholder="Paste token from email"
              class="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white shadow-xs" />
          </div>
          <div class="space-y-1">
            <label class="text-sm font-medium text-gray-700">Email</label>
            <input v-model="form.email" type="email" placeholder="you@company.com"
              class="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white shadow-xs" />
          </div>
          <button type="submit" :disabled="isVerifying" class="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 text-white font-semibold px-5 py-3 shadow-md hover:bg-indigo-700 transition disabled:opacity-60 disabled:cursor-not-allowed">
            <span v-if="isVerifying">Verifying...</span>
            <span v-else>Verify email</span>
          </button>
        </form>

        <div class="pt-2 text-sm text-gray-600">
          <p class="mb-2">Already verified?</p>
          <RouterLink to="/login" class="font-semibold text-indigo-600 hover:text-indigo-800">Sign in now</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

type VerificationState = 'idle' | 'pending' | 'success' | 'error'

const authStore = useAuthStore()
const route = useRoute()

const firstQueryValue = (value: unknown): string => {
  if (Array.isArray(value)) {
    return value.find((entry) => typeof entry === 'string' && entry.trim()) || ''
  }

  return typeof value === 'string' ? value : ''
}

const safeDecode = (value: string) => {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

const tryParseJson = (value: string) => {
  try {
    return JSON.parse(value)
  } catch {
    return null
  }
}

const parseStatusFlag = (value: unknown): boolean | undefined => {
  if (Array.isArray(value)) {
    return parseStatusFlag(value[0])
  }

  if (typeof value === 'boolean') {
    return value
  }

  if (typeof value === 'number') {
    return value !== 0
  }

  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase()
    if (['true', '1', 'success', 'ok', 'yes', 'activated'].includes(normalized)) {
      return true
    }
    if (['false', '0', 'error', 'fail', 'failed', 'no'].includes(normalized)) {
      return false
    }
  }

  return undefined
}

const buildQueryString = (query: Record<string, unknown>) => {
  const params = new URLSearchParams()
  Object.entries(query).forEach(([key, rawValue]) => {
    if (rawValue === undefined || rawValue === null) return
    if (Array.isArray(rawValue)) {
      rawValue.forEach((entry) => {
        if (entry === undefined || entry === null) return
        if (typeof entry === 'string' && entry.trim()) {
          params.append(key, entry)
        } else if (typeof entry === 'number' || typeof entry === 'boolean') {
          params.append(key, String(entry))
        }
      })
    } else if (typeof rawValue === 'string' && rawValue.trim()) {
      params.append(key, rawValue)
    } else if (typeof rawValue === 'number' || typeof rawValue === 'boolean') {
      params.append(key, String(rawValue))
    }
  })
  return params.toString()
}

const form = reactive({
  token: firstQueryValue(route.query.token),
  email: firstQueryValue(route.query.email)
})

const statusMessage = ref('')
const errorMessage = ref('')
const isVerifying = ref(false)
const activatedEmail = ref(form.email || '')
const hasPrefilledResponse = ref(false)

const hasAutoParams = computed(() => Boolean(form.token && form.email))
const signedLinkContext = computed(() => {
  const paramsRecord = route.params as Record<string, unknown>
  return {
    userId: firstQueryValue(paramsRecord.userId),
    hash: firstQueryValue(paramsRecord.hash),
    queryString: buildQueryString(route.query as Record<string, unknown>)
  }
})
const shouldUseSignedLinkFlow = computed(() => {
  if (route.name === 'email-verify-link') return true
  const signedQueryKeys = ['signature', 'expires', 'hash', 'id', 'verify_url', 'verification_url']
  if (signedQueryKeys.some((key) => Boolean(route.query[key]))) {
    return true
  }
  return Boolean(signedLinkContext.value.userId && signedLinkContext.value.hash)
})

const verificationState = computed<VerificationState>(() => {
  if (isVerifying.value) return 'pending'
  if (statusMessage.value) return 'success'
  if (errorMessage.value) return 'error'
  return 'idle'
})

const statusHeading = computed(() => {
  switch (verificationState.value) {
    case 'success':
      return 'Your account is active'
    case 'error':
      return 'Verification failed'
    case 'pending':
      return 'Verifying your activation link'
    default:
      return ''
  }
})

const statusText = computed(() => {
  switch (verificationState.value) {
    case 'success':
      return statusMessage.value || 'Your account has been activated. You may now log in.'
    case 'error':
      return errorMessage.value || 'We were unable to verify your activation link. It may be invalid or expired.'
    case 'pending':
      return 'We are confirming the activation link you opened. You will see the result here shortly.'
    default:
      return ''
  }
})

const statusWrapperClass = computed(() => {
  switch (verificationState.value) {
    case 'success':
      return 'border-emerald-200/70 bg-emerald-50/80'
    case 'error':
      return 'border-red-200/70 bg-red-50/80'
    case 'pending':
      return 'border-blue-200/70 bg-blue-50/80'
    default:
      return ''
  }
})

const statusIconClass = computed(() => {
  switch (verificationState.value) {
    case 'success':
      return 'bg-emerald-100 text-emerald-600'
    case 'error':
      return 'bg-red-100 text-red-600'
    case 'pending':
      return 'bg-blue-100 text-blue-600'
    default:
      return 'bg-slate-100 text-slate-600'
  }
})

const applyResponseFromQuery = () => {
  const responseParam = firstQueryValue(route.query.response)
  if (responseParam) {
    const parsed = tryParseJson(responseParam) || tryParseJson(safeDecode(responseParam))
    if (parsed && typeof parsed.message === 'string') {
      const isSuccess = parseStatusFlag(parsed.status) !== false
      if (isSuccess) {
        statusMessage.value = parsed.message
        activatedEmail.value =
          (typeof parsed.email === 'string' && parsed.email) || activatedEmail.value || form.email || ''
      } else {
        errorMessage.value = parsed.message
      }
      hasPrefilledResponse.value = true
      return
    }
  }

  const messageParam = firstQueryValue(route.query.message)
  if (messageParam) {
    const normalizedMessage = safeDecode(messageParam)
    const statusParam = parseStatusFlag(route.query.status)
    if (statusParam === false) {
      errorMessage.value = normalizedMessage
    } else {
      statusMessage.value = normalizedMessage
      if (!activatedEmail.value && form.email) {
        activatedEmail.value = form.email
      }
    }
    hasPrefilledResponse.value = true
  }
}

const runVerification = async () => {
  if (!form.token || !form.email) {
    errorMessage.value = 'We need both the activation token and your email address.'
    statusMessage.value = ''
    activatedEmail.value = ''
    return
  }

  statusMessage.value = ''
  errorMessage.value = ''
  activatedEmail.value = ''
  isVerifying.value = true
  try {
    const response = await authStore.verifyEmail({
      token: form.token.trim(),
      email: form.email.trim()
    })
    statusMessage.value = response?.message || 'Email verified! You can now log in.'
    activatedEmail.value = form.email
  } catch (error) {
    errorMessage.value = authStore.error || 'Unable to verify email. The link may be invalid or expired.'
  } finally {
    isVerifying.value = false
  }
}

const runSignedLinkVerification = async () => {
  const { userId, hash, queryString } = signedLinkContext.value
  if (!userId && !hash && !queryString) {
    return
  }

  statusMessage.value = ''
  errorMessage.value = ''
  activatedEmail.value = ''
  isVerifying.value = true
  try {
    const response = await authStore.verifyEmailLink({
      userId: userId || undefined,
      hash: hash || undefined,
      queryString: queryString || undefined
    })
    statusMessage.value = response?.message || 'Your account has been activated. You may now log in.'
    const responseEmail =
      (typeof response?.email === 'string' && response.email) ||
      (typeof response?.data?.email === 'string' && response.data.email)
    activatedEmail.value = responseEmail || form.email || activatedEmail.value
  } catch (error) {
    errorMessage.value = authStore.error || 'Unable to verify email. The link may be invalid or expired.'
  } finally {
    isVerifying.value = false
  }
}

const handleManualSubmit = async () => {
  await runVerification()
}

onMounted(async () => {
  applyResponseFromQuery()
  if (hasPrefilledResponse.value) {
    return
  }

  if (shouldUseSignedLinkFlow.value) {
    await runSignedLinkVerification()
    return
  }

  if (hasAutoParams.value) {
    await runVerification()
  }
})
</script>
