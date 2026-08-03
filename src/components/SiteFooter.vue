<template>
  <footer class="overflow-hidden bg-[#071d49] text-slate-100">
    <div class="mx-auto max-w-full px-3 py-4 sm:px-4 lg:px-5">

      <!-- Section 1: Help cards -->
      <section class="rounded-2xl border border-slate-200/80 bg-white px-3 py-3 text-slate-900 shadow-[0_8px_24px_rgba(15,23,42,0.08)] sm:px-4 sm:py-4">
        <div class="grid gap-3 xl:grid-cols-[1.5fr_repeat(4,minmax(0,1fr))]">
          <div class="xl:pr-4">
            <h2 class="text-[16px] font-semibold tracking-tight text-slate-950 sm:text-[18px] lg:text-[19px]">
              Need help with a machine right now?
            </h2>
            <p class="mt-2 text-[11px] leading-[1.45] text-slate-700 sm:text-[12px]">
              Ask Machinery Genius for specs, repair help, parts direction, maintenance guidance, troubleshooting, machine identification, and OEM support paths.
            </p>
          </div>

          <RouterLink
            v-for="card in heroCards"
            :key="card.label"
            :to="card.to"
            class="rounded-xl border border-slate-200 bg-white p-2.5 shadow-[0_8px_20px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(15,23,42,0.08)]"
            @click="scrollToTop"
          >
            <div class="flex h-7 w-7 items-center justify-center" :class="card.iconClass" v-html="card.iconSvg" />
            <h3 class="mt-2 text-[13px] font-semibold leading-[1.3] text-slate-950 sm:text-[14px]">
              {{ card.label }}
            </h3>
            <p class="mt-1 text-[11px] leading-[1.4] text-slate-600 sm:text-[12px]">
              {{ card.description }}
            </p>
          </RouterLink>
        </div>
      </section>

      <!-- Section 2: Footer link columns -->
      <section class="mt-3 rounded-2xl bg-[#0a234e] px-3 py-4 shadow-[0_18px_40px_rgba(2,8,23,0.18)] sm:px-4 sm:py-5">
        <div class="grid gap-0 grid-cols-2 lg:grid-cols-4 xl:[grid-template-columns:repeat(7,minmax(min-content,1fr))]">
          <section
            v-for="(group, index) in displayGroups"
            :key="group.key"
            class="min-h-full px-2.5 py-2.5 xl:py-1.5 xl:px-3"
            :class="index > 0 ? 'border-l border-white/15' : ''"
          >
            <div class="flex items-center gap-1.5">
              <span class="h-3.5 w-3.5 shrink-0 text-[#4cc9ff]" aria-hidden="true" v-html="iconSvgForGroup(group.key)" />
              <h3 class="whitespace-nowrap text-[11px] font-bold uppercase tracking-tight text-white sm:text-[12px]">
                {{ group.label }}
              </h3>
            </div>

            <ul class="mt-2 space-y-1.5">
              <li v-for="item in group.items" :key="item.id">
                <a
                  v-if="item.external"
                  :href="item.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-start gap-1 text-[12px] leading-[1.4] text-slate-300 transition hover:text-amber-300"
                >
                  <span class="mt-px shrink-0 text-amber-300" aria-hidden="true">›</span>
                  <span>{{ item.label }}</span>
                </a>
                <RouterLink
                  v-else
                  :to="item.href"
                  class="inline-flex items-start gap-1 text-[12px] leading-[1.4] text-slate-300 transition hover:text-amber-300"
                  @click="scrollToTop"
                >
                  <span class="mt-px shrink-0 text-amber-300" aria-hidden="true">›</span>
                  <span>{{ item.label }}</span>
                </RouterLink>
              </li>
            </ul>

            <RouterLink
              v-if="group.viewAllHref"
              :to="group.viewAllHref"
              class="mt-2 inline-flex items-center gap-1 text-[12px] font-semibold text-amber-300 transition hover:text-amber-200"
              @click="scrollToTop"
            >
              <span aria-hidden="true">›</span>
              {{ group.viewAllLabel || 'View All' }}
            </RouterLink>
          </section>
        </div>
      </section>

      <!-- Section 3: Logo + trust stats + social + app badges -->
      <section class="mt-3 rounded-2xl bg-[#0a234e] px-3 py-4 shadow-[0_18px_40px_rgba(2,8,23,0.18)] sm:px-4">
        <div class="grid gap-4 xl:grid-cols-[2fr_repeat(4,minmax(0,1fr))_0.85fr_0.9fr]">
          <div class="border-b border-white/10 pb-3 xl:border-b-0 xl:border-r xl:border-white/10 xl:pr-4 xl:pb-0">
            <div class="flex items-center gap-2">
              <img src="/assets/images/logo.png" alt="Machinery Genius" class="h-9 w-9 object-contain" />
              <div>
                <p class="text-[14px] font-semibold leading-tight text-white">MACHINERY</p>
                <p class="text-[14px] font-semibold leading-tight text-slate-300">GENIUS AI</p>
              </div>
            </div>
            <p class="mt-2 text-[11px] leading-[1.45] text-slate-300 sm:text-[12px]">
              Building the AI infrastructure layer for the machinery industry. Connecting machine owners, shops, manufacturers, repair technicians, schools, OEMs, dealers, and industrial service providers through one intelligent support platform.
            </p>
          </div>

          <div
            v-for="stat in trustStats"
            :key="stat.label"
            class="border-b border-white/10 pb-3 xl:border-b-0 xl:border-r xl:border-white/10 xl:px-2.5 xl:pb-0"
          >
            <div class="flex flex-col items-center text-center">
              <span class="h-6 w-6 text-slate-100" aria-hidden="true" v-html="stat.iconSvg" />
              <p class="mt-2 text-[11px] leading-[1.35] text-slate-100 sm:text-[12px]">
                {{ stat.label }}
              </p>
            </div>
          </div>

          <div class="border-b border-white/10 pb-3 xl:border-b-0 xl:border-r xl:border-white/10 xl:px-2.5 xl:pb-0">
            <p class="text-center text-[10px] font-semibold uppercase tracking-[0.15em] text-white sm:text-[11px]">
              Stay Connected
            </p>
            <div class="mt-2 flex items-center justify-center gap-2">
              <a
                v-for="social in socialLinks"
                :key="social.label"
                :href="social.href"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex h-7 w-7 items-center justify-center rounded-md text-white transition hover:opacity-90"
                :class="social.className"
                :aria-label="social.label"
                :title="social.label"
              >
                <span class="h-3.5 w-3.5" aria-hidden="true" v-html="social.iconSvg" />
              </a>
            </div>
          </div>

          <div class="pb-1 xl:px-2.5">
            <p class="text-center text-[10px] font-semibold uppercase tracking-[0.15em] text-white sm:text-[11px]">
              Mobile Apps Coming Soon
            </p>
            <div class="mt-2 flex flex-col items-center gap-1.5">
              <div
                class="flex h-9 w-[132px] items-center gap-1.5 rounded-lg border border-white/15 bg-black px-2 text-white"
                role="img"
                aria-label="Download on the App Store — coming soon"
              >
                <span class="h-5 w-5 shrink-0" aria-hidden="true" v-html="svgApple" />
                <span class="flex flex-col leading-none">
                  <span class="text-[9px] tracking-wide text-slate-300">Download on the</span>
                  <span class="text-[13px] font-semibold leading-tight">App Store</span>
                </span>
              </div>
              <div
                class="flex h-9 w-[132px] items-center gap-1.5 rounded-lg border border-white/15 bg-black px-2 text-white"
                role="img"
                aria-label="Get it on Google Play — coming soon"
              >
                <span class="h-5 w-5 shrink-0" aria-hidden="true" v-html="svgGooglePlay" />
                <span class="flex flex-col leading-none">
                  <span class="text-[9px] uppercase tracking-wide text-slate-300">Get it on</span>
                  <span class="text-[13px] font-semibold leading-tight">Google Play</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 4: Copyright bar -->
      <section class="mt-3 rounded-2xl bg-[#0a234e] px-3 py-3 text-[11px] leading-[1.5] text-slate-200 shadow-[0_18px_40px_rgba(2,8,23,0.18)] sm:px-4 sm:text-[12px]">
        <div class="grid gap-3 lg:grid-cols-[1.35fr_auto] lg:items-center">
          <p>
            Machinery Genius provides AI-assisted machinery information, support direction, and technical guidance for informational purposes only. Always verify procedures, specifications, safety requirements, electrical work, maintenance, repairs, and machine operation with the original manufacturer, qualified technicians, applicable safety standards, and proper industry practices.
          </p>
          <div class="text-left lg:text-right">
            <p class="text-[12px] font-medium text-white sm:text-[13px]">© 2026 Machinery Genius. All rights reserved.</p>
            <p class="mt-1 text-[13px] font-semibold text-sky-400 sm:text-[14px]">Machinery Questions. Genius Answers. ⚡</p>
            <p class="mt-1.5 text-slate-300">
              <a href="/sitemap.xml" class="hover:text-amber-300">Sitemap</a>
              <span class="mx-2 text-slate-500">|</span>
              <RouterLink to="/privacy-policy" class="hover:text-amber-300" @click="scrollToTop">Privacy Center</RouterLink>
              <span class="mx-2 text-slate-500">|</span>
              <RouterLink to="/privacy-policy" class="hover:text-amber-300" @click="scrollToTop">Do Not Sell My Information</RouterLink>
            </p>
          </div>
        </div>
      </section>

    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { fetchFooterGroups, type FooterGroup } from '@/services/FooterPageService'

