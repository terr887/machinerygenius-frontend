<template>
  <div class="flex-1 flex flex-col bg-gray-50">
    <!-- Messages Area -->
    <div class="flex-1 overflow-y-auto">
      <!-- Welcome Screen (when no messages) -->
      <div class="flex items-center justify-center h-full">
        <div class="text-center max-w-md mx-auto px-6">
          <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-gray-900 mb-2">Welcome to Botpress Chat</h2>
          <p class="text-gray-600 mb-6">Start a conversation by typing a message below. I'm here to help!</p>
        </div>
      </div>
    </div>

    <!-- Chat Input -->
    <ChatInput :allowFileUpload="false" :is-loading="isLoading" :show-typing-indicator="isTyping" :auto-focus="true"
      @send-message="handleSendMessage" />
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import ChatInput from '@/components/ChatInput.vue'

const isLoading = ref(false)
const isTyping = ref(false)

const scrollToBottom = () => {
  const container = document.querySelector('.overflow-y-auto')
  if (container) {
    container.scrollTop = container.scrollHeight
  }
}

const handleSendMessage = async (message) => {
  console.log(message);

  await nextTick()
  scrollToBottom()
}
</script>