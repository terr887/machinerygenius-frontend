<template>
  <section class="mb-6">
    <h2 class="text-center text-lg font-bold text-gray-900 mb-4">{{ data.title }}</h2>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      <RouterLink
        v-for="(item, index) in data.items"
        :key="index"
        :to="featureLink(item)"
        class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex gap-4 items-start transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <div v-if="item.icon_svg" class="p-2 rounded-lg bg-blue-100 text-blue-600 flex-shrink-0 w-9 h-9 flex items-center justify-center content-center" v-html="item.icon_svg">
        </div>
        <div v-else class="p-2 rounded-lg bg-blue-100 text-blue-600 flex-shrink-0 w-9 h-9 flex items-center justify-center content-center text-xs font-bold">
          {{ item.title?.charAt(0) || 'M' }}
        </div>
        <div>
          <h3 class="text-sm font-bold text-gray-900 mb-1">{{ item.title }}</h3>
          <div class="text-xs text-gray-600" v-html="item.description"></div>
        </div>
      </RouterLink>
    </div>
  </section>
</template>

<script setup>
import { featurePathForTitle } from '@/services/FeaturePageService'

defineProps({
  data: {
    type: Object,
    required: true
  }
})

const featureLink = (item) => {
  return item?.link || item?.link_url || item?.url || featurePathForTitle(item?.title)
}
</script>

<style scoped>
:deep(svg) {
  width: 100%;
  height: 100%;
}
</style>
