import api from '@/services/ApiService'
import { useSessionStore } from '@/stores/session'
import { useAuthStore } from '@/stores/auth'

export async function bootstrapApp(): Promise<void> {
    const sessionStore = useSessionStore()
    const authStore = useAuthStore()

    try {
        const res = await api.getChats()
        if(res.data){
            sessionStore.setSessions(res.data.sessions)
        }
    } catch (error) {
        console.error('Failed to bootstrap sessions:', error)
    }

    // Try to hydrate the user if a token is present
    if (authStore.token && !authStore.user) {
        try {
            await authStore.fetchProfile()
        } catch (error) {
            console.error('Failed to hydrate auth user:', error)
        }
    }
}
