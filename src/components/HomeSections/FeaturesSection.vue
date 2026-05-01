<template>
  <section class="mb-6">
    <h2 class="text-center text-lg font-bold text-gray-900 mb-4">{{ data.title }}</h2>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      <article v-for="(item, index) in data.items" :key="index" class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex gap-4 items-start">
        <div class="p-2 rounded-lg bg-blue-100 text-blue-600 flex-shrink-0 w-9 h-9 flex items-center justify-center content-center" v-html="item.icon_svg">
        </div>
        <div>
          <h3 class="text-sm font-bold text-gray-900 mb-1">{{ item.title }}</h3>
          <div class="text-xs text-gray-600" v-html="item.description"></div>
        </div>
      </article>
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

<style scoped>
:deep(svg) {
  width: 100%;
  height: 100%;
}
</style>
