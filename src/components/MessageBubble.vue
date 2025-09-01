<template>
  <div class="flex items-end mb-6" :class="{ 'flex-row-reverse': isUser }">
    <!-- Avatar -->
    <div class="flex-shrink-0">
      <div class="w-9 h-9 rounded-full flex items-center justify-center shadow-sm"
        :class="isUser ? 'bg-gray-300' : 'bg-blue-500'">
        <span class="font-semibold text-sm" :class="isUser ? 'text-gray-700' : 'text-white'">
          {{ isUser ? 'U' : 'B' }}
        </span>
      </div>
    </div>

    <!-- Message Content -->
    <div class="flex-1 max-w-3xl px-3">
      <div class="p-4 rounded-2xl shadow-sm leading-relaxed text-sm sm:text-base" :class="isUser
        ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white ml-12'
        : 'bg-white text-gray-800 border border-gray-100'">

        <!-- Main Summary -->
        <div v-if="message.content" class="whitespace-pre-line">
          {{ message.content }}
        </div>

        <!-- Advice Points -->
        <ul v-if="message.advice_points?.length" class="space-y-2 mt-3 mb-4 text-sm">
          <li v-for="(point, idx) in message.advice_points" :key="idx" class="flex items-start space-x-2">
            <span class="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2"></span>
            <span>{{ point }}</span>
          </li>
        </ul>

        <!-- Follow-Up Questions -->
        <div v-if="message.followup_questions?.length" class="mt-3 pt-2 border-t border-gray-200">
          <p class="text-xs font-semibold mb-2 opacity-70">💡 Follow-up Questions:</p>
          <div class="space-y-1 space-x-1">
            <button v-for="(q, i) in message.followup_questions" :key="i" @click="$emit('sendFollowup', q)"
              class="px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm hover:bg-blue-100 hover:shadow-sm transition">
              {{ q }}
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  message: { type: Object, required: true },
  isUser: { type: Boolean, default: false }
})
</script>

<style scoped>
/* Slight animation for the assistant's bubble */
div[role="assistant"] {
  animation: fadeIn 0.25s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(5px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
