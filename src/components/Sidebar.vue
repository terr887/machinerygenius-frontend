<template>
  <div class="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
    <!-- Header -->
    <div class="p-4 border-b border-gray-200">
      <div class="flex items-center space-x-3">
        <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <span class="text-white font-semibold text-sm">MG</span>
        </div>
        <span class="font-medium text-gray-900">Machinery Genius</span>
      </div>
    </div>

    <!-- Conversations Section -->
    <div class="p-4 border-b border-gray-200">
      <div class="flex items-center space-x-2">
        <h2 class="text-sm font-medium text-gray-900">Conversations</h2>
        <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z">
          </path>
        </svg>
      </div>
    </div>

    <!-- Chat List -->
    <div class="flex-1 overflow-y-auto">
      <!-- Today Section -->
      <div class="px-4 py-3">
        <h3 class="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Today</h3>
        <div class="space-y-1">
          <div class="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
            New Chat
          </div>
          <div class="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
            what is Headstock?
          </div>
        </div>
      </div>

      <!-- Yesterday Section -->
      <div class="px-4 py-3">
        <h3 class="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Yesterday</h3>
        <div class="space-y-1">
          <div class="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
            Previous conversation
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Component logic can be added here
</script>