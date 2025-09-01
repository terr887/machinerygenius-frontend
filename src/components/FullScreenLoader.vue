<template>
    <div v-if="isLoading" class="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
        <div class="text-lg font-semibold animate-pulse">Machinery Genius is thinking...</div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUIStore } from '@/stores/ui'

const uiStore = useUIStore()
const isLoading = computed(() => uiStore.isLoading)
</script>
