import { defineStore } from 'pinia'

export const useUIStore = defineStore('ui', {
    state: () => ({
        isLoading: false,
        isTyping: false
    }),
    actions: {
        setTyping(value: boolean) {
            this.isTyping = value
        },
        setLoading(val: boolean) {
            this.isLoading = val
        }
    }
})