const footerGroups = ref<FooterGroup[]>([])
const footerLoading = ref(true)

const svgChat = `
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/>
    <circle cx="9" cy="12" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="15" cy="12" r="1.2"/>
  </svg>
`

const svgHome = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M4 10.5 12 4l8 6.5"/>
    <path d="M6 9.5V20h12V9.5"/>
    <path d="M9 20v-7h6v7"/>
  </svg>
`

const svgWrench = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M14.7 6.3a5 5 0 0 0-6.4 6.4L3 18l3 3 5.3-5.3a5 5 0 0 0 6.4-6.4l-3 3z"/>
  </svg>
`

const svgHandshake = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M7 12l2-2a3 3 0 0 1 4 0l2 2"/>
    <path d="M12 14l2 2"/>
    <path d="M3 9l4-4 3 3"/>
    <path d="M21 9l-4-4-3 3"/>
  </svg>
`

const svgMonitor = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="12" rx="2"/>
    <path d="M8 20h8"/>
    <path d="M12 16v4"/>
  </svg>
`

const svgBook = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M4 4v15.5A2.5 2.5 0 0 0 6.5 22H20V6a2 2 0 0 0-2-2H6.5A2.5 2.5 0 0 0 4 6.5z"/>
    <path d="M9 8h6"/>
  </svg>
