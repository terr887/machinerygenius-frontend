import api from '@/services/ApiService'
import { useSessionStore } from '@/stores/session'

export async function bootstrapApp(): Promise<void> {
    const sessionStore = useSessionStore()

    try {
        const res = await api.getChats()
        if(res.data){
            sessionStore.setSessions(res.data.sessions)
        }
    } catch (error) {
        console.error('Failed to bootstrap sessions:', error)
    }
}
