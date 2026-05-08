export type FeaturePage = {
  slug: string
  title: string
  eyebrow: string
  summary: string
  hero: string
  points: string[]
  workflows: string[]
  ctaText: string
  ctaLink: string
}

type CmsFeatureItem = {
  title?: string
  slug?: string
  link_url?: string
  description?: string
  page_eyebrow?: string
  page_summary?: string
  page_hero?: string
  page_points?: string[]
  page_workflows?: string[]
  page_cta_text?: string
  page_cta_link?: string
}

type CmsHomeSection = {
  type?: string
  data?: CmsFeatureItem & {
    items?: CmsFeatureItem[]
  }
}

export const slugifyFeatureTitle = (title = ''): string => {
  return title
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/["']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const featurePathForTitle = (title = ''): string => {
  const slug = slugifyFeatureTitle(title)

  return slug ? `/features/${slug}` : '/features'
}

export const featurePages: FeaturePage[] = [
  {
    slug: 'ai-help-24-7',
    title: 'AI Help 24/7',
    eyebrow: 'Technical answers on demand',
    summary: 'Ask machine questions any time and get structured guidance for specs, setup, troubleshooting, and operating decisions.',
    hero: 'Machinery Genius gives shops a fast first stop for machine questions before calling around, searching old PDFs, or waiting for a specialist to reply.',
    points: [
      'Ask about machine specs, dimensions, capacity, power, tooling, setup, and symptoms.',
      'Get practical next steps organized around what to check, what to verify, and when to escalate.',
      'Use answers as a starting point while still validating safety-critical work with qualified people and OEM documentation.',
    ],
    workflows: [
      'Identify the machine, model, serial number, controller, and problem context.',
      'Ask a focused question with photos, error codes, or known measurements when available.',
      'Save useful answers to your workflow or machine record for future reference.',
    ],
    ctaText: 'Ask a Question',
    ctaLink: '/app',
  },
  {
    slug: 'visual-recognition',
    title: 'Visual Recognition',
    eyebrow: 'Photo-assisted identification',
    summary: 'Upload photos to help identify machines, components, labels, nameplates, and visual clues that can narrow the answer.',
    hero: 'When the model plate is hard to read or a part has no obvious number, visual context can speed up the path to the right documentation and next step.',
    points: [
      'Use photos of nameplates, controls, assemblies, tooling, or problem areas.',
      'Combine image context with text questions for better machine and part identification.',
      'Document visual evidence alongside the machine history in your account.',
    ],
    workflows: [
      'Capture a clear, well-lit image of the whole machine and close-ups of key labels.',
      'Ask what the image shows and include any known brand, model, or application details.',
      'Confirm the result against manuals, OEM records, and physical measurements before ordering parts.',
    ],
    ctaText: 'Upload in Chat',
    ctaLink: '/app',
  },
  {
    slug: 'predictive-maintenance',
    title: 'Predictive Maintenance',
    eyebrow: 'Plan service before downtime',
    summary: 'Track maintenance signals and service history so recurring issues, wear items, and upcoming work are easier to plan.',
    hero: 'Predictive maintenance turns machine notes, symptoms, and service intervals into a clearer maintenance picture for busy shops.',
    points: [
      'Organize service history, reminders, symptoms, and recurring machine issues.',
      'Spot patterns in wear items, fluids, belts, bearings, and control problems.',
      'Prioritize follow-up based on risk, downtime impact, and inspection needs.',
    ],
    workflows: [
      'Add the machine to My Machine Garage with model and serial details.',
      'Record maintenance events, symptoms, and parts replaced.',
      'Use Machinery Genius to prepare inspection checklists and service questions.',
    ],
    ctaText: 'Open Machine Garage',
    ctaLink: '/account',
  },
  {
    slug: 'ar-see-it-in-my-warehouse',
    title: 'AR See It In My Warehouse',
    eyebrow: 'Fit and layout planning',
    summary: 'Plan how a machine may fit in your facility by thinking through footprint, clearances, rigging paths, and surrounding workflow.',
    hero: 'Before moving heavy equipment, shops need a practical plan for space, access, utilities, and safe placement.',
    points: [
      'Review footprint, working envelope, maintenance access, and operator clearance.',
      'Think through doorways, aisles, overhead restrictions, floor loading, and rigging constraints.',
      'Prepare better questions for movers, electricians, and facility managers.',
    ],
    workflows: [
      'Collect machine dimensions, weight, electrical requirements, and layout photos.',
      'Compare the machine envelope against the intended floor space and access path.',
      'Use the plan to coordinate rigging, power, air, coolant, and safety requirements.',
    ],
    ctaText: 'Plan a Layout',
    ctaLink: '/app',
  },
  {
    slug: 'my-machine-garage',
    title: 'My Machine Garage',
    eyebrow: 'Your equipment record',
    summary: 'Save machines, model numbers, serials, service notes, manuals, and reminders in one place.',
    hero: 'My Machine Garage keeps your machine context attached to your account so future questions start with better information.',
    points: [
      'Store machine identity, serial numbers, manuals, and service history.',
      'Keep maintenance notes and reminders tied to the correct equipment.',
      'Return to previous machine context instead of re-entering details every time.',
    ],
    workflows: [
      'Create a machine record with brand, model, serial, and category.',
      'Attach useful chat answers, service notes, and maintenance events.',
      'Use saved context when asking future troubleshooting or parts questions.',
    ],
    ctaText: 'Manage My Machines',
    ctaLink: '/account',
  },
  {
    slug: 'parts-and-service',
    title: 'Parts and Service',
    eyebrow: 'Find the next practical source',
    summary: 'Get help identifying compatible mechanical, electrical, hydraulic, and service paths for machine repairs.',
    hero: 'Parts searches are easier when the machine context, symptoms, and replacement criteria are organized before contacting suppliers.',
    points: [
      'Clarify part names, assemblies, compatibility questions, and likely source paths.',
      'Prepare details suppliers need, including brand, model, serial, measurements, and photos.',
      'Reduce wrong-part risk by checking documentation and physical fit before purchase.',
    ],
    workflows: [
      'Describe the failed component and machine application.',
      'Collect nameplate data, dimensions, photos, and manual references.',
      'Use the output to contact OEMs, dealers, repair technicians, or parts suppliers.',
    ],
    ctaText: 'Start a Parts Search',
    ctaLink: '/app',
  },
  {
    slug: 'repair-tech-finder',
    title: 'Repair Tech Finder',
    eyebrow: 'Connect the work to the right skill',
    summary: 'Prepare a technician-ready problem summary and identify what type of repair expertise the job needs.',
    hero: 'A clearer repair request helps technicians decide quickly whether they can help and what information they need before arriving.',
    points: [
      'Classify issues by mechanical, electrical, hydraulic, control, rigging, or calibration needs.',
      'Build a concise repair brief with symptoms, error codes, machine details, and urgency.',
      'Know what evidence to collect before calling a service provider.',
    ],
    workflows: [
      'Summarize the machine, issue, history, and impact on production.',
      'List error codes, photos, sounds, fluid leaks, alarms, or recent changes.',
      'Share the prepared brief with your service provider or internal maintenance team.',
    ],
    ctaText: 'Prepare a Repair Brief',
    ctaLink: '/contact',
  },
  {
    slug: '3d-printable-parts',
    title: '3D Printable Parts',
    eyebrow: 'Support for obsolete and custom parts',
    summary: 'Explore whether a non-critical component may be a candidate for reverse engineering, printing, or custom fabrication.',
    hero: 'For obsolete or low-load parts, 3D printing can be useful when the right material, dimensions, and safety limits are understood.',
    points: [
      'Think through material, heat, load, wear, tolerance, and safety requirements.',
      'Document damaged parts with measurements and photos before fabrication.',
      'Separate non-critical convenience parts from safety-critical or load-bearing components.',
    ],
    workflows: [
      'Identify the component function and operating environment.',
      'Capture measurements, photos, mounting details, and wear surfaces.',
      'Validate any printed or fabricated replacement with qualified technical review before use.',
    ],
    ctaText: 'Ask About a Part',
    ctaLink: '/app',
  },
  {
    slug: 'training-and-setup-help',
    title: 'Training and Setup Help',
    eyebrow: 'Guidance for better first runs',
    summary: 'Get structured help for controls, setup steps, offsets, tooling basics, safe starts, and operator handoff.',
    hero: 'Training and setup guidance helps teams turn scattered notes into repeatable steps for safer, more consistent operation.',
    points: [
      'Break down setup tasks into operator-friendly checklists.',
      'Ask about controls, offsets, tooling, G-code basics, and process planning.',
      'Create handoff notes for new operators or maintenance staff.',
    ],
    workflows: [
      'Start with the machine type, controller, material, tooling, and goal.',
      'Ask for setup checks, safe-start steps, or a training outline.',
      'Review final procedures against your shop standards and machine documentation.',
    ],
    ctaText: 'Build a Setup Checklist',
    ctaLink: '/app',
  },
  {
    slug: 'oem-partner-support',
    title: 'OEM Partner Support',
    eyebrow: 'Manufacturer-aligned answers',
    summary: 'Help manufacturers, importers, and dealers connect better product data to customer support workflows.',
    hero: 'OEM Partner Support gives customers a better path to accurate product information while giving manufacturers a stronger support channel.',
    points: [
      'Create a customer-facing knowledge path around manuals, specs, parts, and service guidance.',
      'Support product pages, dealer programs, and sponsored customer credits.',
      'Route technical questions and lead opportunities to the right partner team.',
    ],
    workflows: [
      'Share brand, model, manual, parts, and support content for ingestion.',
      'Define the customer actions you want Machinery Genius to support.',
      'Use partner pages and sponsored credits to improve customer experience.',
    ],
    ctaText: 'Become an OEM Partner',
    ctaLink: '/oem-supplier-form',
  },
]

const featurePageMap = new Map(featurePages.map((feature) => [feature.slug, feature]))

export const getFeaturePageBySlug = (slug: string): FeaturePage | undefined => {
  return featurePageMap.get(slug)
}

const stripHtml = (value = ''): string => {
  if (typeof document === 'undefined') {
    return value.replace(/<[^>]*>/g, '').trim()
  }

  const element = document.createElement('div')
  element.innerHTML = value

  return element.textContent?.trim() || ''
}

export const featurePageFromCmsItem = (item: CmsFeatureItem): FeaturePage | undefined => {
  const slug = item.slug || slugifyFeatureTitle(item.title)

  if (!slug || !item.title) {
    return undefined
  }

  const fallback = getFeaturePageBySlug(slug)
  const description = stripHtml(item.description || '')

  return {
    slug,
    title: item.title,
    eyebrow: item.page_eyebrow || fallback?.eyebrow || 'Feature',
    summary: item.page_summary || fallback?.summary || description,
    hero: item.page_hero || fallback?.hero || description,
    points: Array.isArray(item.page_points) && item.page_points.length ? item.page_points : fallback?.points || [],
    workflows: Array.isArray(item.page_workflows) && item.page_workflows.length ? item.page_workflows : fallback?.workflows || [],
    ctaText: item.page_cta_text || fallback?.ctaText || 'Get Started',
    ctaLink: item.page_cta_link || fallback?.ctaLink || '/app',
  }
}

export const getFeaturePageFromHomeSections = (
  sections: CmsHomeSection[],
  slug: string
): FeaturePage | undefined => {
  for (const section of sections) {
    if (section.type === 'feature_page' && section.data) {
      const itemSlug = section.data.slug || slugifyFeatureTitle(section.data.title)

      if (itemSlug === slug) {
        return featurePageFromCmsItem(section.data)
      }
    }
  }

  for (const section of sections) {
    if (section.type !== 'features' || !Array.isArray(section.data?.items)) {
      continue
    }

    for (const item of section.data.items) {
      const itemSlug = item.slug || slugifyFeatureTitle(item.title)

      if (itemSlug === slug) {
        return featurePageFromCmsItem(item)
      }
    }
  }

  return undefined
}
