import { apiClient } from '@/services/ApiService'

export interface Machine {
    id: number
    user_id: number
    brand: string
    model: string
    nickname: string | null
    serial: string | null
    year: number | null
    location: string | null
    tier_access: string | null
    qr_uuid: string | null
    manuals?: ManualSummary[]
    photos?: MachinePhoto[]
    notes?: MachineNote[]
    maintenance_logs?: MachineMaintenanceLog[]
    created_at?: string
    updated_at?: string
}

export interface MachinePayload {
    brand: string
    model: string
    nickname?: string
    serial?: string
    year?: number | null
    location?: string
}

export interface ManualSummary {
    id: number
    uuid: string
    title: string | null
    machine_name: string | null
    model_no: string | null
}

export interface MachinePhoto {
    id: number
    machine_id: number
    path: string
    caption: string | null
    is_primary: boolean
    url: string
}

export interface MachineNote {
    id: number
    machine_id: number
    user_id: number
    body: string
    created_at?: string
}

export interface MachineMaintenanceLog {
    id: number
    machine_id: number
    type: string
    performed_at: string
    notes: string | null
    next_due_at: string | null
}

export interface ChatSessionSummary {
    uuid: string
    title: string | null
    is_saved_to_machine: boolean
    created_at?: string
}

export default {
    list() {
        return apiClient.get<{ status: boolean; machines: Machine[] }>('/machines')
    },

    get(id: number | string) {
        return apiClient.get<{ status: boolean; machine: Machine }>(`/machines/${id}`)
    },

    create(payload: MachinePayload) {
        return apiClient.post<{ status: boolean; message: string; machine: Machine }>('/machines', payload)
    },

    update(id: number | string, payload: Partial<MachinePayload>) {
        return apiClient.put<{ status: boolean; message: string; machine: Machine }>(`/machines/${id}`, payload)
    },

    remove(id: number | string) {
        return apiClient.delete<{ status: boolean; message: string }>(`/machines/${id}`)
    },

    saveChatToMachine(sessionUuid: string, machineId: number) {
        return apiClient.post(`/chat/${encodeURIComponent(sessionUuid)}/save-to-machine`, {
            machine_id: machineId
        })
    },

    chatSessions(id: number | string) {
        return apiClient.get<{ status: boolean; chats: ChatSessionSummary[] }>(`/machines/${id}/chats`)
    },

    attachManual(id: number | string, manualId: number) {
        return apiClient.post<{ status: boolean; message: string; manuals: ManualSummary[] }>(
            `/machines/${id}/manuals`,
            { manual_id: manualId }
        )
    },

    detachManual(id: number | string, manualId: number) {
        return apiClient.delete<{ status: boolean; message: string; manuals: ManualSummary[] }>(
            `/machines/${id}/manuals/${manualId}`
        )
    },

    searchManuals(query: string) {
        return apiClient.get<{ status: boolean; manuals: { data: ManualSummary[] } }>('/manuals/search', {
            params: { q: query }
        })
    },

    uploadPhoto(id: number | string, file: File, options: { caption?: string; isPrimary?: boolean } = {}) {
        const formData = new FormData()
        formData.append('photo', file)
        if (options.caption) {
            formData.append('caption', options.caption)
        }
        if (options.isPrimary) {
            formData.append('is_primary', '1')
        }

        return apiClient.post<{ status: boolean; message: string; photo: MachinePhoto }>(
            `/machines/${id}/photos`,
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
        )
    },

    deletePhoto(id: number | string, photoId: number) {
        return apiClient.delete<{ status: boolean; message: string }>(`/machines/${id}/photos/${photoId}`)
    },

    addNote(id: number | string, body: string) {
        return apiClient.post<{ status: boolean; message: string; note: MachineNote }>(
            `/machines/${id}/notes`,
            { body }
        )
    },

    logMaintenance(id: number | string, payload: { type: string; performed_at: string; notes?: string; next_due_at?: string }) {
        return apiClient.post<{ status: boolean; message: string; maintenance_log: MachineMaintenanceLog }>(
            `/machines/${id}/maintenance-logs`,
            payload
        )
    },

    qrCode(id: number | string) {
        return apiClient.get<string>(`/machines/${id}/qr-code`, { responseType: 'text' })
    }
}