`

const svgGear = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1-1.8 3.1-.2-.1a1 1 0 0 0-1.1.2l-.1.1a1 1 0 0 0-.3.9l.1.2-3.1 1.8-.1-.2a1 1 0 0 0-.9-.3h-.2a1 1 0 0 0-.9.3l-.1.2-3.1-1.8.1-.2a1 1 0 0 0-.3-.9l-.1-.1a1 1 0 0 0-1.1-.2l-.2.1L4.3 16l.1-.1a1 1 0 0 0 .2-1.1V14a1 1 0 0 0-.2-1.1l-.1-.1 1.8-3.1.2.1a1 1 0 0 0 1.1-.2l.1-.1a1 1 0 0 0 .3-.9l-.1-.2 3.1-1.8.1.2a1 1 0 0 0 .9.3h.2a1 1 0 0 0 .9-.3l.1-.2 3.1 1.8-.1.2a1 1 0 0 0 .3.9l.1.1a1 1 0 0 0 1.1.2l.2-.1 1.8 3.1-.1.1a1 1 0 0 0-.2 1.1z"/>
  </svg>
`

const svgFactory = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M4 20V8l4 2V8l4 2V6l8 4v10z"/>
    <path d="M8 20v-4h4v4"/>
  </svg>
`

const svgGroup = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
`

const svgChart = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M4 20V10"/>
    <path d="M10 20V4"/>
    <path d="M16 20v-8"/>
    <path d="M22 20H2"/>
  </svg>
`

const svgShieldOutline = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M12 3l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V7z"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
`

const svgDot = `
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <circle cx="12" cy="12" r="4"/>
  </svg>
`

const svgShield = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M12 3l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V7z"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
`

const svgLock = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="4" y="11" width="16" height="10" rx="2"/>
    <path d="M8 11V8a4 4 0 1 1 8 0v3"/>
  </svg>
`

const svgUsers = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
`

const svgClock = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9"/>
    <path d="M12 7v5l3 3"/>
  </svg>
`

const svgFacebook = `
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M13.5 21v-7h2.4l.4-3h-2.8V9c0-.9.2-1.5 1.5-1.5H16V5.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V11H7v3h2.3v7h4.2z"/>
  </svg>
`

const svgLinkedin = `
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M6.5 6.5A1.8 1.8 0 1 1 6.5 3a1.8 1.8 0 0 1 0 3.5zM4.8 20h3.4V8.6H4.8V20zM10.2 8.6h3.2v1.6h.1c.5-.9 1.8-1.9 3.6-1.9 3.8 0 4.5 2.5 4.5 5.8V20h-3.4v-5c0-1.2 0-2.7-1.7-2.7-1.7 0-2 1.3-2 2.6V20h-3.4V8.6z"/>
  </svg>
`

