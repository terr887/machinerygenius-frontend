<template>
    <aside class="w-80 bg-white border-r border-gray-200 flex flex-col h-full">

        <!-- Header -->
        <div class="border-b border-gray-200 py-5 px-3">
            <h2 class="text-lg font-semibold text-gray-900 tracking-tight">
                Quick Navigation
            </h2>
        </div>
        <div class="p-1">

            <!-- Navigation -->
            <nav class="flex flex-col space-y-2">
                <a href="#" class="px-3 py-1 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition">
                    Home
                </a>
                <a href="#" class="px-3 py-1 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition">
                    About
                </a>
                <a href="#" class="px-3 py-1 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition">
                    Contact Us
                </a>
                <a href="#" class="px-3 py-1 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition">
                    Feedback
                </a>
                <a href="#" class="px-3 py-1 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition">
                    Privacy Policy
                </a>
            </nav>

            <div class="p-2 mt-3">
                <!-- Utility Card -->
                <div class="border border-blue-100 bg-blue-50 p-4 rounded-md">
                    <h3 class="font-semibold text-sm text-blue-900">
                        My Machine Garage™
                    </h3>
                    <p class="text-xs text-gray-600 mt-2 leading-relaxed">
                        Register your machine serials and model numbers to track manuals,
                        maintenance, and parts.
                    </p>
                </div>
            </div>

            <!-- Quick Actions -->
            <div class="mt-4">
                <div class="grid grid-cols-3 gap-4 text-center text-xs text-gray-700">
                    <div class="flex flex-col items-center hover:text-blue-600 transition" v-for="(title, i) in garage"
                        :key="i">
                        <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-2 shadow-sm">
                        </div>
                        {{ title }}
                    </div>
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
