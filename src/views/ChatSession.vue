<template>
  <!-- make the page relative so absolute elements (scroll button) position correctly -->
  <div ref="pageRef" class="chat-session w-full mx-auto relative flex-1 flex flex-col bg-gray-50 min-h-0 h-full">
    <!-- LOADING OVERLAY (shows while chat history loads) -->
    <div v-if="isLoading" class="absolute inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
      aria-hidden="false" role="status" aria-live="polite">
      <div class="loading-backdrop" aria-hidden="true"></div>
      <div class="loading-plate" role="status" aria-label="Loading chat history">
        <svg class="spinner" viewBox="0 0 50 50" aria-hidden="true">
          <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
        </svg>
        <span class="sr-only">Loading chat history…</span>
        <span class="ml-3 text-sm font-medium">Loading chat history…</span>
      </div>
    </div>

    <transition name="fade">
      <div v-if="showUpgradePrompt" class="fixed inset-0 z-[80] flex items-center justify-center px-4">
        <div class="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" @click="closeUpgradePrompt"></div>
        <div class="relative z-[81] w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
          <p class="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-600">Pro Feature</p>
          <h2 class="mt-2 text-2xl font-bold text-slate-900">{{ upgradePromptTitle }}</h2>
          <p class="mt-3 text-sm leading-6 text-slate-600">
            {{ upgradePromptMessage }}
          </p>

          <div class="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-slate-700">
            Save Chat to Machine Garage is only available with a Pro subscription.
          </div>

          <div class="mt-6 flex flex-col gap-2 sm:flex-row">
            <button
              @click="goToUpgrade"
              class="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Upgrade To Pro
            </button>
            <button
              @click="closeUpgradePrompt"
              class="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Chat Messages -->
    <div ref="messagesContainer" class="messages-scroll flex-1 min-h-0 overflow-y-auto px-3 py-4 sm:px-6 sm:py-6"
      @scroll="onScroll">
      <!-- mobile-first: full width; increase max width on sm/md/lg -->
      <div class="mx-auto w-full max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl space-y-4 sm:space-y-6">
        <div v-if="authStore.isAuthenticated" class="pointer-events-none sticky top-3 z-20 flex justify-end">
          <div class="pointer-events-auto w-full max-w-[280px] sm:max-w-[300px]">
            <div v-if="usageMinimized" class="flex justify-end">
              <button
                @click="usageMinimized = false"
                class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/95 px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur-sm transition hover:bg-slate-50"
                title="Expand usage snapshot"
              >
                <span class="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-blue-600">+</span>
                <span>Usage</span>
              </button>
            </div>
            <div v-else class="space-y-2">
              <div class="flex justify-end">
                <button
                  @click="usageMinimized = true"
                  class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/95 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600 shadow-sm backdrop-blur-sm transition hover:bg-slate-50"
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

        <MessageBubble v-for="msg in messages" :key="msg.id" :message="msg" :isUser="msg.isUser" />


        <!-- WhatsApp-style typing dots (compact on mobile) -->
        <div v-if="isTyping" class="flex items-start">
          <div class="bg-gray-200 text-gray-900 px-2 py-1 rounded-lg flex items-center space-x-1" aria-hidden="true">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll-to-bottom button (shows only when user scrolled up) -->
    <transition name="fade">
      <button v-if="showScrollButton" @click="handleScrollToBottom" class="scroll-to-bottom-btn"
        :aria-hidden="!showScrollButton ? 'true' : 'false'" title="Jump to latest message">
        ↓
      </button>
    </transition>

    <div class="border-t border-gray-200 bg-white/95">
      <div class="mx-auto w-full max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl px-3 py-2">
        <div class="flex flex-wrap items-center gap-2">
          <button @click="toggleSavePanel"
            class="px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition">
            Save Chat To Machine Garage
          </button>
          <p v-if="saveStatus" class="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded px-2 py-1">
            {{ saveStatus }}
          </p>
          <p v-if="saveError" class="text-xs text-red-700 bg-red-50 border border-red-200 rounded px-2 py-1">
            {{ saveError }}
          </p>
          <p v-if="askError" class="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded px-2 py-1">
            {{ askError }}
          </p>
        </div>

        <div v-if="showSavePanel" class="mt-2 flex flex-col sm:flex-row sm:items-center gap-2">
          <select v-model="selectedMachineId"
            class="w-full sm:w-64 px-2 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Select machine</option>
            <option v-for="item in machines" :key="item.id" :value="String(item.id)">
              {{ item.brand }} {{ item.model }}{{ item.serial ? ' (' + item.serial + ')' : '' }}
            </option>
          </select>
          <button @click="handleSaveChat" :disabled="saveLoading || machineLoading || !selectedMachineId"
            class="px-3 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition">
            {{ saveLoading ? 'Saving...' : 'Save Now' }}
          </button>
          <button @click="loadMachines" :disabled="machineLoading"
            class="px-3 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-60 disabled:cursor-not-allowed transition">
            {{ machineLoading ? 'Loading...' : 'Refresh Machines' }}
          </button>
          <button @click="goToAccount"
            class="px-3 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition">
            Manage Machines
          </button>
        </div>
      </div>
    </div>

    <!-- Sticky Footer: Disclaimer + Chat Input -->
    <div ref="footerRef" class="chat-footer">
      <!-- Disclaimer Section -->
      <div class="border-t border-gray-200 bg-yellow-50">
        <div
          class="mx-auto w-full max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl px-3 py-2 text-[11px] sm:text-xs text-yellow-900 leading-snug">
          <strong>Disclaimer:</strong>
          All information provided through this service is for general informational purposes only and does not
          constitute professional, legal, or technical advice. Users are solely responsible for evaluating and
          confirming the accuracy, applicability, and safety of any guidance or instructions before use. Always follow
          manufacturer documentation and applicable safety regulations. MachineryGenius.com and its affiliates disclaim
          any liability for injuries, damages, or losses arising from the use of this platform. <strong>Use at your own
            risk.</strong>
        </div>
      </div>

      <!-- Chat Input -->
      <div class="px-3 py-3 sm:px-4 sm:py-4 sm:pt-0 pt-0">
        <ChatInput :allowFileUpload="false" :is-loading="isLoading" :auto-focus="true"
          @send-message="handleSendMessage" :value="inputMessage" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { v4 as uuidv4 } from 'uuid'
