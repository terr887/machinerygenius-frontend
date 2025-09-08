<template>
    <section v-if="questions?.length" class="mt-3 pt-2 border-t border-gray-100" aria-label="Follow-up questions">
        <p class="text-xs font-semibold mb-2 opacity-80">💡 Follow-up Questions:</p>

        <!-- Stack vertically on mobile, inline wrap on sm+ -->
        <div class="flex flex-col sm:flex-row sm:flex-wrap gap-2" role="group" :aria-label="ariaLabel">
            <button
                class="w-full sm:w-auto text-left px-3 py-2 rounded-lg bg-blue-50 text-blue-700 text-xs sm:text-sm hover:bg-blue-100 hover:shadow-sm transition focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-200"
                v-for="(q, i) in questions" :key="i" @click="onClick(q)">
                {{ q }}
            </button>
        </div>
    </section>
</template>

<script setup>
const emits = defineEmits(['sendFollowup'])

const props = defineProps({
    questions: { type: Array, default: () => [] },
    ariaLabel: { type: String, default: 'Follow-up questions' }
})

function onClick(q) {
    emits('sendFollowup', q)
}
</script>
