<template>
  <!-- Main Chat Area -->
  <div class="flex-1 flex flex-col bg-gray-50">
    <!-- Chat Messages -->
    <div class="flex-1 overflow-y-auto p-6">
      <div class="max-w-4xl mx-auto">
        <!-- Messages Container -->
        <div class="space-y-6">
          <MessageBubble v-for="(msg, index) in messages" :key="index" :message="msg" :isUser="msg.isUser" />
        </div>
      </div>
    </div>

    <!-- Input Area -->
    <div class="p-4">
      <div class="max-w-4xl mx-auto">
        <div class="relative bg-white">
          <input v-model="inputMessage" @keypress.enter="sendMessage" type="text" placeholder="Type your message..."
            class="w-full px-5 py-3 pr-14 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          <button @click="sendMessage"
            class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MessageBubble from './MessageBubble.vue'

const inputMessage = ref('')

const messages = ref([
  {
    isUser: true,
    text: "Tell me about lathe machine"
  },
  {
    isUser: false,
    text: "A lathe machine is a versatile tool used primarily for shaping metal, wood, or other materials by rotating the workpiece against a cutting tool. It is commonly employed in operations like turning, drilling, threading, and facing.",
    items: [
      {
        title: "Headstock",
        description: "Houses the spindle and speed change mechanisms."
      },
      {
        title: "Tailstock",
        description: "Used to support the workpiece and can be adjusted for alignment."
      },
      {
        title: "Carriage",
        description: "Moves the cutting tool along the workpiece for precision shaping."
      },
      {
        title: "Quick Change Gear Box",
        description: "Allows for easy adjustment of feed rates and threading."
      }
    ],
    additionalText: "Proper maintenance, such as regular lubrication and alignment checks, ensures the machine operates efficiently.",
    followUp: "If you'd like to know more about specific parts or operations, feel free to ask!",
    quickActions: ["what is Headstock?"]
  },
  {
    isUser: true,
    text: "what is Headstock?"
  },
  {
    isUser: false,
    text: "The Headstock is a critical component of a lathe machine. It houses the spindle and the speed change mechanisms. The spindle is supported by anti-friction bearings, which are lubricated automatically by a circulating oil system. This design ensures minimal maintenance and smooth operation. Additionally, the headstock includes mechanisms for adjusting spindle bearings and speed selection."
  }
])

const sendMessage = () => {
  if (inputMessage.value.trim()) {
    messages.value.push({
      isUser: true,
      text: inputMessage.value
    })

    // Simulate bot response (you can replace this with actual API call)
    setTimeout(() => {
      messages.value.push({
        isUser: false,
        text: "This is a sample response from the bot. You can integrate this with your actual chatbot API."
      })
    }, 1000)

    inputMessage.value = ''
  }
}
</script>