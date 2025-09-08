<template>
  <div class="flex-1 flex flex-col bg-gray-50">
    <SafetyWarning />
    <!-- Messages Area -->
    <div class="flex-1 overflow-y-auto">
      <!-- Welcome Screen (when no messages) -->
      <div class="flex items-center justify-center h-full">
        <div class="text-center max-w-3xl mx-auto px-6">
          <div class="flex items-center justify-center">
            <img src="/assets/machinery-genius.png" alt="Machinery Genius"
              class="w-40 h-40 object-cover rounded-full mx-auto" />
          </div>
          <h2 class="text-xl font-semibold text-gray-900 mb-2 mt-6">Hi, I am Machinery Genius</h2>
          <p class="text-gray-600 mb-6">AI-powered support — Visual diagnostic, manuals, maintenance tracking,
            part sourcing, and more.</p>

          <ChatInput :allowFileUpload="false" :is-loading="isLoading" :show-typing-indicator="isTyping"
            :auto-focus="true" @send-message="handleSendMessage" placeholder="Ask me anything about machinery"
            :hasTopBorder="false" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useSessionStore } from '@/stores/session'
import ChatInput from '@/components/ChatInput.vue'
import api from '@/services/ApiService'
import SafetyWarning from '@/components/SafetyWarning.vue'

const isLoading = ref(false)
const isTyping = ref(false)
const router = useRouter()
const sessionStore = useSessionStore()

const scrollToBottom = () => {
  const container = document.querySelector('.overflow-y-auto')
  if (container) {
    container.scrollTop = container.scrollHeight
  }
}

const handleSendMessage = async (message) => {
  const res = await api.createChat(message.text)
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
</script>
