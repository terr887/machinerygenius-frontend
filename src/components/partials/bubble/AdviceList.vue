<template>
    <ul v-if="points?.length" class="mt-3 mb-3 text-sm sm:text-sm space-y-2 pl-1" role="list">
        <li v-for="(point, idx) in points" :key="idx" class="flex items-start gap-2">
            <span class="w-2 h-2 rounded-full bg-blue-400 mt-2 shrink-0" aria-hidden="true"></span>
            <span class="flex-1 text-[13px] sm:text-sm">{{ point }}</span>
        </li>
    </ul>
</template>

<script setup>
const props = defineProps({
    points: { type: Array, default: () => [] }
})
</script>
