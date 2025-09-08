<template>
    <section aria-label="Related models" class="mt-0 mb-3" v-if="models?.length">
        <p class="text-xs font-semibold mb-2 opacity-80">🔎 Related models</p>

        <!-- Grid: mobile two columns, sm -> four columns (adjust as needed) -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <!-- compact, left-aligned buttons -->
            <button
                class="w-full text-left px-3 py-1.5 rounded-lg border bg-white text-sm hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-200 truncate"
                v-for="(m, i) in models" :key="i" @click="selectModel(m)" @keydown.enter.prevent="selectModel(m)"
                :aria-label="`Select model ${m}`">
                {{ m }}
            </button>
        </div>
    </section>
</template>

<script setup>
const emits = defineEmits(['selectModel'])
const props = defineProps({
    models: { type: Array, default: () => [] }
})

function selectModel(model) {
    emits('selectModel', model)
}
</script>
