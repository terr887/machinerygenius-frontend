<template>
  <div class="flex-1 flex flex-col bg-gray-50">
    <!-- Chat Messages -->
    <div class="flex-1 overflow-y-auto p-6">
      <div class="max-w-4xl mx-auto space-y-6">
        <MessageBubble 
          v-for="msg in messages" 
          :key="msg.id" 
          :message="msg" 
          :isUser="msg.isUser" 
          @sendFollowup="handleFollowup" 
        />

        <!-- ✅ WhatsApp-style typing dots -->
        <div v-if="isTyping" class="flex items-start">
          <div class="bg-gray-200 text-gray-900 px-3 py-2 rounded-lg flex space-x-1">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
        </div>
      </div>
    </div>

    <!-- Chat Input -->
    <div class="p-4">
      <ChatInput 
        :allowFileUpload="false" 
        :is-loading="isLoading" 
        :auto-focus="true"
        @send-message="handleSendMessage" 
      />
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

const uiStore = useUIStore()
const isTyping = computed(() => uiStore.isTyping)
const isLoading = computed(() => uiStore.isLoading)
const messages = ref([])

const scrollToBottom = () => {
  nextTick(() => {
    const container = document.querySelector('.overflow-y-auto')
    if (container) container.scrollTop = container.scrollHeight
  })
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
      followup_questions: answer.followup_questions
    })
    scrollToBottom()
  } catch (err) {
    console.error('AI request failed:', err)
    uiStore.setTyping(false)
  }
}

const handleSendMessage = async (message) => {
  pushMessage('user', message.text)
  await sendToAI(message.text)
  scrollToBottom()
}

const handleFollowup = async (followup) => {
  await handleSendMessage({ text: followup })
}

onMounted(async () => {
  const pendingQuestion = sessionStorage.getItem('pendingQuestion')
  
  if (pendingQuestion) {
    pushMessage('user', pendingQuestion)
    await sendToAI(pendingQuestion)
    sessionStorage.removeItem('pendingQuestion')
    scrollToBottom()
  } else {
    await loadSession(sessionId.value)
    scrollToBottom()
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
.dot {
  width: 6px;
  height: 6px;
  background-color: #555;
  border-radius: 50%;
  animation: blink 1.4s infinite both;
}
.dot:nth-child(2) { animation-delay: 0.2s; }
.dot:nth-child(3) { animation-delay: 0.4s; }
@keyframes blink {
  0%, 80%, 100% { opacity: 0; }
  40% { opacity: 1; }
}
</style>
