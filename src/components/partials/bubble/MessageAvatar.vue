<template>
    <div class="flex-shrink-0" :class="isUser ? 'ml-2' : 'mr-2'">
        <div class="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shadow-sm"
            :class="isUser ? 'bg-gray-300' : 'bg-blue-500'" aria-hidden="true">
            <span class="font-semibold text-xs sm:text-sm" :class="isUser ? 'text-gray-700' : 'text-white'">
                {{ isUser ? 'U' : 'B' }}
            </span>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    isUser: { type: Boolean, default: false }
})
</script>