import { useUIStore } from '@/stores/ui'
import { useAuthStore } from '@/stores/auth'
import { useServices } from '@/services/container'
import ChatUsageStats from '@/components/ChatUsageStats.vue'
import MessageBubble from '@/components/MessageBubble.vue'
import ChatInput from '@/components/ChatInput.vue'

const router = useRouter()
const route = useRoute()
const sessionId = ref(route.params.session)
const inputMessage = ref('')
const authStore = useAuthStore()

const { api, machine } = useServices()

const uiStore = useUIStore()
const isTyping = computed(() => uiStore.isTyping)
const isLoading = computed(() => uiStore.isLoading)
const messages = ref([])
const messagesContainer = ref(null)
const pageRef = ref(null)
const footerRef = ref(null)
const isAtBottom = ref(true)      // whether container is scrolled near bottom
const showScrollButton = ref(false) // derived UI - we show button only when user scrolled up

const showSavePanel = ref(false)
const showUpgradePrompt = ref(false)
const usageMinimized = ref(false)
const machineLoading = ref(false)
const saveLoading = ref(false)
const machines = ref([])
const selectedMachineId = ref('')
const saveStatus = ref('')
const saveError = ref('')
const askError = ref('')
const upgradePromptTitle = ref('Upgrade to save chats')
const upgradePromptMessage = ref('Upgrade to Pro to save this conversation to your Machine Garage and organize support history by machine.')

// threshold (px) to consider "at bottom"
const BOTTOM_THRESHOLD = 120
const canSaveChatToMachine = computed(() => {
  return Boolean(authStore.user?.has_unlimited_questions)
    || String(authStore.user?.plan || '').toUpperCase() === 'PRO'
})

const resolveErrorMessage = (error, fallback) => {
  return error?.response?.data?.paywall?.title
    || error?.response?.data?.message
    || error?.message
    || fallback
}

const clearMachineMessages = () => {
  saveStatus.value = ''
  saveError.value = ''
}

const openUpgradePrompt = (error) => {
  upgradePromptTitle.value = error?.response?.data?.paywall?.title || 'Upgrade to save chats'
  upgradePromptMessage.value = error?.response?.data?.message
    || 'Upgrade to Pro to save this conversation to your Machine Garage and organize support history by machine.'
  showUpgradePrompt.value = true
}

const closeUpgradePrompt = () => {
  showUpgradePrompt.value = false
}

const loadMachines = async () => {
  try {
    machineLoading.value = true
    saveError.value = ''
    const { data } = await machine.list()
    machines.value = Array.isArray(data?.machines) ? data.machines : []
    if (!selectedMachineId.value && machines.value.length) {
      selectedMachineId.value = String(machines.value[0].id)
    }
  } catch (error) {
    saveError.value = resolveErrorMessage(error, 'Unable to load machines right now.')
  } finally {
    machineLoading.value = false
  }
}

