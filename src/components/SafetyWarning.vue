<template>
    <div v-if="showSafety" class="max-w-4xl mx-auto mt-4 px-4" role="status" aria-live="polite">
        <div class="bg-yellow-50 border border-yellow-200 rounded-lg shadow-sm p-3">
            <!-- ROW 1: Single horizontal row with two columns -->
            <div class="flex items-center justify-between gap-4">
                <!-- COL 1: icon + single-line title -->
                <div class="flex items-center gap-3 min-w-0">
                    <div class="flex-shrink-0">
                        <!-- warning icon -->
                        <svg class="w-6 h-6 text-yellow-700" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd"
                                d="M8.257 3.099c.765-1.36 2.72-1.36 3.485 0l6.518 11.586c.75 1.333-.213 2.985-1.742 2.985H3.48c-1.53 0-2.492-1.652-1.742-2.985L8.257 3.1zM11 13a1 1 0 10-2 0 1 1 0 002 0zm-1-8a1 1 0 00-.993.883L9 6v4a1 1 0 001.993.117L11 10V6a1 1 0 00-1-1z"
                                clip-rule="evenodd" />
                        </svg>
                    </div>

                    <p class="text-sm font-semibold text-yellow-900 truncate">
                        Safety & Accuracy — This information is provided for general reference only.
                    </p>
                </div>

                <!-- COL 2: actions (right aligned). small buttons with tooltips -->
                <div class="flex items-center gap-2">
                    <button @click="dismissSafety"
                        class="text-xs px-2 py-1 rounded hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                        title="Temporarily dismiss this banner">
                        Dismiss
                    </button>
                </div>
            </div>

            <!-- ROW 2: expandable content below the single row -->
            <div class="mt-2">
                <div class="text-sm text-yellow-800 leading-relaxed">
                    Always follow manufacturer and OSHA safety
                    guidelines.
                    Disconnect power before inspection, maintenance, or repair. Electrical work must be done by a
                    certified electrician.
                    Contact your manufacturer for official instructions. Use at your own risk.
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const showSafety = ref(true)

const dismissSafety = () => {
    showSafety.value = false
}
</script>
