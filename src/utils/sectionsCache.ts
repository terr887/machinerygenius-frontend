const CACHE_KEY = 'mg_sections_footer_v1'
const CACHE_TTL_MS = 10 * 60 * 1000 // 10 minutes

// Only keep fields the footer needs — strips large data.content HTML so cached size stays ~200KB
const stripSection = (s: Record<string, unknown>) => {
  const d = (s.data || {}) as Record<string, unknown>
  return {
    id: s.id,
    type: s.type,
    is_active: s.is_active,
    sort_order: s.sort_order,
    data: {
      title: d.title,
      label: d.label,
      name: d.name,
      slug: d.slug,
      url: d.url,
      link: d.link,
      link_url: d.link_url,
      path: d.path,
      href: d.href,
      group: d.group,
      footer_group: d.footer_group,
      menu_group: d.menu_group,
      subcategory: d.subcategory,
      category: d.category,
      page_keep: d.page_keep,
      sort_order: d.sort_order,
      items: d.items,
    },
  }
}

export const getCachedSections = (): unknown[] | null => {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as { data: unknown[]; ts: number }
    if (Date.now() - parsed.ts > CACHE_TTL_MS) {
      sessionStorage.removeItem(CACHE_KEY)
      return null
    }
    return parsed.data
  } catch {
    return null
  }
}

export const setCachedSections = (sections: unknown[]): void => {
  try {
    const stripped = (sections as Record<string, unknown>[]).map(stripSection)
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data: stripped, ts: Date.now() }))
  } catch {
    // Silently ignore: private browsing, quota exceeded, etc.
  }
}
