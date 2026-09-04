<template>
  <div class="new-chat-screen flex h-full max-h-full min-h-0 w-full flex-col overflow-hidden bg-gray-50">
    <div class="new-chat-scroll min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6 sm:py-8">
      <div class="mx-auto flex min-h-full w-full max-w-4xl items-center justify-center">
        <div class="w-full max-w-3xl text-center">
          <SafetyWarning />

          <div class="flex items-center justify-center">
            <img
              src="/assets/machinery-genius.png"
              alt="Machinery Genius"
              class="mx-auto h-24 w-24 rounded-full object-cover sm:h-40 sm:w-40"
            />
          </div>

          <h2 class="mb-2 mt-4 text-lg font-semibold text-gray-900 sm:mt-6 sm:text-xl">
            Hi, I am Machinery Genius
          </h2>
          <p class="mb-4 text-sm text-gray-600 sm:mb-5 sm:text-base">
            AI-powered support — Visual diagnostic, manuals, maintenance tracking, part sourcing, and more.
          </p>

          <RouterLink
            to="/will-it-fit"
            class="mx-auto mb-4 flex w-full max-w-xl items-center gap-4 rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-700 to-slate-900 px-4 py-4 text-left text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl sm:mb-6"
          >
            <span class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-yellow-400 text-2xl font-black text-slate-950">▣</span>
            <span class="min-w-0 flex-1">
              <strong class="block text-base font-black sm:text-lg">Will It Fit?™ — Life-Size AR</strong>
              <span class="mt-1 block text-xs leading-5 text-blue-100 sm:text-sm">
                Enter machine dimensions, then place a floor-level size representation in your shop using your phone.
              </span>
            </span>
            <span class="text-xl text-yellow-300" aria-hidden="true">→</span>
          </RouterLink>

          <div
            v-if="machineContextLabel"
            class="mx-auto mb-4 inline-flex max-w-full items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700"
          >
            <span>Asking about: {{ machineContextLabel }}</span>
            <button type="button" @click="clearMachineContext" class="text-blue-500 hover:text-blue-700" title="Clear machine context">
              ×
            </button>
          </div>

          <div v-if="authStore.isAuthenticated" class="mx-auto mb-4 w-full max-w-[300px] text-left sm:mb-6">
            <div v-if="usageMinimized" class="flex justify-center">
              <button
                @click="usageMinimized = false"
                class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/95 px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                title="Expand usage snapshot"
              >
                <span class="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-blue-600">+</span>
                <span>Usage</span>
              </button>
            </div>

            <div v-else class="space-y-2">
              <div class="flex justify-end sm:hidden">
                <button
                  @click="usageMinimized = true"
                  class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/95 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600 shadow-sm transition hover:bg-slate-50"
                  title="Minimize usage snapshot"
                >
                  <span>Hide Usage</span>
                  <span class="text-sm leading-none">-</span>
                </button>
              </div>
              <ChatUsageStats :user="authStore.user" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="new-chat-footer flex-shrink-0 border-t border-gray-200 bg-gray-50/95 px-3 py-2 shadow-[0_-10px_24px_rgba(18,20,25,0.06)] sm:px-4 sm:py-3">
      <ChatInput
        :allowFileUpload="false"
        :is-loading="isLoading"
        :show-typing-indicator="isTyping"
        :auto-focus="true"
        :hasTopBorder="false"
        :compact="true"
        placeholder="Ask me anything about machinery"
        @send-message="handleSendMessage"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onBeforeUnmount, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useSessionStore } from '@/stores/session'
import { useAuthStore } from '@/stores/auth'
import ChatInput from '@/components/ChatInput.vue'
import ChatUsageStats from '@/components/ChatUsageStats.vue'
import SafetyWarning from '@/components/SafetyWarning.vue'
import { useServices } from '@/services/container'

const { api } = useServices()
const isLoading = ref(false)
const isTyping = ref(false)
const router = useRouter()
const route = useRoute()
const sessionStore = useSessionStore()
const authStore = useAuthStore()
const isMobileViewport = () => typeof window !== 'undefined' && window.matchMedia('(max-width: 639px)').matches
const usageMinimized = ref(isMobileViewport())
let usageMediaQuery = null

const machineContextId = ref(route.query.machine_id ? String(route.query.machine_id) : '')
const machineContextLabel = ref(route.query.machine_label ? String(route.query.machine_label) : '')

const clearMachineContext = () => {
  machineContextId.value = ''
  machineContextLabel.value = ''
  router.replace({ query: {} })
}

const syncUsageDefaultForViewport = (event = null) => {
  const isMobile = event?.matches ?? isMobileViewport()
  if (isMobile) {
    usageMinimized.value = true
  }
}

const scrollToBottom = () => {
  const container = document.querySelector('.new-chat-scroll')
  if (container) {
    container.scrollTop = container.scrollHeight
  }
}

const handleSendMessage = async (message) => {
  const res = await api.createChat(message.text, machineContextId.value || null)
  const session = res.data

  sessionStore.sessions.unshift({
    uuid: session.session_id,
    title: session.title,
    created_at: new Date().toISOString(),
    isNew: true,
    _fullTitle: message.text
  })

  sessionStorage.setItem('pendingQuestion', message.text)
  router.push({
    name: 'chat-session',
    params: { session: session.session_id }
  })

  await nextTick()
  scrollToBottom()
}

onMounted(() => {
  syncUsageDefaultForViewport()
  usageMediaQuery = window.matchMedia('(max-width: 639px)')
  usageMediaQuery.addEventListener('change', syncUsageDefaultForViewport)
})

onBeforeUnmount(() => {
  if (usageMediaQuery) {
    usageMediaQuery.removeEventListener('change', syncUsageDefaultForViewport)
    usageMediaQuery = null
  }
})
</script>

<style scoped>
.new-chat-scroll {
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
  touch-action: pan-y;
}

.new-chat-footer {
  padding-bottom: max(0.5rem, env(safe-area-inset-bottom));
}
</style>
