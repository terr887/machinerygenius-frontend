<template>
  <main class="mg-page">
    <div class="mg-container-wide">
      <div v-if="loading" class="flex justify-center py-16">
        <div class="h-10 w-10 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>

      <template v-else-if="manufacturer">
        <section class="mg-hero mb-6">
          <div class="flex items-center justify-between gap-6">
            <div class="flex-1">
              <h1 class="mt-2 text-3xl font-bold text-gray-900">{{ manufacturer.title }}</h1>
              <p v-if="manufacturer.metaDescription" class="mt-3 text-sm leading-6 text-gray-600">
                {{ manufacturer.metaDescription }}
              </p>
            </div>
            <img src="/assets/machinery-genius.png" alt="Machinery Genius" class="w-32 h-32 object-contain flex-shrink-0 hidden md:block" />
          </div>
        </section>

        <RouterLink to="/manufacturers" class="mb-4 inline-flex text-sm font-semibold text-blue-700 hover:underline">
          Back to Manufacturers
        </RouterLink>

        <article class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div v-if="manufacturer.content" class="prose prose-slate max-w-none" v-html="manufacturer.content"></div>
        </article>
      </template>

      <section v-else class="rounded-lg border border-gray-200 bg-white p-8 text-center">
        <h1 class="text-xl font-semibold text-gray-900">Manufacturer page not found</h1>
        <p class="mt-2 text-sm text-gray-600">This manufacturer page is not published in the CMS.</p>
        <RouterLink to="/manufacturers" class="mt-5 inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
          View All Manufacturers
        </RouterLink>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { getManufacturerPages, type ManufacturerPage } from "@/services/ManufacturerPageService";
import { resetPageMeta, setPageMeta } from "@/utils/head";

const route = useRoute();
const manufacturer = ref<ManufacturerPage | null>(null);
const loading = ref(true);
const slug = computed(() => String(route.params.slug || ""));

const fetchManufacturer = async () => {
  loading.value = true;
  try {
    const list = await getManufacturerPages();
    manufacturer.value = list.find((m) => m.slug === slug.value) || null;
  } catch (error) {
    console.error("Failed to fetch manufacturer page:", error);
    manufacturer.value = null;
  } finally {
    loading.value = false;
  }
};

onMounted(fetchManufacturer);
watch(slug, fetchManufacturer);

watch(
  [manufacturer, loading],
  ([current, isLoading]) => {
    if (isLoading) return;

    if (!current) {
      setPageMeta({
        title: "Manufacturer Not Found | Machinery Genius",
        description: "This manufacturer page is not published in the Machinery Genius CMS.",
      });
      return;
    }

    setPageMeta({
      title: current.metaTitle || `${current.title} | Machinery Genius`,
      description: current.metaDescription,
      keywords: current.metaKeywords,
    });
  },
  { immediate: true }
);

onBeforeUnmount(resetPageMeta);
</script>
