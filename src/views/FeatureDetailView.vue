<template>
  <main class="max-w-6xl mx-auto px-4 py-6">
    <div v-if="loading" class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>

    <template v-else-if="feature">
      <section class="bg-gradient-to-br from-blue-50 via-white to-amber-50 border border-gray-200 rounded-2xl p-6 mb-6">
        <RouterLink to="/" class="text-sm font-semibold text-blue-700 hover:underline">
          Back to Home
        </RouterLink>
        <div class="mt-5 grid gap-6 lg:grid-cols-[1.4fr_0.8fr] lg:items-end">
          <div>
            <p class="text-xs font-bold uppercase tracking-wide text-blue-700">{{ feature.eyebrow }}</p>
            <h1 class="mt-2 text-3xl font-bold text-gray-900">{{ feature.title }}</h1>
            <p class="mt-3 text-base text-gray-700 leading-relaxed">{{ feature.summary }}</p>
          </div>
          <div class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <div class="text-sm text-gray-700 leading-relaxed" v-html="feature.hero"></div>
            <RouterLink :to="feature.ctaLink" class="inline-flex mt-4 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
              {{ feature.ctaText }}
            </RouterLink>
          </div>
        </div>
      </section>

      <section class="grid gap-6 lg:grid-cols-2">
        <article class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h2 class="text-lg font-bold text-gray-900 mb-4">What This Helps With</h2>
          <ul class="space-y-3">
            <li v-for="point in feature.points" :key="point" class="flex gap-3 text-sm text-gray-700">
              <span class="mt-1 h-2 w-2 rounded-full bg-blue-600 flex-shrink-0" aria-hidden="true"></span>
              <span>{{ point }}</span>
            </li>
          </ul>
        </article>

        <article class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h2 class="text-lg font-bold text-gray-900 mb-4">Typical Workflow</h2>
          <ol class="space-y-3">
            <li v-for="(step, index) in feature.workflows" :key="step" class="flex gap-3 text-sm text-gray-700">
              <span class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                {{ index + 1 }}
              </span>
              <span>{{ step }}</span>
            </li>
          </ol>
        </article>
      </section>

      <section class="mt-6 bg-gray-900 text-white rounded-2xl p-6">
        <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 class="text-xl font-bold">Ready to use {{ feature.title }}?</h2>
            <p class="mt-1 text-sm text-gray-300">Start with the machine details you have and add photos, serials, or symptoms when useful.</p>
          </div>
          <RouterLink :to="feature.ctaLink" class="inline-flex w-fit px-4 py-2 text-sm font-semibold text-blue-700 bg-white rounded-lg hover:bg-gray-100 transition">
            {{ feature.ctaText }}
          </RouterLink>
        </div>
      </section>
    </template>

    <section v-else class="bg-white border border-gray-200 rounded-2xl p-8 text-center">
      <h1 class="text-2xl font-bold text-gray-900">Feature not found</h1>
      <p class="mt-2 text-sm text-gray-600">The feature page you requested is not available.</p>
      <RouterLink to="/" class="inline-flex mt-4 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
        Back to Home
      </RouterLink>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useServices } from '@/services/container'
import {
  getFeaturePageBySlug,
  getFeaturePageFromHomeSections,
  type FeaturePage,
} from '@/services/FeaturePageService'

const route = useRoute()
const { api } = useServices()
const cmsFeature = ref<FeaturePage | undefined>()
const loading = ref(false)

const slug = computed(() => {
  const routeSlug = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug

  return routeSlug || ''
})

const feature = computed(() => {
  return cmsFeature.value || getFeaturePageBySlug(slug.value)
})

const fetchFeature = async () => {
  cmsFeature.value = undefined

  if (!slug.value) {
    return
  }

  loading.value = true

  try {
    const response = await api.getHomeSections()
    const sections = Array.isArray(response.data?.data) ? response.data.data : []
    cmsFeature.value = getFeaturePageFromHomeSections(sections, slug.value)
  } catch (error) {
    console.error('Failed to fetch feature page:', error)
  } finally {
    loading.value = false
  }
}

watch(slug, fetchFeature, { immediate: true })
</script>
