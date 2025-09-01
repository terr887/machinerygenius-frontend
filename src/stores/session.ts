import { defineStore } from 'pinia'

export interface Session {
    id: string
    title: string
    created_at: string,
    isNew: boolean,
    _fullTitle?: string
}

export const useSessionStore = defineStore('session', {
    state: () => ({
        sessions: [] as Session[]
    }),
    actions: {
        setSessions(sessions: Session[]) {
            this.sessions = sessions
        },
        getSessionById(id: string): Session | undefined {
            return this.sessions.find(s => s.id === id)
        }
    }
})
