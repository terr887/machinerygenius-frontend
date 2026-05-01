import axios from 'axios'

export interface ContactFormPayload {
    name: string
    email: string
    subject?: string
    message: string
    consent: boolean
    source_page?: string
}

export interface ContactResponse {
    message?: string
    status?: string
}

// Keep a tiny helper so we do not create a Pinia dependency in this module.
const getStoredToken = () => localStorage.getItem('mg_token')

const rawBaseUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || 'http://127.0.0.1:8000'
const apiBaseUrl = rawBaseUrl.endsWith('/api') ? rawBaseUrl : `${rawBaseUrl}/api`

export const apiClient = axios.create({
    baseURL: apiBaseUrl,
    headers: {
        'Content-Type': 'application/json'
    }
})

apiClient.interceptors.request.use((config) => {
    const token = getStoredToken()
    if (token) {
        config.headers = config.headers || {}
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default {
    createChat: (message: string) => {
        const formData = new URLSearchParams()
        formData.append('question', message)

        return apiClient.post(`/chat/new`, formData, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
    },

    getChats: () => apiClient.get('/chats'),

    askInSession: (sessionId: string, message: string) => {
        const formData = new URLSearchParams()
        formData.append('question', message)

        return apiClient.post(`/chat/${sessionId}/ask`, formData, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
    },


    getChatHistory: (sessionId: any) =>
        apiClient.get(`/chat/${sessionId}/history`),

    submitContact: (payload: ContactFormPayload) =>
        apiClient.post<ContactResponse>('/contact', payload),

    getHomeSections: () => apiClient.get('/home-sections')
}