const svgYoutube = `
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M21.6 7.2a3 3 0 0 0-2.1-2.1C17.6 4.6 12 4.6 12 4.6s-5.6 0-7.5.5A3 3 0 0 0 2.4 7.2 31.8 31.8 0 0 0 2 12a31.8 31.8 0 0 0 .4 4.8 3 3 0 0 0 2.1 2.1c1.9.5 7.5.5 7.5.5s5.6 0 7.5-.5a3 3 0 0 0 2.1-2.1A31.8 31.8 0 0 0 22 12a31.8 31.8 0 0 0-.4-4.8zM10 15V9l5 3-5 3z"/>
  </svg>
`

const svgMail = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2"/>
    <path d="m3 7 9 6 9-6"/>
  </svg>
`

const svgApple = `
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16.4 12.7c0-2.1 1.7-3.1 1.8-3.2-1-1.4-2.5-1.6-3-1.7-1.3-.1-2.5.8-3.2.8-.7 0-1.7-.7-2.7-.7-1.4 0-2.7.8-3.4 2.1-1.5 2.5-.4 6.3 1 8.3.7 1 1.5 2.1 2.6 2.1 1 0 1.4-.7 2.7-.7s1.6.7 2.7.6c1.1 0 1.8-1 2.5-2 .8-1.2 1.1-2.3 1.1-2.3-.1 0-2.1-.8-2.1-3.2zM14.3 6.3c.6-.7 1-1.7.9-2.7-.8 0-1.9.6-2.5 1.3-.5.6-1 1.6-.9 2.5.9.1 1.8-.4 2.5-1.1z"/>
  </svg>
`

const svgGooglePlay = `
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M3.6 2.3c-.2.2-.3.5-.3.9v17.6c0 .4.1.7.3.9l9.3-9.7L3.6 2.3z" fill="#00d2ff"/>
    <path d="M16.5 8.4 12.9 12l3.6 3.7 4.3-2.4c.6-.4.6-1.3 0-1.7l-4.3-2.4-.1.2z" fill="#ffce00"/>
    <path d="M3.6 2.3 12.9 12l3.6-3.6L5.4 1.4c-.6-.4-1.4-.2-1.8.9z" fill="#00f076"/>
    <path d="M3.6 21.7c.4 1.1 1.2 1.3 1.8.9l11.1-7-3.6-3.6-9.3 9.7z" fill="#ff3a44"/>
  </svg>
