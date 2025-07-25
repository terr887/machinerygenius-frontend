<template>
      <div class="flex h-screen font-sans">
    <Sidebar />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Sidebar from '@/components/Sidebar.vue'
</script>

<style scoped></style>
