<template>
  <section class="text-center mb-6">
    <h2 class="text-lg font-bold text-gray-900 mb-2">{{ data.title }}</h2>
    <div class="text-sm text-gray-600 mb-5 max-w-2xl mx-auto" v-html="data.subtitle">
    </div>
    <div class="flex flex-wrap gap-6 justify-center items-center">
      <template v-for="(oem, index) in data.oems" :key="index">
        <img v-if="oem.logo" :src="getLogoUrl(oem.logo)" :alt="oem.name" class="h-12 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
        <span v-else class="text-xs text-gray-400 font-medium">{{ oem.placeholder_text }}</span>
      </template>
    </div>
    <RouterLink v-if="data.link_url" :to="data.link_url" class="text-sm font-bold text-blue-600 hover:underline mt-4 inline-block">
      {{ data.link_text }}
    </RouterLink>
  </section>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const getLogoUrl = (path) => {
  if (path.startsWith('http')) return path
  const apiBase = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || 'http://127.0.0.1:8000'
  return `${apiBase}/storage/${path}`
}
</script>
