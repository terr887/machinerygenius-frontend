<template>
  <main class="mg-page">
    <div class="mg-container-wide">
      <section class="mg-hero mb-6">
        <div class="flex items-center justify-between gap-6">
          <div class="flex-1">
            <p class="text-xs font-semibold uppercase tracking-wide text-blue-700">Manufacturers</p>
            <h1 class="mt-2 text-3xl font-bold text-gray-900">Manufacturers</h1>
            <p class="mt-3 max-w-3xl text-sm leading-6 text-gray-600">
              Browse manufacturer pages published in the Machinery Genius CMS.
            </p>
          </div>
          <img src="/assets/machinery-genius.png" alt="Machinery Genius" class="w-32 h-32 object-contain flex-shrink-0 hidden md:block" />
        </div>
      </section>

      <div v-if="loading" class="flex justify-center py-16">
        <div class="h-10 w-10 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>

      <section v-else-if="manufacturers.length" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <RouterLink
          v-for="m in manufacturers"
          :key="m.id"
          :to="m.path"
          class="group rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md"
        >
          <h2 class="text-base font-semibold text-gray-900 group-hover:text-blue-700">
            {{ m.title }}
          </h2>
          <p class="mt-2 text-sm text-gray-600">Learn more about this manufacturer</p>
        </RouterLink>
      </section>

      <section v-else class="rounded-lg border border-gray-200 bg-white p-8 text-center">
        <h2 class="text-lg font-semibold text-gray-900">No manufacturers found</h2>
        <p class="mt-2 text-sm text-gray-600">Add active Manufacturers pages in the CMS to show them here.</p>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getManufacturerPages, type ManufacturerPage } from "@/services/ManufacturerPageService";

const manufacturers = ref<ManufacturerPage[]>([]);
const loading = ref(true);

const fetchManufacturers = async () => {
  try {
    manufacturers.value = await getManufacturerPages();
  } catch (error) {
    console.error("Failed to fetch manufacturer pages:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchManufacturers);
</script>
