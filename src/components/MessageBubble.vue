<template>
  <div class="flex items-end mb-4 w-full" :class="{ 'flex-row-reverse': isUser }" role="article"
    :aria-label="isUser ? 'User message' : 'Assistant message'">
    <!-- Avatar -->
    <div class="flex-shrink-0" :class="isUser ? 'ml-2' : 'mr-2'">
      <div class="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shadow-sm"
        :class="isUser ? 'bg-gray-300' : 'bg-blue-500'" aria-hidden="true">
        <span class="font-semibold text-xs sm:text-sm" :class="isUser ? 'text-gray-700' : 'text-white'">
          {{ isUser ? 'U' : 'B' }}
        </span>
      </div>
    </div>

    <!-- Message Content -->
    <div class="flex-1">
      <div class="rounded-2xl shadow-sm leading-relaxed text-sm sm:text-base break-words" :class="bubbleClasses"
        :style="bubbleStyle">
        <!-- Main Summary -->
        <div v-if="message.content" class="whitespace-pre-line">
          {{ message.content }}
        </div>

        <!-- Advice Points -->
        <ul v-if="message.advice_points?.length" class="mt-3 mb-3 text-sm sm:text-sm space-y-2 pl-1">
          <li v-for="(point, idx) in message.advice_points" :key="idx" class="flex items-start gap-2">
            <span class="w-2 h-2 rounded-full bg-blue-400 mt-2 shrink-0"></span>
            <span class="flex-1 text-[13px] sm:text-sm">{{ point }}</span>
          </li>
        </ul>

        <!-- Follow-Up Questions -->
        <div v-if="message.followup_questions?.length" class="mt-2 pt-2 border-t border-gray-200">
          <p class="text-xs font-semibold mb-2 opacity-80">💡 Follow-up Questions:</p>

          <div class="flex flex-wrap items-center gap-2" role="group" aria-label="Follow-up questions">
            <button v-for="(q, i) in message.followup_questions" :key="i" @click="$emit('sendFollowup', q)"
              class="px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs sm:text-sm hover:bg-blue-100 hover:shadow-sm transition">
              {{ q }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps(['message', 'isUser'])

const bubbleClasses = computed(() => {
  const base = 'px-3 py-2 sm:px-4 sm:py-3 text-[14px]'

  const user = 'bg-gradient-to-r from-blue-600 to-blue-500 text-white'
  const assistant = 'bg-white text-gray-800 border border-gray-100'

  const userSpacing = 'ml-10 sm:ml-12'
  const assistantSpacing = 'mr-10 sm:mr-12'

  return `${base} ${props.isUser ? `${user} ${userSpacing}` : `${assistant} ${assistantSpacing}`}`
})

const bubbleStyle = computed(() => {
  return {
    'box-shadow': '0 2px 8px rgba(18,20,25,0.04)'
  }
})
</script>

<style scoped>
.break-words {
  word-break: break-word;
}

@media (max-width: 420px) {
  .px-3 {
    padding-left: 0.6rem;
    padding-right: 0.6rem;
  }

  .py-2 {
    padding-top: 0.45rem;
    padding-bottom: 0.45rem;
  }
}

@media (max-width: 420px) {
  .from-blue-600 {
    --tw-gradient-from: #2563eb;
  }
}

button:focus {
  outline: 3px solid rgba(59, 130, 246, 0.18);
  outline-offset: 2px;
}
</style>
