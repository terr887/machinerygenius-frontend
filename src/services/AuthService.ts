import { apiClient } from '@/services/ApiService'

export interface AuthCredentials {
    email: string
    password: string
}

export interface RegisterPayload {
    first_name: string
    last_name: string
    email: string
    company_name?: string
    password: string
    password_confirmation: string
}

export interface ChangePasswordPayload {
    current_password: string
    password: string
    password_confirmation: string
}

export interface AuthUser {
    id?: number | string
    first_name?: string
    last_name?: string
    name?: string
    email: string
    company_name?: string
    company?: string
    role?: string
    enabled?: boolean
    created_at?: string
    updated_at?: string
}

export default {
    login(payload: AuthCredentials) {
        return apiClient.post('/login', payload)
    },
    register(payload: RegisterPayload) {
        return apiClient.post('/register', payload)
    },
    forgotPassword(email: string) {
        return apiClient.post('/password/forgot', { email })
    },
    resetPassword(payload: { token: string; email: string; password: string; password_confirmation: string }) {
        return apiClient.post('/password/reset', payload)
    },
    changePassword(payload: ChangePasswordPayload) {
        return apiClient.post('/password/change', payload)
    },
    verifyEmail(payload: { token: string; email: string }) {
        return apiClient.post('/email/verify', payload)
    },
    verifyEmailLink(payload: { userId?: string; hash?: string; queryString?: string }) {
        const pathSegments = [payload.userId, payload.hash]
            .filter((value): value is string => Boolean(value && value.trim()))
            .map((segment) => encodeURIComponent(segment))
        const pathSuffix = pathSegments.length ? `/${pathSegments.join('/')}` : ''
        const search = payload.queryString ? (payload.queryString.startsWith('?') ? payload.queryString : `?${payload.queryString}`) : ''
        return apiClient.get(`/email/verify${pathSuffix}${search}`)
    },
    getProfile() {
        return apiClient.get('/me')
    },
    logout() {
        return apiClient.post('/logout')
    }
}
