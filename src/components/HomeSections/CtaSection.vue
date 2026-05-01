<template>
  <section class="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center rounded-xl p-6 mb-6">
    <h3 class="text-lg font-bold">{{ data.title }}</h3>
    <div class="text-sm opacity-90 mt-1" v-html="data.subtitle"></div>
    <RouterLink v-if="data.cta_link" :to="data.cta_link" class="inline-block mt-4 px-4 py-2 text-sm font-semibold text-blue-600 bg-white rounded-lg hover:bg-gray-100 transition">
      {{ data.cta_text }}
    </RouterLink>
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
