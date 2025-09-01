import { useUIStore } from '@/stores/ui'
import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

// api.interceptors.request.use(
//     (config) => {
//         const uiStore = useUIStore()
//         uiStore.setLoading(true)
//         return config
//     },
//     (error) => {
//         const uiStore = useUIStore()
//         uiStore.setLoading(false)
//         return Promise.reject(error)
//     }
// )

// api.interceptors.response.use(
//     (response) => {
//         const uiStore = useUIStore()
//         uiStore.setLoading(false)
//         return response
//     },
//     (error) => {
//         const uiStore = useUIStore()
//         uiStore.setLoading(false)
//         return Promise.reject(error)
//     }
// )

export default {
    createChat: (message: string) => {
        const formData = new URLSearchParams()
        formData.append('question', message)

        return api.post(`/chat/new`, formData, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
    },

    getChats: () => api.get('/chats'),

    askInSession: (sessionId: string, message: string) => {
        const formData = new URLSearchParams()
        formData.append('question', message)

        return api.post(`/chat/${sessionId}/ask`, formData, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
    },


    getChatHistory: (sessionId: any) =>
        api.get(`/chat/${sessionId}/history`)
}
