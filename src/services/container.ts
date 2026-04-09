import type { App, InjectionKey, Plugin } from 'vue'
import { inject } from 'vue'
import api from '@/services/ApiService'
import auth from '@/services/AuthService'
import machine from '@/services/MachineService'
import billing from '@/services/BillingService'
import promo from '@/services/PromoService'

export interface ServiceContainer {
    api: typeof api
    auth: typeof auth
    machine: typeof machine
    billing: typeof billing
    promo: typeof promo
}

export const services: ServiceContainer = Object.freeze({
    api,
    auth,
    machine,
    billing,
    promo
})

export const ServiceContainerKey: InjectionKey<ServiceContainer> = Symbol('ServiceContainer')

export const ServiceContainerPlugin: Plugin = {
    install(app: App) {
        app.provide(ServiceContainerKey, services)
        app.config.globalProperties.$services = services
    }
}

export function useServices(): ServiceContainer {
    const injected = inject(ServiceContainerKey, null)
    return injected ?? services
}

export function getServices(): ServiceContainer {
    return services
}

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $services: ServiceContainer
    }
}
