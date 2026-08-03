import { getSections } from '@/utils/sectionsStore'

export interface CmsFooterSection<TData = Record<string, unknown>> {
  id: number | string
  type: string
  is_active?: boolean
  sort_order?: number
  data?: TData
}

export interface FooterPageData {
  title?: string
  label?: string
  name?: string
  group?: string
  group_label?: string
  section?: string
  category?: string
  menu_group?: string
  menu_group_label?: string
  footer_group?: string
  footer_group_label?: string
  subgroup?: string
  subcategory?: string
  page_keep?: string
  slug?: string
  url?: string
  link?: string
  link_url?: string
  path?: string
  href?: string
  sort_order?: number
  items?: FooterPageData[]
}

export interface FooterLink {
  id: number | string
  label: string
  href: string
  external: boolean
  sortOrder: number
  groupKey: string
  groupLabel: string
  subgroupLabel?: string
}

export interface FooterGroup {
  key: string
  label: string
  items: FooterLink[]
  viewAllHref?: string
  viewAllLabel?: string
}

const footerPageTypes = [
  'footer',
  'footer_pages',
  'footer_page',
  'footer_links',
  'footer_link',
  'cms_page',
  'cms_pages',
  'machine_categories',
  'manufacturers',
  'platform',
  'resources',
  'company',
  'enterprise',
  'enterprise_investors',
  'enterprise-investors',
  'investors',
  'legal',
  'legal_trust',
  'legal-trust',
  'trust',
]

const groupLabelMap: Record<string, string> = {
  platform: 'Platform',
  resources: 'Resources',
  machines: 'Machine Categories',
  machine_categories: 'Machine Categories',
  'machine-categories': 'Machine Categories',
  manufacturers: 'Manufacturers',
  company: 'Company',
  'enterprise-investors': 'Enterprise / Investors',
  enterprise: 'Enterprise / Investors',
  investors: 'Enterprise / Investors',
  'legal-trust': 'Legal & Trust',
  'legal-and-trust': 'Legal & Trust',
  legal: 'Legal & Trust',
  trust: 'Legal & Trust',
}

const groupOrder = [
  'platform',
  'resources',
  'machines',
  'machine_categories',
  'machine-categories',
  'manufacturers',
  'company',
  'enterprise-investors',
  'enterprise',
  'investors',
  'legal-trust',
  'legal-and-trust',
  'legal',
  'trust',
]


const slugify = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const firstString = (...values: Array<unknown>) => {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) {
      return value.trim()
    }
  }

  return ''
}

const trimCommonTitleText = (title: string): string => {
  const patterns = [
    // Strip site name suffix first so subsequent patterns can anchor at $ correctly.
    /\s*[|\-–—]\s*Machinery\s*Genius(?:\s*AI)?\s*$/i,
    /[\s\-–—|:,]+Repair,?\s*Specs,?\s*Parts,?\s*Weights?\s*(?:&amp;|&)\s*Troubleshooting\s*$/i,
    /[\s\-–—|:,]+Repair\s*(?:&amp;|&)\s*Support\s*$/i,
  ]

  return patterns.reduce(
    (currentTitle, pattern) => currentTitle.replace(pattern, ''),
    title
  ).trim()
}

const normalizeHref = (data: FooterPageData) => {
  const rawHref = firstString(data.url, data.link, data.link_url, data.path, data.href)

  if (rawHref) {
    if (
      rawHref.startsWith('#') ||
      /^https?:\/\//i.test(rawHref) ||
      rawHref.startsWith('//') ||
      /^[a-z][a-z\d+\-.]*:/i.test(rawHref)
    ) {
      return { href: rawHref, external: true }
    }

    return { href: rawHref.startsWith('/') ? rawHref : `/${rawHref.replace(/^\/+/, '')}`, external: false }
  }

  const slug = firstString(data.slug)

  if (!slug) {
    return { href: '', external: false }
  }

  return { href: `/${slugify(slug)}`, external: false }
}

