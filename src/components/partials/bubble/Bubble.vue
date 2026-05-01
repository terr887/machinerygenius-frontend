<template>
    <div class="rounded-lg shadow-sm leading-relaxed text-sm sm:text-base break-words" :class="bubbleClasses"
        :style="bubbleStyle">
        <!-- Main Summary -->

        <slot name="more_context" />

        <div v-if="message.content" class="whitespace-pre-line mb-3">
            {{ message.content }}
        </div>

        <!-- Advice list slot / fallback -->
        <slot name="advice" />

        <!-- Followups slot / fallback -->
        <slot name="followups" />
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    message: { type: Object, required: true },
    isUser: { type: Boolean, default: false }
})

const bubbleClasses = computed(() => {
    const base = 'px-3 py-2 sm:px-4 sm:py-3 text-[14px]'
    const user = 'bg-gradient-to-r from-blue-600 to-blue-500 text-white'
    const assistant = 'bg-white text-gray-800 border border-gray-100'
    const userSpacing = 'ml-0 sm:ml-10'
    const assistantSpacing = 'mr-0 sm:mr-10'
    return `${base} ${props.isUser ? `${user} ${userSpacing}` : `${assistant} ${assistantSpacing}`}`
})

const bubbleStyle = {
    'box-shadow': '0 2px 8px rgba(18,20,25,0.04)'
}
</script>
