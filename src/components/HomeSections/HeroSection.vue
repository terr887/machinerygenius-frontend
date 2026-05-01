<template>
  <section class="bg-gradient-to-br from-blue-50 via-white to-amber-50 border border-gray-200 rounded-2xl p-6 mb-6">
    <div class="flex flex-col md:flex-row items-center justify-between gap-6">
      <div class="flex-1">
        <span v-if="data.badge_text" class="inline-flex items-center gap-2 border border-gray-200 rounded-full px-3 py-1 text-xs text-gray-600 bg-white">
          <span aria-hidden="true" v-if="data.badge_text.includes('⚡')">⚡</span>
          <span>{{ data.badge_text.replace('⚡', '').trim() }}</span>
        </span>
        <h1 class="text-3xl font-bold text-gray-900 mt-4 mb-3">
          {{ data.title_normal }} <span class="text-blue-600">{{ data.title_highlight }}</span>
        </h1>
        <p class="text-gray-600 max-w-3xl" v-html="data.description"></p>

        <div v-if="data.tags && data.tags.length" class="flex flex-wrap gap-2 mt-4">
          <span v-for="tag in data.tags" :key="tag" class="border border-gray-200 rounded-full px-3 py-1 text-xs text-gray-600 bg-white cursor-pointer hover:border-blue-400">
            {{ tag }}
          </span>
        </div>

        <div v-if="data.cta_text && data.cta_link" class="flex gap-2 mt-5">
          <RouterLink :to="data.cta_link" class="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
            {{ data.cta_text }}
          </RouterLink>
        </div>
      </div>
      <img src="/assets/machinery-genius.png" alt="Machinery Genius" class="w-32 h-32 object-contain flex-shrink-0 hidden md:block" />
    </div>
  </section>
</template>

<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>
