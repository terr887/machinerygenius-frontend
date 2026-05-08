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
const homeSectionTypes = Object.keys(componentMap)
const fallbackSections = [
  {
    id: 'fallback-hero',
    type: 'hero',
    data: {
      tags: ['AI Help 24/7', 'Visual Recognition', 'Predictive Maintenance', 'Parts & Service', 'Training & Setup'],
      cta_link: '/register',
      cta_text: "Join the Genius - It's Free",
      badge_text: '⚡ AI-Powered Machinery Technical Support',
      description: '<p>The first ASK AI assistant built only for machinery. Get verified specs, setup guidance, quick repair tips, and more, plus visual recognition, predictive maintenance, AR fit, parts, training, Machinery Garage TM and More.</p>',
      title_normal: 'Machinery Questions.',
      title_highlight: 'Genius Answers.',
    },
  },
  {
    id: 'fallback-features',
    type: 'features',
    data: {
      title: 'What Machinery Genius Can Do',
      items: [
        { title: 'AI Help 24/7', description: 'Ask any machine question: specs, dimensions, power, setup, or quick repair tips from trusted data.' },
        { title: 'Visual Recognition', description: 'Upload a photo to identify the machine or part, then surface its key specs and compatible components.' },
        { title: 'Predictive Maintenance', description: 'Use AI to read service history and forecast wear so you can prevent downtime.' },
        { title: 'AR "See It In My Warehouse"', description: 'Check fit and layout before you move or buy: plan doorways, aisles, and clearances.' },
        { title: 'My Machine Garage', description: 'Save your equipment, track maintenance, store serials, and get reminders in one dashboard.' },
        { title: 'Parts and Service', description: 'Find compatible mechanical, electrical, and hydraulic parts fast with trusted sources.' },
        { title: 'Repair Tech Finder', description: 'Get matched with verified technicians by brand and model for install, troubleshooting, and repairs.' },
        { title: '3D Printable Parts', description: 'Access validated 3D files for obsolete or custom components.' },
        { title: 'Training and Setup Help', description: 'Step-by-step guidance for controls, offsets, G-code basics, safe first runs, and better cycle times.' },
        { title: 'OEM Partner Support', description: 'Manufacturers can connect product data so customers get accurate answers through our partner program.' },
      ],
    },
  },
  {
    id: 'fallback-trusted-oems',
    type: 'trusted_oems',
    data: {
      title: 'Trusted by Leading OEMs and Dealers',
      subtitle: 'Machinery Genius works with manufacturers, importers, and dealers worldwide, bringing their data to your fingertips.',
      link_text: 'View All Trusted OEM Partners →',
      link_url: '/oem-partners',
      oems: [
        { name: 'Partner 1', placeholder_text: '--' },
        { name: 'Partner 2', placeholder_text: '--' },
        { name: 'Partner 3', placeholder_text: '--' },
        { name: 'Partner 4', placeholder_text: '--' },
        { name: 'Partner 5', placeholder_text: '--' },
        { name: 'Partner 6', placeholder_text: '--' },
      ],
    },
  },
  {
    id: 'fallback-cta',
    type: 'cta',
    data: {
      title: 'Experience the Full Power of Machinery Genius',
      subtitle: 'Ask questions, identify machines, plan layouts, and track maintenance - all in one place.',
      cta_text: 'Create My Free Account',
      cta_link: '/register',
    },
  },
]

const getComponent = (type) => {
  return componentMap[type] || null
}

const fetchSections = async () => {
  try {
    const res = await api.getHomeSections()
    if (res.data.success) {
      const cmsSections = Array.isArray(res.data.data) ? res.data.data : []
      sections.value = cmsSections.filter((section) => homeSectionTypes.includes(section.type))
    }
  } catch (error) {
    console.error('Failed to fetch home sections:', error)
  } finally {
    if (!sections.value.length) {
      sections.value = fallbackSections
    }
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
