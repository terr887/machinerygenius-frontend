<template>
  <div class="flex h-screen font-sans">
    <FullScreenLoader />
    <Sidebar />
    <RouterView />
    <AsideMenu />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Sidebar from '@/components/Sidebar.vue'
import FullScreenLoader from '@/components/FullScreenLoader.vue'
import AsideMenu from './components/AsideMenu.vue';
</script>

<style scoped></style>
