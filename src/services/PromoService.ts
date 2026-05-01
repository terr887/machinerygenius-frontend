import { apiClient } from '@/services/ApiService'

export default {
    redeem(code: string) {
        return apiClient.post('/promo/redeem', { code })
    }
}
