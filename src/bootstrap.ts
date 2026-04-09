import { useSessionStore } from '@/stores/session'
import { useAuthStore } from '@/stores/auth'
import { getServices } from '@/services/container'

export async function bootstrapApp(): Promise<void> {
    const services = getServices()
    const sessionStore = useSessionStore()
    const authStore = useAuthStore()

    try {
        const res = await services.api.getChats()
        if (res.data) {
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
