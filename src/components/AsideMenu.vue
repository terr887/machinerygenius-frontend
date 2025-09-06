<template>
    <aside class="w-80 bg-white border-r border-gray-200 flex flex-col h-full overflow-y-auto">
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
import { ref } from "vue";

const garage = ref([
    "AI Help",
    "Visual Recognition",
    "Sell Machine",
    "Auctions",
    "Buy New",
    "3D Parts",
    "Training & Setup",
]);
</script>
