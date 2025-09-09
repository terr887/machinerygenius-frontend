<template>
  <div class="flex h-screen font-sans relative">
    <!-- <FullScreenLoader /> -->

    <!-- Sidebar (desktop only) -->
    <Sidebar class="hidden xl:flex border-r border-gray-200" />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col relative">

      <!-- Mobile topbar with toggles -->
      <div class="flex items-center justify-between px-3 py-2 border-b border-gray-200 xl:hidden">
        <button @click="showSidebar = true" class="p-2 border border-gray-300 rounded-md">
          <!-- Sidebar icon -->
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3.75 5.25h16.5m-16.5 6.75h16.5m-16.5 6.75h16.5" />
          </svg>
        </button>

        <span class="font-semibold text-gray-700">Machinery Genius</span>

        <RouterLink to="/" class="p-2 border border-gray-300 rounded-md">
          <!-- New Chat icon -->
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
        </RouterLink>
      </div>

      <!-- Routed Content -->
      <RouterView class="flex-none lg:flex-1 overflow-y-visible lg:overflow-y-auto" />
    </div>

    <!-- Aside Menu (desktop only) -->
    <AsideMenu class="hidden xl:flex border-l border-gray-200" />

    <!-- 🔹 Common Overlay -->
    <transition name="fade">
      <div v-if="showSidebar || showAside" class="fixed inset-0 bg-black/60 z-40 xl:hidden" @click="closeAll"></div>
    </transition>

    <!-- Mobile Sidebar Drawer (slide from left) -->
    <transition name="slide-left">
      <div v-if="showSidebar"
        class="fixed left-0 top-0 w-72 h-full bg-white border-r border-gray-200 z-50 flex flex-col xl:hidden">
        <!-- Close button absolute -->
        <button @click="showSidebar = false"
          class="absolute top-3 -right-5 z-99 px-3 py-1 border border-gray-300 rounded-md text-gray-600 hover:text-gray-900">
          ✕
        </button>

        <MobileSidebar />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue"
import { RouterView } from "vue-router"
import Sidebar from "@/components/Sidebar.vue"
import FullScreenLoader from "@/components/FullScreenLoader.vue"
import AsideMenu from "./components/AsideMenu.vue"
import MobileSidebar from "./components/MobileSidebar.vue"

const showSidebar = ref(false)
const showAside = ref(false)

const closeAll = () => {
  showSidebar.value = false
  showAside.value = false
}

let mediaQuery: MediaQueryList

onMounted(() => {
  mediaQuery = window.matchMedia("(min-width: 1024px)") // lg breakpoint
  const handleResize = (e: MediaQueryListEvent | MediaQueryList) => {
    if (e.matches) {
      showSidebar.value = false
      showAside.value = false
    }
  }
  
  handleResize(mediaQuery)
  mediaQuery.addEventListener("change", handleResize)
})

onBeforeUnmount(() => {
  mediaQuery?.removeEventListener("change", () => { })
})
</script>

<style>
/* Fade overlay */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Slide from left */
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.3s ease;
}

.slide-left-enter-from {
  transform: translateX(-100%);
}

.slide-left-leave-to {
  transform: translateX(-100%);
}
</style>
