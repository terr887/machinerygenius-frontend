import { apiClient } from '@/services/ApiService'

export interface Machine {
    id: number
    user_id: number
    brand: string
    model: string
    serial: string | null
    year: number | null
    tier_access: string | null
    created_at?: string
    updated_at?: string
}

export interface MachinePayload {
    brand: string
    model: string
    serial?: string
    year?: number | null
}

export default {
    list() {
        return apiClient.get<{ status: boolean; machines: Machine[] }>('/machines')
    },

    create(payload: MachinePayload) {
        return apiClient.post<{ status: boolean; message: string; machine: Machine }>('/machines', payload)
    },

    saveChatToMachine(sessionUuid: string, machineId: number) {
        return apiClient.post(`/chat/${encodeURIComponent(sessionUuid)}/save-to-machine`, {
            machine_id: machineId
        })
    }
}
