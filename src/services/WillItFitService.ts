import { apiClient } from '@/services/ApiService'

export interface WillItFitPayload {
    machine_id?: number | null
    width_in: number
    depth_in: number
    height_in: number
    weight_lb?: number | null
}

export interface WillItFitRepresentation {
    status: boolean
    representation_type: 'exact_model' | 'size_box'
    model_url: string
    ios_model_url: string | null
    width_in: number
    depth_in: number
    height_in: number
    weight_lb: number | null
    dimensions_status: string | null
    floor_locked: boolean
    floor_alignment: 'geometry_y_zero' | 'bounding_box_bottom'
    expires_at: string | null
}

export default {
    create(payload: WillItFitPayload) {
        return apiClient.post<WillItFitRepresentation>('/will-it-fit/representation', payload)
    },
}