export const normalizeFooterPage = (
  section: CmsFooterSection<FooterPageData>
): FooterLink | null => {
  const data = section.data || {}
  // Always strip common site-name / suffix boilerplate from titles regardless of type.
  let label = trimCommonTitleText(firstString(data.title, data.label, data.name))

  let href: string
  let external: boolean
  let groupKey: string
  let groupLabel: string

  if (section.type === 'machine_categories') {
    const hrefResult = normalizeHref(data)
    const slug = slugify(firstString(data.slug, data.name, label))
    href = hrefResult.href && !hrefResult.external ? hrefResult.href : (slug ? `/machine-categories/${slug}` : hrefResult.href)
    external = hrefResult.external && !!hrefResult.href
    groupKey = 'machine_categories'
    groupLabel = groupLabelMap['machine_categories'] || 'Machine Categories'
  } else if (section.type === 'manufacturers') {
    // data.link_url is a CMS-wide generic fallback ('/oem-partners'), not a page-specific URL.
    // Always build the href from the slug so each manufacturer gets its own detail page.
    const slug = slugify(firstString(data.slug, data.name, label))
    href = slug ? `/manufacturers/${slug}` : ''
    external = false
    groupKey = 'manufacturers'
    groupLabel = groupLabelMap['manufacturers'] || 'Manufacturers'
  } else if (section.type === 'footer') {
    // footer CMS pages: the real URL is in data.slug; data.link_url holds a CMS-wide default, not a page-specific URL
    const rawSlug = firstString(data.slug)
    const cleanSlug = rawSlug.replace(/\.html?$/i, '').trim()
    href = cleanSlug ? (cleanSlug.startsWith('/') ? cleanSlug : `/${slugify(cleanSlug)}`) : ''
    external = false
    const groupSource = firstString(data.page_keep, data.group, data.footer_group, data.menu_group, data.subcategory)
    const effectiveGroup = groupSource || section.type
    groupKey = slugify(effectiveGroup || 'misc')
    groupLabel = groupLabelMap[groupKey] || groupSource || 'More'
  } else {
    const hrefResult = normalizeHref(data)
    href = hrefResult.href
    external = hrefResult.external
    const groupSource = firstString(
      data.group,
      data.footer_group,
      data.menu_group,
      data.section,
      data.subcategory,   // CMS "Page Subcategory" field
      data.category,      // alternate mapping for the same CMS field
      data.group_label,
      data.menu_group_label,
      data.footer_group_label
    )
    // Fall back to section.type so CMS sections typed as 'company', 'legal', etc.
    // land in the correct footer group even when no explicit group field is set.
    const effectiveGroup = groupSource || section.type
    groupKey = slugify(effectiveGroup || 'misc')
    groupLabel = groupLabelMap[groupKey] || groupSource || 'More'
  }

  if (!label || !href) {
    return null
  }

  const subgroupLabel = firstString(data.subgroup, data.subcategory)

  return {
    id: section.id,
    label,
    href,
    external,
    sortOrder: typeof data.sort_order === 'number' ? data.sort_order : section.sort_order || 0,
    groupKey,
    groupLabel,
    subgroupLabel: subgroupLabel || undefined,
  }
}

export const buildFooterGroups = (pages: FooterLink[]): FooterGroup[] => {
  const groupedPages = new Map<string, FooterGroup>()

  pages.forEach((page) => {
    const current = groupedPages.get(page.groupKey)

    if (current) {
      current.items.push(page)
      return
    }

    groupedPages.set(page.groupKey, {
      key: page.groupKey,
      label: page.groupLabel,
      items: [page],
    })
  })

  const orderedGroups = Array.from(groupedPages.values())
    .map((group) => ({
      ...group,
      items: group.items
        .slice()
        .sort((left, right) => (left.sortOrder - right.sortOrder) || left.label.localeCompare(right.label)),
    }))
    .map((group) => {
      const isCapped = group.key === 'machine_categories' || group.key === 'manufacturers'
      return {
        ...group,
        // Only cap machine_categories and manufacturers (they have a "View All" link).
        // All other footer page groups show every link the CMS provides.
        items: isCapped ? group.items.slice(0, 15) : group.items,
        ...(group.key === 'machine_categories' ? { viewAllHref: '/machine-categories', viewAllLabel: 'View All Categories' } : {}),
        ...(group.key === 'manufacturers' ? { viewAllHref: '/manufacturers', viewAllLabel: 'All Manufacturers' } : {}),
      }
    })
    .sort((left, right) => {
      const leftOrder = groupOrder.indexOf(left.key)
      const rightOrder = groupOrder.indexOf(right.key)

      if (leftOrder !== -1 || rightOrder !== -1) {
        const normalizedLeftOrder = leftOrder === -1 ? groupOrder.length : leftOrder
        const normalizedRightOrder = rightOrder === -1 ? groupOrder.length : rightOrder

        if (normalizedLeftOrder !== normalizedRightOrder) {
          return normalizedLeftOrder - normalizedRightOrder
        }
      }

      return left.label.localeCompare(right.label)
    })

  return orderedGroups
}

const expandSection = (section: CmsFooterSection<FooterPageData>): CmsFooterSection<FooterPageData>[] => {
  const data = section.data || {}

  if (!Array.isArray(data.items) || data.items.length === 0) {
    return [section]
  }

  // Derive the parent group so child items inherit it when they have no group of their own.
  const parentGroup = firstString(
    data.group,
    data.section,
    data.menu_group,
    data.group_label,
    data.menu_group_label,
    data.footer_group,
    data.footer_group_label,
  ) || section.type

  return data.items.map((item, index) => ({
    id: (item as Record<string, unknown>).id != null ? (item as Record<string, unknown>).id as number | string : `${section.id}-${index}`,
    type: section.type,
    is_active: section.is_active,
    sort_order: typeof (item as FooterPageData).sort_order === 'number' ? (item as FooterPageData).sort_order : section.sort_order,
    data: {
      group: item.group || parentGroup,
      group_label: item.group_label || data.group_label,
      ...item,
    },
  }))
}

export const fetchFooterGroups = async (): Promise<FooterGroup[]> => {
  try {
    const raw = await getSections()
    const sections = raw as CmsFooterSection<FooterPageData>[]

    const footerPages = sections
      .filter((section) => {
        if (section.is_active === false) return false
        // Include if the section type is an explicit footer type
        if (footerPageTypes.includes(section.type)) return true
        // Also include any section whose data carries an explicit group/footer_group/menu_group —
        // this catches CMS pages stored with their own type (e.g. 'faq', 'page') but tagged for a footer column
        const data = section.data || {}
        return !!(data.footer_group || data.footer_group_label || data.menu_group || data.menu_group_label || data.group)
      })
      .flatMap(expandSection)
      .map(normalizeFooterPage)
      .filter((page): page is FooterLink => !!page)

    return buildFooterGroups(footerPages)
  } catch (error) {
    console.error('Failed to fetch or build footer groups:', error)
    return [] // Return an empty array on error to prevent crashes.
  }
}
