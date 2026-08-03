type PageMeta = {
  title?: string
  description?: string
  keywords?: string
  url?: string
  image?: string
}

const defaultMeta: Required<PageMeta> = {
  title: 'Machinery Genius',
  description:
    "Powered By Unmatched Data & Expertise - Built with experience from some of America's largest and most respected machinery companies. Purpose-built AI that understands the language of machining and delivers instant, reliable answers 24/7.",
  keywords: '',
  url: 'https://chat.machinerygenius.com/',
  image: '/assets/images/logo.png',
}

const getMetaElement = (selector: string, attributes: Record<string, string>): HTMLMetaElement => {
  const existing = document.head.querySelector<HTMLMetaElement>(selector)

  if (existing) {
    return existing
  }

  const element = document.createElement('meta')
  Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value))
  document.head.appendChild(element)

  return element
}

const setMetaContent = (selector: string, attributes: Record<string, string>, content?: string) => {
  if (!content) {
    return
  }

  getMetaElement(selector, attributes).setAttribute('content', content)
}

export const setPageMeta = (meta: PageMeta) => {
  const title = meta.title?.trim() || defaultMeta.title
  const description = meta.description?.trim() || defaultMeta.description
  const keywords = meta.keywords?.trim()
  const url = meta.url?.trim() || window.location.href || defaultMeta.url
  const image = meta.image?.trim() || defaultMeta.image

  document.title = title
  setMetaContent('meta[name="title"]', { name: 'title' }, title)
  setMetaContent('meta[name="description"]', { name: 'description' }, description)
  setMetaContent('meta[property="og:title"]', { property: 'og:title' }, title)
  setMetaContent('meta[property="og:description"]', { property: 'og:description' }, description)
  setMetaContent('meta[property="og:url"]', { property: 'og:url' }, url)
  setMetaContent('meta[property="og:image"]', { property: 'og:image' }, image)
  setMetaContent('meta[property="twitter:title"]', { property: 'twitter:title' }, title)
  setMetaContent('meta[property="twitter:description"]', { property: 'twitter:description' }, description)
  setMetaContent('meta[property="twitter:url"]', { property: 'twitter:url' }, url)
  setMetaContent('meta[property="twitter:image"]', { property: 'twitter:image' }, image)

  const keywordsElement = document.head.querySelector<HTMLMetaElement>('meta[name="keywords"]')
  if (keywords) {
    setMetaContent('meta[name="keywords"]', { name: 'keywords' }, keywords)
  } else {
    keywordsElement?.remove()
  }
}

export const resetPageMeta = () => setPageMeta(defaultMeta)