`

const heroCards = [
  {
    label: 'Ask Machinery Genius',
    description: 'Get AI Help 24/7',
    to: '/app',
    iconClass: 'text-[#2e6ef7]',
    iconSvg: svgChat,
  },
  {
    label: 'Register My Machine',
    description: 'Build Your History',
    to: '/account',
    iconClass: 'text-[#35a853]',
    iconSvg: svgHome,
  },
  {
    label: 'Find Repair Help',
    description: 'Techs & Service',
    to: '/contact',
    iconClass: 'text-[#ef8a3c]',
    iconSvg: svgWrench,
  },
  {
    label: 'Partner With Us',
    description: 'OEMs, Dealers, & Partners',
    to: '/register',
    iconClass: 'text-[#8e63d7]',
    iconSvg: svgHandshake,
  },
]

const fallbackFooterGroups: FooterGroup[] = [
  {
    key: 'platform',
    label: 'Platform',
    items: [
      { id: 'fallback-platform-1', label: 'AI Help 24/7', href: '/app', external: false, sortOrder: 1, groupKey: 'platform', groupLabel: 'Platform' },
      { id: 'fallback-platform-2', label: 'My Account', href: '/account', external: false, sortOrder: 2, groupKey: 'platform', groupLabel: 'Platform' },
      { id: 'fallback-platform-3', label: 'Pricing', href: '/pricing', external: false, sortOrder: 3, groupKey: 'platform', groupLabel: 'Platform' },
    ],
  },
  {
    key: 'resources',
    label: 'Resources',
    items: [
      { id: 'fallback-resources-1', label: 'About Us', href: '/about', external: false, sortOrder: 1, groupKey: 'resources', groupLabel: 'Resources' },
      { id: 'fallback-resources-2', label: 'Contact', href: '/contact', external: false, sortOrder: 2, groupKey: 'resources', groupLabel: 'Resources' },
      { id: 'fallback-resources-3', label: 'Machine Categories', href: '/machine-categories', external: false, sortOrder: 3, groupKey: 'resources', groupLabel: 'Resources' },
    ],
  },
  {
    key: 'company',
    label: 'Company',
    items: [
      { id: 'fallback-company-1', label: 'Trusted OEM Partners', href: '/oem-partners', external: false, sortOrder: 1, groupKey: 'company', groupLabel: 'Company' },
      { id: 'fallback-company-2', label: 'Manufacturers', href: '/manufacturers', external: false, sortOrder: 2, groupKey: 'company', groupLabel: 'Company' },
      { id: 'fallback-company-3', label: 'Feedback', href: '/feedback', external: false, sortOrder: 3, groupKey: 'company', groupLabel: 'Company' },
    ],
  },
  {
    key: 'enterprise-investors',
    label: 'Enterprise / Investors',
    items: [],
  },
  {
    key: 'legal-trust',
    label: 'Legal & Trust',
    items: [
      { id: 'fallback-legal-1', label: 'Privacy Center', href: '/privacy-policy', external: false, sortOrder: 1, groupKey: 'legal-trust', groupLabel: 'Legal & Trust' },
      { id: 'fallback-legal-2', label: 'Do Not Sell My Information', href: '/privacy-policy', external: false, sortOrder: 2, groupKey: 'legal-trust', groupLabel: 'Legal & Trust' },
      { id: 'fallback-legal-3', label: 'Sitemap', href: '/sitemap.xml', external: false, sortOrder: 3, groupKey: 'legal-trust', groupLabel: 'Legal & Trust' },
    ],
  },
]

const footerGroupOrder = [
  'platform', 'resources', 'machines', 'machine_categories', 'machine-categories',
  'manufacturers', 'company', 'enterprise-investors', 'enterprise', 'investors',
  'legal-trust', 'legal-and-trust', 'legal', 'trust',
]

const displayGroups = computed(() => {
  if (footerLoading.value) return []

  // Always use fallback as the base so static groups are never lost.
  // API groups override matching fallback keys and add new ones (machine_categories, manufacturers, etc.).
  const merged = new Map<string, FooterGroup>(fallbackFooterGroups.map(g => [g.key, g]))
  footerGroups.value.forEach(g => merged.set(g.key, g))

  return Array.from(merged.values()).sort((a, b) => {
    const ai = footerGroupOrder.indexOf(a.key)
    const bi = footerGroupOrder.indexOf(b.key)
    const an = ai === -1 ? footerGroupOrder.length : ai
    const bn = bi === -1 ? footerGroupOrder.length : bi
    return an !== bn ? an - bn : a.label.localeCompare(b.label)
  })
})

const socialLinks = [
  { label: 'Facebook', href: 'https://www.facebook.com/machinerygenius', className: 'bg-[#3b5998]', iconSvg: svgFacebook },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/adam-mattes-21193636a/', className: 'bg-[#0a66c2]', iconSvg: svgLinkedin },
  { label: 'YouTube', href: 'https://www.youtube.com/@machinerygenius', className: 'bg-[#ff0000]', iconSvg: svgYoutube },
  { label: 'Email', href: 'mailto:hello@machinerygenius.com', className: 'bg-slate-500', iconSvg: svgMail },
]

const trustStats = [
  { label: 'Trusted by Shops & Manufacturers Across the U.S.', iconSvg: svgShield },
  { label: 'Enterprise-Grade Security & Data Protection', iconSvg: svgLock },
  { label: 'Built for OEMs, Dealers, Schools & Technicians', iconSvg: svgUsers },
  { label: '24/7 AI-Powered Machinery Support', iconSvg: svgClock },
]

const scrollToTop = () => {
  const container = document.getElementById('main-content')
  if (container) {
    container.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const iconSvgForGroup = (groupKey: string) => {
  const normalized = groupKey.toLowerCase()

  if (normalized.includes('platform')) return svgMonitor
  if (normalized.includes('resource')) return svgBook
  if (normalized.includes('machine')) return svgGear
  if (normalized.includes('manufacturer')) return svgFactory
  if (normalized.includes('company')) return svgGroup
  if (normalized.includes('enterprise') || normalized.includes('investor')) return svgChart
  if (normalized.includes('legal') || normalized.includes('trust')) return svgShieldOutline
  return svgDot
}


onMounted(async () => {
  try {
    footerGroups.value = await fetchFooterGroups()
  } catch (error) {
    console.error('Failed to load footer pages:', error)
    footerGroups.value = []
  } finally {
    footerLoading.value = false
  }
})
</script>

<style scoped>
/* All footer spacing and color is controlled by utility classes. */
</style>
