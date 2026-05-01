<template>
<div class="max-w-6xl mx-auto px-4 py-6">
  <div v-if="loading" class="flex justify-center items-center py-20">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>

  <template v-else-if="sections.length">
    <component
      v-for="section in sections"
      :key="section.id"
      :is="getComponent(section.type)"
      :data="section.data"
    />
  </template>

  <!-- Fallback if no sections are found or error occurred -->
  <div v-else-if="!loading && !sections.length" class="text-center py-20 bg-white border border-gray-200 rounded-2xl mb-6">
    <img src="/assets/machinery-genius.png" alt="Machinery Genius" class="w-32 h-32 object-contain mx-auto mb-4" />
    <h2 class="text-xl font-bold text-gray-900">Welcome to Machinery Genius</h2>
    <p class="text-gray-600 mt-2">Setting things up for you. Please check back in a moment.</p>
    <RouterLink to="/register" class="inline-block mt-4 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">Join the Genius - It's Free</RouterLink>
  </div>


  <!-- Static Footer -->
  <footer class="bg-gray-900 text-gray-300 text-center rounded-xl p-5 text-xs">
    <p>© 2025 Machinery Genius LLC.</p>
    <p class="mt-2">
      All information is provided for reference. Always verify critical details with the original manufacturer.
      <a href="/disclaimer.html" class="text-blue-400 hover:underline ml-1">Disclaimer</a>
    </p>
  </footer>
</div>
</template>

<script setup>
import { ref, onMounted, markRaw } from 'vue'
import { useServices } from '@/services/container'

// Import dynamic components
import HeroSection from '@/components/HomeSections/HeroSection.vue'
import FeaturesSection from '@/components/HomeSections/FeaturesSection.vue'
import CtaSection from '@/components/HomeSections/CtaSection.vue'
import TrustedOemsSection from '@/components/HomeSections/TrustedOemsSection.vue'

const { api } = useServices()
const sections = ref([])
const loading = ref(true)

const componentMap = {
  hero: markRaw(HeroSection),
  features: markRaw(FeaturesSection),
  cta: markRaw(CtaSection),
  trusted_oems: markRaw(TrustedOemsSection),
}

const getComponent = (type) => {
  return componentMap[type] || null
}

const fetchSections = async () => {
  try {
    const res = await api.getHomeSections()
    if (res.data.success) {
      sections.value = res.data.data
    }
  } catch (error) {
    console.error('Failed to fetch home sections:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchSections()
})
</script>

<style scoped>
/* No custom CSS - using Tailwind only */
</style>

