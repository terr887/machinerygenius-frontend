<template>
  <div class="app-shell relative flex overflow-hidden font-sans">
    <!-- <FullScreenLoader /> -->

    <!-- Sidebar (desktop only) -->
    <Sidebar v-if="showLeftSidebar" class="hidden xl:flex border-r border-gray-200" />

    <!-- Main Content -->
    <div class="relative flex h-full min-w-0 flex-1 flex-col min-h-0">

      <!-- Top navbar — always visible for guest pages, mobile-only for auth pages -->
      <div
        v-if="showNavigation"
        class="site-topbar flex flex-shrink-0 items-center justify-between gap-2 border-b border-gray-100 bg-white px-4 shadow-sm"
        :class="showLeftSidebar ? 'xl:hidden py-0' : 'py-0'"
      >
        <!-- Left: sidebar toggle (mobile, all navigation pages) -->
        <button
          v-if="showMobileNav"
          @click="showSidebar = true"
          class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md border border-gray-300 xl:hidden"
          aria-label="Open menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.75 5.25h16.5m-16.5 6.75h16.5m-16.5 6.75h16.5" />
          </svg>
        </button>
        <!-- On guest desktop, spacer to balance the right side (topbar is xl:hidden for auth pages anyway) -->
        <span v-if="showMobileNav && !showLeftSidebar" class="w-24 flex-shrink-0 hidden xl:block" aria-hidden="true"></span>

        <!-- Center: logo + name -->
        <RouterLink to="/" class="flex items-center gap-2 min-w-0 flex-1 justify-center xl:flex-none">
          <img
            src="/assets/images/logo.png"
            alt="Machinery Genius"
            class="object-contain flex-shrink-0"
            :class="showLeftSidebar ? 'h-20 w-20' : 'h-20 w-20 xl:h-[100px] xl:w-[100px]'"
          />
          <span class="truncate font-semibold text-gray-800" :class="showLeftSidebar ? 'hidden sm:inline text-sm' : 'text-sm xl:text-base'">
            Machinery Genius
          </span>
        </RouterLink>

        <!-- Right: new-chat icon for auth pages (mobile only, desktop handled by sidebar) -->
        <RouterLink
          v-if="showLeftSidebar"
          to="/app"
          class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md border border-gray-300 xl:hidden"
          aria-label="New chat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
        </RouterLink>
        <!-- Guest pages: balancing spacer so logo stays centred -->
        <span v-else class="w-24 flex-shrink-0 hidden xl:block" aria-hidden="true"></span>
      </div>

    <!-- Routed Content -->
    <div id="main-content" :class="routedContentClasses">
      <RouterView v-slot="{ Component, route: viewRoute }">
          <template v-if="isPopup">
            <!-- Background: last non-popup view -->
            <component :is="backgroundComponent" :key="backgroundKey"
              class="flex-none lg:flex-1 min-h-full overflow-y-visible lg:overflow-y-auto" />

            <!-- Overlay popup wrapper -->
            <div class="fixed inset-0 z-[200]">
              <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" />
              <div class="absolute inset-0 flex items-center justify-center px-4 py-8 overflow-y-auto">
                <div class="w-full max-w-5xl max-h-[90vh] overflow-y-auto relative z-[201]">
                  <component :is="Component" :key="viewRoute.fullPath" />
                </div>
              </div>
            </div>
          </template>

          <component v-else :is="Component" :key="viewRoute.fullPath" :class="routedViewClasses" />
        </RouterView>

        <SiteFooter v-if="showFooter" />
      </div>
    </div>

    <!-- Aside Menu (desktop only) -->
    <AsideMenu v-if="showNavigation" class="hidden xl:flex border-l border-gray-200" />

    <!-- 🔹 Common Overlay -->
    <transition name="fade">
      <div v-if="showNavigation && (showSidebar || showAside)" class="fixed inset-0 bg-black/60 z-40 xl:hidden" @click="closeAll"></div>
    </transition>

    <!-- Mobile Sidebar Drawer (slide from left) -->
    <transition name="slide-left">
      <div v-if="showMobileNav && showSidebar"
        class="mobile-drawer fixed left-0 top-0 z-50 flex w-72 flex-col border-r border-gray-200 bg-white xl:hidden h-full overflow-y-auto">
        <!-- Close button absolute -->
        <button @click="showSidebar = false"
          class="absolute top-3 right-3 z-50 flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 shadow-sm hover:text-gray-900">
          ✕
        </button>

        <MobileSidebar />
      </div>
    </transition>

    <ToastContainer />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed, shallowRef, watch } from "vue"
