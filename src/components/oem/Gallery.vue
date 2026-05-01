<template>
    <div class="flex flex-wrap justify-center items-center">
        <template v-for="num in count" :key="`${base}-${num}`">
            <img :src="`/assets/images/${base}/${start + num - 1}.png`" :alt="`${base} Machine ${start + num - 1}`"
                loading="lazy" class="mx-4 max-h-20 object-contain" @error="handleError($event, num)" />
        </template>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue"

const props = defineProps<{
    base: string
    start: number
    end: number
}>()

const count = computed(() => props.end - props.start + 1)

function handleError(event: Event, num: number) {
    const target = event.target as HTMLImageElement
    console.warn(`Missing image: ${props.base}/${props.start + num - 1}.png`)
    target.style.display = "none"
}
</script>
