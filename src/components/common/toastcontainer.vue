<template>
  <div class="pointer-events-none fixed inset-0 z-[300] flex flex-col items-end justify-start space-y-2 p-4">
    <transition-group name="toast">
      <div
        v-for="toast in toastStore.toasts"
        :key="toast.id"
        :class="[
          'pointer-events-auto w-full max-w-md overflow-hidden rounded-lg bg-white shadow-lg ring-1',
          toastTypeClasses[toast.type] || toastTypeClasses.info
        ]"
        role="status"
        aria-live="polite"
      >
        <div class="p-4">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <span
                class="flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold"
                :class="iconClasses[toast.type] || iconClasses.info"
                aria-hidden="true"
              >
                {{ iconLabels[toast.type] || iconLabels.info }}
              </span>
            </div>
            <div class="ml-3 w-0 flex-1 pt-0.5">
              <p class="text-sm font-medium text-gray-900">{{ toast.message }}</p>
            </div>
            <div class="ml-4 flex-shrink-0 flex">
              <button
                type="button"
                class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                @click="toastStore.removeToast(toast.id)"
              >
                <span class="sr-only">Close</span>
                <span aria-hidden="true" class="text-lg leading-none">×</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { useToastStore } from '@/stores/toast'

const toastStore = useToastStore()

const toastTypeClasses = {
  success: 'ring-green-200',
  error: 'ring-red-200',
  info: 'ring-blue-200',
  warning: 'ring-yellow-200'
}

const iconClasses = {
  success: 'bg-green-100 text-green-600',
  error: 'bg-red-100 text-red-600',
  info: 'bg-blue-100 text-blue-600',
  warning: 'bg-yellow-100 text-yellow-700'
}

const iconLabels = {
  success: 'S',
  error: '!',
  info: 'i',
  warning: '!'
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