import { RouterView, useRoute } from "vue-router"
import Sidebar from "@/components/Sidebar.vue"
import FullScreenLoader from "@/components/FullScreenLoader.vue"
import AsideMenu from "./components/AsideMenu.vue"
import MobileSidebar from "./components/MobileSidebar.vue"
import HomeView from "@/views/HomeView.vue"
import ToastContainer from "@/components/common/toastcontainer.vue"
import SiteFooter from "@/components/SiteFooter.vue"

const showSidebar = ref(false)
const showAside = ref(false)
const route = useRoute()
const showNavigation = computed(() => !route.meta?.hideSidebar && !route.meta?.popup)
const showLeftSidebar = computed(() => showNavigation.value && route.meta?.requiresAuth)
const showMobileNav = computed(() => showNavigation.value)
const isPopup = computed(() => Boolean(route.meta?.popup))
const isChatLayout = computed(() => Boolean(route.meta?.chatLayout))
const routedContentClasses = computed(() => [
  'relative flex-1 h-full min-h-0',
  isChatLayout.value ? 'overflow-hidden' : 'overflow-y-auto',
])
const routedViewClasses = computed(() => {
  return isChatLayout.value
    ? 'flex-1 min-h-0 h-full overflow-hidden'
    : 'flex-none lg:flex-1 min-h-full overflow-y-visible lg:overflow-y-auto'
})
// Both sidebars render together whenever showLeftSidebar is true (it already
// implies showNavigation, which is what gates AsideMenu) — pages that dense
// don't need a footer competing for space underneath the routed content.
const showFooter = computed(() => !isChatLayout.value && !isPopup.value && !showLeftSidebar.value && !route.meta?.hideFooter)
const backgroundView = shallowRef<{ Component: any, route: any } | null>(null)
const backgroundComponent = computed(() => backgroundView.value?.Component || HomeView)
const backgroundKey = computed(() => backgroundView.value?.route.fullPath || 'popup-background-fallback')

// Track the last non-popup route so we can show it behind overlays
watch(
  () => route.fullPath,
  () => {
    if (!showLeftSidebar.value) {
      showSidebar.value = false
    }
    if (!route.meta?.popup) {
      backgroundView.value = {
        Component: route.matched[route.matched.length - 1]?.components?.default,
        route: { ...route }
      }
    }
  },
  { immediate: true }
)

// Prevent body scroll when popup is active
watch(isPopup, (val) => {
  document.body.style.overflow = val ? 'hidden' : ''
})

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

<style scoped>
.app-shell {
  height: 100vh;
  min-height: 100vh;
  width: 100%;
}

@media (max-width: 640px) {
  .mobile-logo-text {
    display: none !important;
  }
}

@supports (height: 100dvh) {
  .app-shell {
    height: 100dvh;
    min-height: 100dvh;
  }
}

@supports (height: 100svh) {
  .app-shell {
    min-height: 100svh;
  }
}

.site-topbar {
  padding-top: env(safe-area-inset-top);
}

.mobile-drawer {
  height: 100vh;
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
}

@supports (height: 100dvh) {
  .mobile-drawer {
    height: 100dvh;
  }
}
</style>

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
