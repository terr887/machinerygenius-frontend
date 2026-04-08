import { defineStore } from 'pinia'
import { ref } from 'vue'

type ToastType = 'success' | 'error' | 'info' | 'warning'

interface Toast {
  id: string
  message: string
  type: ToastType
  timestamp: Date
}

export const useToastStore = defineStore('toast', () => {
  const toasts = ref<Toast[]>([])
  const toastTimeouts = ref<Record<string, ReturnType<typeof setTimeout>>>({})

  const removeToast = (id: string): void => {
    toasts.value = toasts.value.filter(toast => toast.id !== id)

    if (toastTimeouts.value[id]) {
      clearTimeout(toastTimeouts.value[id])
      delete toastTimeouts.value[id]
    }
  }

  const showToast = (
    message: string,
    type: ToastType = 'info',
    duration: number = 5000
  ): string => {
    const id = Date.now().toString()

    toasts.value.push({
      id,
      message,
      type,
      timestamp: new Date()
    })

    if (duration > 0) {
      toastTimeouts.value[id] = setTimeout(() => {
        removeToast(id)
      }, duration)
    }

    return id
  }

  const success = (message: string, duration?: number) =>
    showToast(message, 'success', duration)

  const error = (message: string, duration?: number) =>
    showToast(message, 'error', duration)

  const info = (message: string, duration?: number) =>
    showToast(message, 'info', duration)

  const warning = (message: string, duration?: number) =>
    showToast(message, 'warning', duration)

  return {
    toasts,
    showToast,
    removeToast,
    success,
    error,
    info,
    warning
  }
})