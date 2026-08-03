<template>
  <main class="mg-page">
    <div class="mg-container-wide">
      <div v-if="loading" class="flex justify-center py-16">
        <div class="h-10 w-10 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>

      <template v-else-if="page">
        <section class="mg-hero mb-6">
          <h1 class="text-3xl font-bold text-gray-900">{{ page.title }}</h1>
          <p v-if="page.metaDescription" class="mt-3 text-sm leading-6 text-gray-600">
            {{ page.metaDescription }}
          </p>
        </section>

        <article class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div
            v-if="page.content"
            class="prose prose-slate max-w-none"
            v-html="page.content"
          />
          <p v-else class="text-sm text-gray-500">No content available for this page.</p>
        </article>
      </template>

      <section v-else class="rounded-lg border border-gray-200 bg-white p-8 text-center">
        <h1 class="text-xl font-semibold text-gray-900">Page Not Found</h1>
        <p class="mt-2 text-sm text-gray-600">
          This page is not published in the CMS yet.
        </p>
        <RouterLink
          to="/"
          class="mt-5 inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Go to Home
        </RouterLink>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getSections } from '@/utils/sectionsStore'
import { setPageMeta, resetPageMeta } from '@/utils/head'

interface CmsPage {
  title: string
  content: string
  metaTitle?: string
  metaDescription?: string
  metaKeywords?: string
}

const route = useRoute()
const page = ref<CmsPage | null>(null)
const loading = ref(true)

const currentPath = computed(() => '/' + (Array.isArray(route.params.pathMatch) ? route.params.pathMatch.join('/') : route.params.pathMatch || ''))

const slugify = (value: string) =>
  value.trim().toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

const fetchPage = async () => {
  loading.value = true
  page.value = null

  try {
    const sections = (await getSections()) as any[]

    const path = currentPath.value
    const pathSlug = slugify(path.replace(/^\//, ''))

    const match = sections.find((section: any) => {
      const data = section.data || {}
      const sectionSlug = slugify(data.slug || data.name || data.title || '')
      const sectionUrl = (data.url || data.link || data.link_url || data.path || data.href || '').replace(/^\//, '')

      return (
        sectionSlug === pathSlug ||
        slugify(sectionUrl) === pathSlug ||
        slugify(sectionUrl) === slugify(path)
      )
    })

    if (match) {
      const data = match.data || {}
      page.value = {
        title: data.title || data.label || data.name || '',
        content: data.content || data.description || data.body || '',
        metaTitle: data.meta_title,
        metaDescription: data.meta_description,
        metaKeywords: data.meta_keywords,
      }
    }
  } catch (error) {
    console.error('Failed to fetch CMS page:', error)
  } finally {
    loading.value = false
  }
}

onMounted(fetchPage)
watch(currentPath, fetchPage)

watch([page, loading], ([currentPage, isLoading]) => {
  if (isLoading) return

  if (!currentPage) {
    setPageMeta({ title: 'Page Not Found | Machinery Genius' })
    return
  }

  setPageMeta({
    title: currentPage.metaTitle || `${currentPage.title} | Machinery Genius`,
    description: currentPage.metaDescription,
    keywords: currentPage.metaKeywords,
  })
})

const cleanup = () => resetPageMeta()
import { onBeforeUnmount } from 'vue'
onBeforeUnmount(cleanup)
</script>

<style scoped>
/*
  CMS-injected page content (rendered via v-html) ships its own <style> block
  that lays domain names out in CSS columns without any word-break rule. Long
  domains (e.g. "machinetoolrepairnetwork.com") are wider than the resulting
  column and overflow into the neighboring column, visually overlapping it.
  This selector has higher specificity than the CMS rule (`.mg-domain-columns p`)
  so it wins without needing !important.
*/
.prose :deep(.mg-domain-columns p) {
  overflow-wrap: anywhere;
  word-break: break-word;
}
</style>
