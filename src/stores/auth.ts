import { defineStore } from 'pinia'
import AuthService from '@/services/AuthService'
import type {
    AuthCredentials,
    RegisterPayload,
    ChangePasswordPayload,
    AuthUser
} from '@/services/AuthService'

const resolveErrorMessage = (error: any, fallback: string) => {
    const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        ''

    if (message) {
        return message
    }

    const errors = error?.response?.data?.errors
    if (errors && typeof errors === 'object') {
        const firstKey = Object.keys(errors)[0]
        if (firstKey) {
            const value = errors[firstKey]
            if (Array.isArray(value) && value.length) {
                return value[0]
            }
            if (typeof value === 'string') {
                return value
            }
        }
    }

    return fallback
}

const TOKEN_STORAGE_KEY = 'mg_token'
const USER_STORAGE_KEY = 'mg_user'

const loadStoredUser = (): AuthUser | null => {
    const raw = localStorage.getItem(USER_STORAGE_KEY)
    if (!raw) return null
    try {
        return JSON.parse(raw)
    } catch {
        return null
    }
}

const persistUser = (user: AuthUser | null) => {
    if (user) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
    } else {
        localStorage.removeItem(USER_STORAGE_KEY)
    }
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem(TOKEN_STORAGE_KEY) || '',
        user: loadStoredUser(),
        loading: false,
        error: '' as string | null
    }),
    getters: {
        isAuthenticated: (state) => Boolean(state.token),
        userFullName: (state) => {
            if (!state.user) return ''
            const fullName = [state.user.first_name, state.user.last_name]
                .filter(Boolean)
                .join(' ')
                .trim()
            return fullName || state.user.name || ''
        }
    },
    actions: {
        setAuth(token: string, user: AuthUser) {
            this.token = token
            this.user = user
            localStorage.setItem(TOKEN_STORAGE_KEY, token)
            persistUser(user)
        },
        clearAuth() {
            this.token = ''
            this.user = null
            localStorage.removeItem(TOKEN_STORAGE_KEY)
            persistUser(null)
        },
        async login(credentials: AuthCredentials) {
            this.loading = true
            this.error = null
            try {
                const { data } = await AuthService.login(credentials)
                const token = data?.token || data?.data?.token
                const user = data?.user || data?.data?.user
                if (token && user) {
                    this.setAuth(token, user)
                }
                return data
            } catch (error: any) {
                this.error = resolveErrorMessage(error, 'Unable to log in. Please try again.')
                throw error
            } finally {
                this.loading = false
            }
        },
        async register(payload: RegisterPayload) {
            this.loading = true
            this.error = null
            try {
                const { data } = await AuthService.register(payload)
                // Ensure any stale credentials are cleared so user must log in after activation.
                this.clearAuth()
                return data
            } catch (error: any) {
                this.error = resolveErrorMessage(error, 'Registration failed. Please try again.')
                throw error
            } finally {
                this.loading = false
            }
        },
        async fetchProfile() {
            if (!this.token) return null
            this.loading = true
            this.error = null
            try {
                const { data } = await AuthService.getProfile()
                this.user = data?.user || data
                if (this.user) {
                    persistUser(this.user)
                }
                return data
            } catch (error: any) {
                this.error = resolveErrorMessage(error, 'Unable to load profile.')
                // Token likely invalid
                this.clearAuth()
                return null
            } finally {
                this.loading = false
            }
        },
        async forgotPassword(email: string) {
            this.loading = true
            this.error = null
            try {
                const { data } = await AuthService.forgotPassword(email)
                return data
            } catch (error: any) {
                this.error = resolveErrorMessage(error, 'Unable to send reset link.')
                throw error
            } finally {
                this.loading = false
            }
        },
        async resetPassword(payload: { token: string; email: string; password: string; password_confirmation: string }) {
            this.loading = true
            this.error = null
            try {
                const { data } = await AuthService.resetPassword(payload)
                return data
            } catch (error: any) {
                this.error = resolveErrorMessage(error, 'Unable to reset password.')
                throw error
            } finally {
                this.loading = false
            }
        },
        async changePassword(payload: ChangePasswordPayload) {
            this.loading = true
            this.error = null
            try {
                const { data } = await AuthService.changePassword(payload)
                return data
            } catch (error: any) {
                this.error = resolveErrorMessage(error, 'Unable to change password.')
                throw error
            } finally {
                this.loading = false
            }
        },
        async verifyEmail(payload: { token: string; email: string }) {
            this.loading = true
            this.error = null
            try {
                const { data } = await AuthService.verifyEmail(payload)
                return data
            } catch (error: any) {
                this.error = resolveErrorMessage(error, 'Unable to verify email. The link may be invalid or expired.')
                throw error
            } finally {
                this.loading = false
            }
        },
        async verifyEmailLink(payload: { userId?: string; hash?: string; queryString?: string }) {
            this.loading = true
            this.error = null
            try {
                const { data } = await AuthService.verifyEmailLink(payload)
                return data
            } catch (error: any) {
                this.error = resolveErrorMessage(error, 'Unable to verify email. The link may be invalid or expired.')
                throw error
            } finally {
                this.loading = false
            }
        },
        async logout() {
            this.loading = true
            this.error = null
            try {
                if (this.token) {
                    await AuthService.logout()
                }
            } catch (error: any) {
                this.error = resolveErrorMessage(error, 'Unable to log out at the moment.')
                throw error
            } finally {
                this.clearAuth()
                this.loading = false
            }
        }
    }
})
