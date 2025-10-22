<template>
    <aside class="w-80 bg-white border-r border-gray-200 flex flex-col h-full">

        <!-- Brand Header (centered logo only) -->
        <div class="flex items-center justify-center p-4 border-b border-gray-200 bg-white z-10">
            <RouterLink to="/" aria-label="Go to homepage" class="block">
                <img src="/assets/images/logo.png" alt="Machinery Genius Logo" class="h-20 w-auto" loading="lazy" />
            </RouterLink>
        </div>

        <!-- New Chat (sticky) -->
        <div class="p-2 border-b border-gray-200 sticky top-[64px] bg-white z-10">
            <RouterLink to="/"
                class="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-100 transition"
                aria-label="Start a new chat">
                <!-- Plus icon -->
                <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                <span>New Chat</span>
            </RouterLink>
        </div>

        <!-- Scrollable body -->
        <div class="flex-1 overflow-y-auto">

            <!-- Quick Navigation -->
            <div class="px-3 py-4">
                <h2 class="uppercase text-xs font-semibold text-gray-500 tracking-wide mb-3">Navigation</h2>
                <nav class="flex flex-col space-y-1">
                    <RouterLink to="/" class="px-3 py-2 rounded-md transition" active-class="bg-blue-100 text-blue-700">
                        Home
                    </RouterLink>

                    <RouterLink to="/about" class="px-3 py-2 rounded-md transition"
                        active-class="bg-blue-100 text-blue-700">
                        About
                    </RouterLink>

                    <RouterLink to="/contact" class="px-3 py-2 rounded-md transition"
                        active-class="bg-blue-100 text-blue-700">
                        Contact Us
                    </RouterLink>

                    <RouterLink to="/feedback" class="px-3 py-2 rounded-md transition"
                        active-class="bg-blue-100 text-blue-700">
                        Feedback
                    </RouterLink>

                    <RouterLink :to="{ name: 'oem-partners-acra' }" class="px-3 py-2 rounded-md transition"
                        active-class="bg-blue-100 text-blue-700">
                        OEM Manufactures
                    </RouterLink>

                    <RouterLink :to="{ name: 'oem-supplier-form' }" class="px-3 py-2 rounded-md transition"
                        active-class="bg-blue-100 text-blue-700">
                        Manufacturer Signup
                    </RouterLink>

                    <RouterLink :to="{ name: 'privacy-policy' }" class="px-3 py-2 rounded-md transition"
                        active-class="bg-blue-100 text-blue-700">
                        Privacy Policy
                    </RouterLink>
                </nav>
            </div>

            <!-- Utility Card -->
            <div class="px-3 py-4">
                <div class="border border-blue-100 bg-blue-50 p-4 rounded-lg">
                    <h3 class="font-semibold text-sm text-blue-900">My Machine Garage™</h3>
                    <p class="text-xs text-gray-600 mt-2 leading-relaxed">
                        Register your machine serials and model numbers to track manuals,
                        maintenance, and parts.
                    </p>
                </div>
            </div>

            <!-- Quick Actions -->
            <div class="px-3 py-4">
                <h2 class="uppercase text-xs font-semibold text-gray-500 tracking-wide mb-3">Quick Actions</h2>
                <div class="grid grid-cols-3 gap-4 text-center text-xs text-gray-700">
                    <div v-for="(title, i) in garage" :key="i"
                        class="flex flex-col items-center cursor-pointer hover:text-blue-600 transition">
                        <div
                            class="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center mb-2 text-gray-500">
                            <!-- Placeholder for icons -->
                            <span class="text-xs">🔧</span>
                        </div>
                        {{ title }}
                    </div>
                </div>
            </div>

            <!-- Chat Sessions -->
            <div class="px-3 py-4">
                <h2 class="uppercase text-xs font-semibold text-gray-500 tracking-wide mb-3">Chats</h2>
                <div v-for="session in sessions" :key="session.uuid" class="rounded-md transition cursor-pointer"
                    :class="isActive(session.uuid)
                        ? 'bg-blue-50 text-blue-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'">
                    <RouterLink :to="{ name: 'chat-session', params: { session: session.uuid } }"
                        class="block truncate px-3 py-2">
                        <span v-if="session.isNew" class="typing-title">{{ session.title }}</span>
                        <span v-else>{{ session.title || 'Untitled Chat' }}</span>
                    </RouterLink>
                </div>
            </div>

        </div>
    </aside>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { useRoute } from "vue-router"
import { useSessionStore } from "@/stores/session"

const garage = ref([
    "AI Help",
    "Visual Recognition",
    "Sell Machine",
    "Auctions",
    "Buy New",
    "3D Parts",
    "Training & Setup",
])

const route = useRoute()
const sessionStore = useSessionStore()
const sessions = computed(() => sessionStore.sessions)

const isActive = (id: string) => route.params.session === id
</script>

<style scoped>
.typing-title::after {
    content: "|";
    margin-left: 2px;
    color: #3b82f6;
    animation: blink 1s infinite;
}

@keyframes blink {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0;
    }
}
</style>
