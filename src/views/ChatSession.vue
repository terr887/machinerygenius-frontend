<template>
  <!-- make the page relative so absolute elements (scroll button) position correctly -->
  <div class="relative flex-1 flex flex-col bg-gray-50">
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

    <!-- Chat Messages -->
    <div ref="messagesContainer" class="flex-1 overflow-y-auto px-3 py-4 sm:px-6 sm:py-6" @scroll="onScroll">
      <!-- mobile-first: full width; increase max width on sm/md/lg -->
      <div class="mx-auto w-full max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl space-y-4 sm:space-y-6">
        <MessageBubble v-for="msg in messages" :key="msg.id" :message="msg" :isUser="msg.isUser"
          @sendFollowup="handleFollowup" @fillContext="handleFillContext" />


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

    <!-- Disclaimer Section -->
    <div class="border-t border-gray-200 bg-yellow-50">
      <div
        class="mx-auto w-full max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl px-3 py-2 text-[11px] sm:text-xs text-yellow-900 leading-snug">
        <strong>Disclaimer:</strong>
        All information provided through this service is for general informational purposes only and does not constitute
        professional, legal, or technical advice. Users are solely responsible for evaluating and confirming the
        accuracy, applicability, and safety of any guidance or instructions before use. Always follow manufacturer
        documentation and applicable safety regulations. MachineryGenius.com and its affiliates disclaim any liability
        for injuries, damages, or losses arising from the use of this platform. <strong>Use at your own risk.</strong>
      </div>
    </div>

    <!-- Chat Input -->
    <div class="px-3 py-3 sm:px-4 sm:py-4 sm:pt-0 pt-0">
      <ChatInput :allowFileUpload="false" :is-loading="isLoading" :auto-focus="true"
        @send-message="handleSendMessage" :value="inputMessage" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { v4 as uuidv4 } from 'uuid'
import { useUIStore } from '@/stores/ui'

import api from '@/services/ApiService'
import MessageBubble from '@/components/MessageBubble.vue'
import ChatInput from '@/components/ChatInput.vue'

const router = useRouter()
const route = useRoute()
const sessionId = ref(route.params.session)
const inputMessage = ref('')

const uiStore = useUIStore()
const isTyping = computed(() => uiStore.isTyping)
const isLoading = computed(() => uiStore.isLoading)
const messages = ref([])
const messagesContainer = ref(null)
const isAtBottom = ref(true)      // whether container is scrolled near bottom
const showScrollButton = ref(false) // derived UI - we show button only when user scrolled up

// threshold (px) to consider "at bottom"
const BOTTOM_THRESHOLD = 120

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
  messages.value.push({
    id: uuidv4(),
    role,
    content,
    timestamp: new Date().toISOString(),
    isUser: role === 'user',
    ...extra
  })
}

const loadSession = async (id) => {
  try {
    // show global loading overlay while fetching chat history
    uiStore.setLoading(true)
    messages.value = []
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

const sendToAI = async (question) => {
  uiStore.setTyping(true)
  try {
    const res = await api.askInSession(sessionId.value, question)
    uiStore.setTyping(false)
    const answer = res.data.answer
    pushMessage('assistant', answer.summary, {
      advice_points: answer.advice_points,
      followup_questions: answer.followup_questions,
      need_more_context: answer.need_more_context,
      related_models: answer.related_models
    })

    await tryAutoScrollOnNewMessage()
  } catch (err) {
    console.error('AI request failed:', err)
    uiStore.setTyping(false)
  }
}

const handleSendMessage = async (message) => {
  pushMessage('user', message.text)
  await tryAutoScrollOnNewMessage() // if user was at bottom, will scroll now (because message was added)
  await sendToAI(message.text)
  scrollToBottom()
}

const handleFollowup = async (followup) => {
  inputMessage.value = followup
  // await handleSendMessage({ text: followup })
}

const handleFillContext = async (payload) => {
  console.log(payload);
}

// SCROLL HANDLING
let scrollTimeout = null
const onScroll = (e) => {
  const el = e.target
  if (!el) return

  // compute distance from bottom
  const distanceFromBottom = el.scrollHeight - el.clientHeight - el.scrollTop

  // update isAtBottom flag
  const wasAtBottom = isAtBottom.value
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

onMounted(async () => {
  const pendingQuestion = sessionStorage.getItem('pendingQuestion')

  if (pendingQuestion) {
    pushMessage('user', pendingQuestion)
    await sendToAI(pendingQuestion)
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
})

watch(() => route.params.session, async (newSessionId, oldSessionId) => {
  if (newSessionId && newSessionId !== oldSessionId) {
    sessionId.value = newSessionId
    await loadSession(newSessionId)
  }
})
</script>

<style scoped>
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
  bottom: 110px;
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
