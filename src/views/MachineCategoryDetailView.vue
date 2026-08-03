<template>
  <main class="mg-page">
    <div class="mg-container-wide">
      <div v-if="loading" class="flex justify-center py-16">
        <div class="h-10 w-10 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>

      <template v-else-if="category">
        <section class="mg-hero mb-6">
          <div class="flex items-center justify-between gap-6">
            <div class="flex-1">
              <p class="text-xs font-semibold uppercase tracking-wide text-blue-700">
                {{ categoryLabel(category.category) }}
              </p>
              <h1 class="mt-2 text-3xl font-bold text-gray-900">{{ category.title }}</h1>
              <p v-if="category.metaDescription" class="mt-3 text-sm leading-6 text-gray-600">
                {{ category.metaDescription }}
              </p>
            </div>
            <img src="/assets/machinery-genius.png" alt="Machinery Genius" class="w-32 h-32 object-contain flex-shrink-0 hidden md:block" />
          </div>
        </section>

        <RouterLink
          to="/machine-categories"
          class="mb-4 inline-flex text-sm font-semibold text-blue-700 hover:underline"
        >
          Back to Machine Categories
        </RouterLink>

        <article class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div
            v-if="category.content"
            class="prose prose-slate max-w-none"
            v-html="category.content"
          ></div>
        </article>
      </template>

      <section v-else class="rounded-lg border border-gray-200 bg-white p-8 text-center">
        <h1 class="text-xl font-semibold text-gray-900">Category page not found</h1>
        <p class="mt-2 text-sm text-gray-600">
          This machine category is not published in the CMS.
        </p>
        <RouterLink
          to="/machine-categories"
          class="mt-5 inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          View All Machine Categories
        </RouterLink>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import {
  getMachineCategoryPages,
  machineCategoryLabels,
  type MachineCategoryPage,
} from "@/services/MachineCategoryPageService";
import { resetPageMeta, setPageMeta } from "@/utils/head";

const route = useRoute();
const category = ref<MachineCategoryPage | null>(null);
const loading = ref(true);
const slug = computed(() => String(route.params.slug || ""));

const categoryLabel = (categoryKey: string) => machineCategoryLabels[categoryKey] || categoryKey;

const fetchCategory = async () => {
  loading.value = true;
  try {
    const categories = await getMachineCategoryPages();
    category.value = categories.find((item) => item.slug === slug.value) || null;
  } catch (error) {
    console.error("Failed to fetch machine category page:", error);
    category.value = null;
  } finally {
    loading.value = false;
  }
};

onMounted(fetchCategory);
watch(slug, fetchCategory);
watch(
  [category, loading],
  ([currentCategory, isLoading]) => {
    if (isLoading) {
      return;
    }

    if (!currentCategory) {
      setPageMeta({
        title: "Machine Category Not Found | Machinery Genius",
        description: "This machine category is not published in the Machinery Genius CMS.",
      });
      return;
    }

    setPageMeta({
      title: currentCategory.metaTitle || `${currentCategory.title} | Machinery Genius`,
      description: currentCategory.metaDescription,
      keywords: currentCategory.metaKeywords,
    });
  },
  { immediate: true }
);
onBeforeUnmount(resetPageMeta);
</script>
