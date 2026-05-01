<template>
  <footer class="bg-gray-900 text-gray-300 text-center rounded-xl p-5 text-xs">
    <p>{{ data.copyright }}</p>
    <p class="mt-2" v-if="data.disclaimer">
      {{ data.disclaimer }}
      <template v-for="(link, index) in data.links" :key="index">
         | <RouterLink :to="link.url" class="text-blue-400 hover:underline ml-1">{{ link.label }}</RouterLink>
      </template>
    </p>
  </footer>
</template>

<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>
