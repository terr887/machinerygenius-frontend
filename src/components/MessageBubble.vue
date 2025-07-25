<template>
  <div class="flex items-end space-x-3 mb-6" :class="{ 'flex-row-reverse space-x-reverse': isUser }">
    <!-- Avatar -->
    <div class="flex-shrink-0">
      <div v-if="!isUser" class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
        <span class="text-white font-semibold text-sm">B</span>
      </div>
      <div v-else class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
        <span class="text-gray-600 font-semibold text-sm">U</span>
      </div>
    </div>

    <!-- Message Content -->
    <div class="flex-1 max-w-3xl">
      <div class="p-4 rounded-lg" :class="isUser ? 'bg-blue-600 text-white ml-12' : 'bg-white text-gray-900'">
        <!-- Message Text -->
        <div v-if="message.text">
          {{ message.text }}
        </div>

        <!-- Bullet Points List -->
        <div v-if="message.items && message.items.length" class="space-y-2 mb-3">
          <div v-for="item in message.items" :key="item.title" class="flex items-start space-x-2">
            <span class="w-1.5 h-1.5 bg-current rounded-full mt-2 flex-shrink-0"></span>
            <div>
              <span class="font-semibold">{{ item.title }}:</span>
              <span class="ml-1">{{ item.description }}</span>
            </div>
          </div>
        </div>

        <!-- Additional Text -->
        <div v-if="message.additionalText">
          {{ message.additionalText }}
        </div>

        <!-- Follow-up Text -->
        <div v-if="message.followUp" class="mt-3">
          {{ message.followUp }}
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: Object,
    required: true
  },
  isUser: {
    type: Boolean,
    default: false
  }
})
</script>