const toggleSavePanel = async () => {
  clearMachineMessages()
  if (!canSaveChatToMachine.value) {
    showSavePanel.value = false
    openUpgradePrompt()
    return
  }
  showSavePanel.value = !showSavePanel.value
  if (showSavePanel.value && !machines.value.length) {
    await loadMachines()
  }
}

const goToAccount = () => {
  router.push({ name: 'account' })
}

const goToUpgrade = () => {
  closeUpgradePrompt()
  router.push({ name: 'account' })
}

const handleSaveChat = async () => {
  if (!selectedMachineId.value || saveLoading.value) {
    return
  }

  try {
    saveLoading.value = true
    clearMachineMessages()
    const { data } = await machine.saveChatToMachine(String(sessionId.value), Number(selectedMachineId.value))
    saveStatus.value = data?.message || 'Chat saved to machine.'
  } catch (error) {
    if (error?.response?.status === 402 || error?.response?.data?.paywall) {
      showSavePanel.value = false
      openUpgradePrompt(error)
    }
    saveError.value = resolveErrorMessage(error, 'Unable to save this chat to machine.')
  } finally {
    saveLoading.value = false
  }
}

// safe scroll function: scrolls either instantly or smoothly
const scrollToBottom = (smooth = false) => {
  const el = messagesContainer.value
  if (!el) return

  const top = el.scrollHeight - el.clientHeight
  if (smooth && 'scrollTo' in el) {
    el.scrollTo({ top, behavior: 'smooth' })
  } else {
    el.scrollTop = top
  }
}

// When new messages arrive: only auto-scroll if user was near bottom.
const tryAutoScrollOnNewMessage = async () => {
  await nextTick()
  if (isAtBottom.value) {
    scrollToBottom(true)
  } else {
    // do not auto-scroll; instead show button
    showScrollButton.value = true
  }
}

const pushMessage = (role, content, extra = {}) => {
  const message = {
    id: uuidv4(),
    role,
    content,
    timestamp: new Date().toISOString(),
    isUser: role === 'user',
    ...extra
  }

  messages.value.push(message)

  return message
}

const removeMessageById = (messageId) => {
  if (!messageId) {
    return
  }

  messages.value = messages.value.filter((message) => message.id !== messageId)
}

const loadSession = async (id) => {
  try {
    // show global loading overlay while fetching chat history
    uiStore.setLoading(true)
    messages.value = []
    askError.value = ''
    const res = await api.getChatHistory(id)
    messages.value = res.data.messages.map(msg => ({
      ...msg,
      isUser: msg.role === 'user'
    }))
    await nextTick()
    scrollToBottom()
  } catch (err) {
    console.error('Failed to load chat history:', err)
  } finally {
    uiStore.setLoading(false)
  }
}

const sendToAI = async (question, pendingMessageId = null) => {
  uiStore.setTyping(true)
  try {
    askError.value = ''
    const res = await api.askInSession(String(sessionId.value), question)
    uiStore.setTyping(false)
    const answer = res.data.answer
    pushMessage('assistant', answer.summary, {
      advice_points: answer.advice_points,
      followup_questions: answer.followup_questions,
      need_more_context: answer.need_more_context,
      related_models: answer.related_models
    })
    if (res.data?.billing) {
      authStore.mergeUser(res.data.billing)
    } else {
      await authStore.fetchProfile()
    }

    await tryAutoScrollOnNewMessage()
  } catch (err) {
    removeMessageById(pendingMessageId)
    askError.value = resolveErrorMessage(err, 'AI request failed. Please try again.')
    uiStore.setTyping(false)
  }
}

const handleSendMessage = async (message) => {
  const pendingMessage = pushMessage('user', message.text)
  await tryAutoScrollOnNewMessage() // if user was at bottom, will scroll now (because message was added)
  await sendToAI(message.text, pendingMessage.id)
  scrollToBottom()
}

// SCROLL HANDLING
let scrollTimeout = null
const onScroll = (e) => {
  const el = e.target
  if (!el) return

  // compute distance from bottom
  const distanceFromBottom = el.scrollHeight - el.clientHeight - el.scrollTop

  // update isAtBottom flag
  isAtBottom.value = distanceFromBottom <= BOTTOM_THRESHOLD

  // show or hide button
  showScrollButton.value = !isAtBottom.value

  // optional: debounce heavy work (like analytics); not necessary here but kept for pattern
  if (scrollTimeout) clearTimeout(scrollTimeout)
  scrollTimeout = setTimeout(() => {
    // any debounced actions (none for now)
  }, 100)
}

