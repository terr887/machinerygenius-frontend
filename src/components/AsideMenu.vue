<template>
    <aside class="w-80 bg-white border-r border-gray-200 flex flex-col h-full overflow-y-auto">
        <!-- Quick Navigation -->
        <div class="px-3 py-4">
            <h2 class="uppercase text-xs font-semibold text-gray-500 tracking-wide mb-3">Navigation</h2>
            <nav class="flex flex-col space-y-1">
                <RouterLink :to="{ name: 'home' }" class="px-3 py-2 rounded-md transition" active-class="bg-blue-100 text-blue-700">
                    Home
                </RouterLink>
                <RouterLink to="/features" class="px-3 py-2 rounded-md transition"
                    active-class="bg-blue-100 text-blue-700">
                    Features
                </RouterLink>
                 <RouterLink to="/lathes" class="px-3 py-2 rounded-md transition"
                    active-class="bg-blue-100 text-blue-700">
                    Lathes
                </RouterLink>

                <div class="rounded-md">
                    <button type="button" @click="categoriesOpen = !categoriesOpen"
                        class="flex w-full items-center justify-between rounded-md px-3 py-2 text-left transition hover:bg-gray-100"
                        :class="isMachineCategoryRoute ? 'bg-blue-100 text-blue-700' : 'text-gray-700'">
                        <span>Machine Categories</span>
                        <span class="text-xs" aria-hidden="true">{{ categoriesOpen ? '^' : 'v' }}</span>
                    </button>

                    <div v-if="categoriesOpen" class="mt-1 space-y-1 border-l border-gray-200 pl-3">
                        <RouterLink v-for="category in popularCategories" :key="category.id" :to="category.path"
                            class="block rounded-md px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-100 hover:text-blue-700"
                            active-class="bg-blue-50 text-blue-700">
                            {{ category.title }}
                        </RouterLink>

                        <RouterLink to="/machine-categories"
                            class="block rounded-md px-3 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
                            active-class="bg-blue-50">
                            More Machines ....
                        </RouterLink>
                    </div>
                </div>

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

                <RouterLink v-if="!isAuthed" to="/login" class="px-3 py-2 rounded-md transition"
                    active-class="bg-blue-100 text-blue-700">
                    Login
                </RouterLink>

                <RouterLink v-if="!isAuthed" to="/register" class="px-3 py-2 rounded-md transition"
                    active-class="bg-blue-100 text-blue-700">
                    Register
                </RouterLink>

                <RouterLink v-else to="/account" class="px-3 py-2 rounded-md transition"
                    active-class="bg-blue-100 text-blue-700">
                    My Account
                </RouterLink>

                <RouterLink v-if="isAuthed" to="/change-password" class="px-3 py-2 rounded-md transition"
                    active-class="bg-blue-100 text-blue-700">
                    Change Password
                </RouterLink>

                <div class="px-3 flex flex-col items-left gap-2">
                    <!-- logos row -->
                    <div class="flex items-center justify-left gap-3">
                        <RouterLink :to="{ name: 'oem-partners-acra' }" class="transition hover:opacity-80"
                            active-class="opacity-100">
                            <img src="/assets/images/acra.png" alt="Acra Logo" class="h-8 w-auto" loading="lazy" />
                        </RouterLink>

                        <RouterLink :to="{ name: 'oem-partners-paramigiani' }" class="transition hover:opacity-80"
                            active-class="opacity-100">
                            <img src="/assets/images/paramigiani.png" alt="Paramigiani Logo" class="h-8 w-auto"
                                loading="lazy" />
                        </RouterLink>
                    </div>

                    <!-- single text below both -->
                    <span class="text-xs text-gray-600">OEM Manufactures</span>
                </div>

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
    </aside>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import {
    getMachineCategoryPages,
    type MachineCategoryPage,
} from "@/services/MachineCategoryPageService";

const garage = ref([
    "AI Help",
    "Visual Recognition",
    "Sell Machine",
    "Auctions",
    "Buy New",
    "3D Parts",
    "Training & Setup",
]);

const authStore = useAuthStore()
const isAuthed = computed(() => authStore.isAuthenticated)
const route = useRoute()
const machineCategories = ref<MachineCategoryPage[]>([])
const categoriesOpen = ref(false)
const isMachineCategoryRoute = computed(() => route.path.startsWith("/machine-categories"))
const popularCategories = computed(() => machineCategories.value.slice(0, 6))

const fetchMachineCategories = async () => {
    try {
        machineCategories.value = await getMachineCategoryPages()
    } catch (error) {
        console.error("Failed to fetch machine category pages:", error)
    }
}

watch(isMachineCategoryRoute, (active) => {
    if (active) {
        categoriesOpen.value = true
    }
}, { immediate: true })

onMounted(fetchMachineCategories)
</script>
