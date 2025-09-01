<template>
  <div class="w-72 bg-white border-r border-gray-200 flex flex-col h-full">
    <!-- Brand Header -->
    <div class="p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
      <span class="text-blue-600 font-bold">Machinerygenius.com</span>
    </div>

    <!-- New Chat Button -->
    <div class="p-2 border-b border-gray-200 sticky top-[48px] bg-white z-10">
      <button
        class="w-full flex items-center justify-between px-3 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-100 transition group">
        <div class="flex items-center gap-2">
          <!-- Plus icon -->
          <svg class="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition" fill="none" stroke="currentColor"
          viewBox="0 0 24 24">
          <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
        </svg>

          <span>New Chat</span>
        </div>
      </button>
    </div>

    <!-- Chat List -->
    <div class="flex-1 overflow-y-auto px-2 py-3 space-y-1">
      <div v-for="session in sessions" :key="session.id" class="rounded-md transition cursor-pointer" :class="isActive(session.id)
          ? 'bg-blue-50 text-blue-700 font-medium'
          : 'text-gray-700 hover:bg-gray-100'
        ">
        <RouterLink :to="{ name: 'chat-session', params: { session: session.id } }" class="block truncate px-3 py-2">
          <!-- Typing animation for new chats -->
          <span v-if="session.isNew" class="typing-title">{{ session.title }}</span>
          <span v-else>{{ session.title || 'Untitled Chat' }}</span>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useSessionStore } from "@/stores/session";

const route = useRoute();
const sessionStore = useSessionStore();
const sessions = computed(() => sessionStore.sessions);

const isActive = (id: string) => route.params.session === id;
</script>

<style scoped>
/* ✅ Typing cursor animation */
.typing-title::after {
  content: "|";
  margin-left: 2px;
  color: #3b82f6;
  animation: blink 1s infinite;
}

@keyframes blink {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }
}

[v-cloak] {
  display: none;
}
</style>