// invoked when user clicks the button
const handleScrollToBottom = () => {
  scrollToBottom(true)
  // after animation we consider user at bottom
  isAtBottom.value = true
  showScrollButton.value = false
}

let footerObserver = null
const updateFooterHeight = () => {
  const pageEl = pageRef.value
  const footerEl = footerRef.value
  if (!pageEl || !footerEl) return
  pageEl.style.setProperty('--chat-footer-height', `${footerEl.offsetHeight}px`)
}

onMounted(async () => {
  const pendingQuestion = sessionStorage.getItem('pendingQuestion')

  await loadMachines()

  if (pendingQuestion) {
    const pendingMessage = pushMessage('user', pendingQuestion)
    await sendToAI(pendingQuestion, pendingMessage.id)
    sessionStorage.removeItem('pendingQuestion')
    await nextTick()
    scrollToBottom()
  } else {
    await loadSession(sessionId.value)
  }

  await nextTick()
  const el = messagesContainer.value
  if (el) {
    const distanceFromBottom = el.scrollHeight - el.clientHeight - el.scrollTop
    isAtBottom.value = distanceFromBottom <= BOTTOM_THRESHOLD
    showScrollButton.value = !isAtBottom.value
  }

  await nextTick()
  updateFooterHeight()
  if (footerRef.value && typeof ResizeObserver !== 'undefined') {
    footerObserver = new ResizeObserver(() => updateFooterHeight())
    footerObserver.observe(footerRef.value)
  }
})

watch(() => route.params.session, async (newSessionId, oldSessionId) => {
  if (newSessionId && newSessionId !== oldSessionId) {
    sessionId.value = newSessionId
    clearMachineMessages()
    showSavePanel.value = false
    await loadSession(newSessionId)
  }
})

onBeforeUnmount(() => {
  if (footerObserver) {
    footerObserver.disconnect()
    footerObserver = null
  }
})
</script>

<style scoped>
.chat-session {
  --chat-footer-height: 140px;
}

.messages-scroll {
  padding-bottom: calc(var(--chat-footer-height) + 12px);
  scroll-padding-bottom: calc(var(--chat-footer-height) + 12px);
}

.chat-footer {
  position: sticky;
  bottom: 0;
  z-index: 30;
  background: rgba(249, 250, 251, 0.95);
  backdrop-filter: blur(6px);
  box-shadow: 0 -10px 24px rgba(18, 20, 25, 0.06);
}

/* smaller dots for mobile, scale slightly on larger screens */
.dot {
  width: 6px;
  height: 6px;
  background-color: #555;
  border-radius: 50%;
  animation: blink 1.4s infinite both;
}

@media (min-width: 640px) {
  .dot {
    width: 7px;
    height: 7px;
  }
}

.dot:nth-child(2) {
  animation-delay: 0.18s;
}

.dot:nth-child(3) {
  animation-delay: 0.36s;
}

@keyframes blink {

  0%,
  80%,
  100% {
    opacity: 0;
  }

  40% {
    opacity: 1;
  }
}

/* Scroll-to-bottom button styles */
/* position absolute in the relative parent container; mobile: smaller & closer to right/bottom */
.scroll-to-bottom-btn {
  position: absolute;
  right: 12px;
  bottom: calc(var(--chat-footer-height) + 12px);
  /* keeps it above disclaimer+input; tweak if your input height changes */
  z-index: 40;
  width: 36px;
  height: 36px;
  border-radius: 9999px;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 6px 18px rgba(18, 20, 25, 0.06);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: #1f2937;
  cursor: pointer;
}

/* slightly bigger on larger screens */
@media (min-width: 640px) {
  .scroll-to-bottom-btn {
    right: 20px;
    width: 40px;
    height: 40px;
  }
}

/* small fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity .18s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* LOADING OVERLAY STYLES */
.loading-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(15, 23, 42, 0.06);
  backdrop-filter: blur(2px);
}

.loading-plate {
  position: relative;
  z-index: 60;
  display: inline-flex;
  align-items: center;
  background: white;
  border-radius: 12px;
  padding: 12px 16px;
  box-shadow: 0 8px 30px rgba(18, 20, 25, 0.08);
  gap: 8px;
  transform: translateY(-60px);
}

/* spinner */
.spinner {
  width: 30px;
  height: 30px;
  animation: rotate 1s linear infinite;
}

.spinner .path {
  stroke: #3b82f6;
  /* blue-500 */
  stroke-linecap: round;
  stroke-dasharray: 90;
  stroke-dashoffset: 20;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

/* visually-hidden for SR-only text */
.sr-only {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}
</style>
