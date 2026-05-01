<template>
<div class="max-w-6xl mx-auto px-4 py-6">
  <!-- HERO -->
  <section class="bg-gradient-to-br from-blue-50 via-white to-amber-50 border border-gray-200 rounded-2xl p-6 mb-6">
    <div class="flex items-center justify-between gap-6">
      <div class="flex-1">
        <span class="inline-flex items-center gap-2 border border-gray-200 rounded-full px-3 py-1 text-xs text-gray-600 bg-white">
          <span aria-hidden="true">🏭</span><span>About Us</span>
        </span>
        <h1 class="text-3xl font-bold text-gray-900 mt-4 mb-3">Powered By Unmatched Data &amp; Expertise</h1>
        <p class="text-gray-600 max-w-3xl">
          Built with experience from some of America's largest and most respected machinery companies.
          Purpose-built AI that understands the language of machining and delivers instant, reliable answers 24/7.
        </p>

        <div class="flex flex-wrap gap-2 mt-4">
          <span class="border border-gray-200 rounded-full px-3 py-1 text-xs text-gray-600 bg-white">Multilingual</span>
          <span class="border border-gray-200 rounded-full px-3 py-1 text-xs text-gray-600 bg-white">OEM‑Qualified</span>
          <span class="border border-gray-200 rounded-full px-3 py-1 text-xs text-gray-600 bg-white">Always Improving</span>
        </div>
      </div>
      <img src="/assets/machinery-genius.png" alt="Machinery Genius" class="w-32 h-32 object-contain flex-shrink-0 hidden md:block" />
    </div>
  </section>

  <!-- CARDS GRID -->
  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
    <!-- Card 1 -->
    <article class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <div class="flex items-start gap-3">
        <div class="p-2 rounded-lg bg-blue-100 text-blue-600 flex-shrink-0" aria-hidden="true">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
            <path d="M3 5v6c0 1.7 4 3 9 3s9-1.3 9-3V5"></path>
            <path d="M3 11v6c0 1.7 4 3 9 3s9-1.3 9-3v-6"></path>
          </svg>
        </div>
        <div class="flex-1">
          <span class="text-xs rounded-full bg-gray-100 px-2 py-0.5 text-gray-600 font-medium">Exclusive Data</span>
          <h3 class="mt-2 text-sm font-bold text-gray-900">Decades of Proprietary Dealer Records</h3>
          <p class="mt-1 text-xs text-gray-600">Specs, repair logs, pricing history, and insider notes you simply won't find anywhere else.</p>
        </div>
      </div>
    </article>

    <!-- Card 2 -->
    <article class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <div class="flex items-start gap-3">
        <div class="p-2 rounded-lg bg-blue-100 text-blue-600 flex-shrink-0" aria-hidden="true">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 21V9l7 4V9l7 4V5l4 2v14z"></path>
            <path d="M3 21h18"></path>
          </svg>
        </div>
        <div class="flex-1">
          <span class="text-xs rounded-full bg-gray-100 px-2 py-0.5 text-gray-600 font-medium">Manufacturer‑Backed</span>
          <h3 class="mt-2 text-sm font-bold text-gray-900">OEM Partner Support</h3>
          <p class="mt-1 text-xs text-gray-600">OEM manuals, brochures, and qualified support tools built to connect users directly with manufacturers.</p>
        </div>
      </div>
    </article>

    <!-- Card 3 -->
    <article class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <div class="flex items-start gap-3">
        <div class="p-2 rounded-lg bg-blue-100 text-blue-600 flex-shrink-0" aria-hidden="true">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="8" y="8" width="8" height="8" rx="1"></rect>
            <path d="M3 10h2M3 14h2M19 10h2M19 14h2M10 3v2M14 3v2M10 19v2M14 19v2"></path>
          </svg>
        </div>
        <div class="flex-1">
          <span class="text-xs rounded-full bg-gray-100 px-2 py-0.5 text-gray-600 font-medium">Smart AI</span>
          <h3 class="mt-2 text-sm font-bold text-gray-900">Industrial Machine Learning</h3>
          <p class="mt-1 text-xs text-gray-600">AI purpose‑built to understand machining—from G‑code to hydraulic troubleshooting and PLC logic.</p>
        </div>
      </div>
    </article>

    <!-- Card 4 -->
    <article class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <div class="flex items-start gap-3">
        <div class="p-2 rounded-lg bg-blue-100 text-blue-600 flex-shrink-0" aria-hidden="true">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 3l3 3 4 .5-2.5 3 1 4-3.5-2-3.5 2 1-4L8 6.5l4-.5z"></path>
            <circle cx="12" cy="12" r="9"></circle>
          </svg>
        </div>
        <div class="flex-1">
          <span class="text-xs rounded-full bg-gray-100 px-2 py-0.5 text-gray-600 font-medium">Pro Methods</span>
          <h3 class="mt-2 text-sm font-bold text-gray-900">Manufacturing Practices & Techniques</h3>
          <p class="mt-1 text-xs text-gray-600">Proven workflows, setup methods, quality assurance, and efficiency improvements.</p>
        </div>
      </div>
    </article>

    <!-- Card 5 -->
    <article class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <div class="flex items-start gap-3">
        <div class="p-2 rounded-lg bg-blue-100 text-blue-600 flex-shrink-0" aria-hidden="true">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14.7 6.3a5 5 0 0 0-6.4 6.4L3 18l3 3 5.3-5.3a5 5 0 0 0 6.4-6.4l-3 3z"></path>
          </svg>
        </div>
        <div class="flex-1">
          <span class="text-xs rounded-full bg-gray-100 px-2 py-0.5 text-gray-600 font-medium">Uptime Focused</span>
          <h3 class="mt-2 text-sm font-bold text-gray-900">Maintenance Experts</h3>
          <p class="mt-1 text-xs text-gray-600">Predictive insights from technician reports, real service logs, and step‑by‑step training guides.</p>
        </div>
      </div>
    </article>

    <!-- Card 6 -->
    <article class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <div class="flex items-start gap-3">
        <div class="p-2 rounded-lg bg-blue-100 text-blue-600 flex-shrink-0" aria-hidden="true">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
            <path d="M4 4v15.5A2.5 2.5 0 0 0 6.5 22H20V6a2 2 0 0 0-2-2H6.5A2.5 2.5 0 0 0 4 6.5z"></path>
          </svg>
        </div>
        <div class="flex-1">
          <span class="text-xs rounded-full bg-gray-100 px-2 py-0.5 text-gray-600 font-medium">Open References</span>
          <h3 class="mt-2 text-sm font-bold text-gray-900">Public Manuals & Specifications</h3>
          <p class="mt-1 text-xs text-gray-600">Open reference data covering parts, maintenance, and operational support.</p>
        </div>
      </div>
    </article>

    <!-- Card 7 -->
    <article class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <div class="flex items-start gap-3">
        <div class="p-2 rounded-lg bg-blue-100 text-blue-600 flex-shrink-0" aria-hidden="true">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2"></rect>
            <path d="M7 4v16M17 4v16"></path>
          </svg>
        </div>
        <div class="flex-1">
          <span class="text-xs rounded-full bg-gray-100 px-2 py-0.5 text-gray-600 font-medium">On‑Demand Training</span>
          <h3 class="mt-2 text-sm font-bold text-gray-900">Thousands of Searchable Videos</h3>
          <p class="mt-1 text-xs text-gray-600">Instant access to demonstrations, how‑to repairs, training sessions, and sales walk‑throughs.</p>
        </div>
      </div>
    </article>

    <!-- Card 8 -->
    <article class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <div class="flex items-start gap-3">
        <div class="p-2 rounded-lg bg-blue-100 text-blue-600 flex-shrink-0" aria-hidden="true">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <path d="M21 15l-5-5L5 21"></path>
          </svg>
        </div>
        <div class="flex-1">
          <span class="text-xs rounded-full bg-gray-100 px-2 py-0.5 text-gray-600 font-medium">Visual ID</span>
          <h3 class="mt-2 text-sm font-bold text-gray-900">2.3+ Million Machine Photos</h3>
          <p class="mt-1 text-xs text-gray-600">The world's largest visual archive for fast machine identification and comparisons.</p>
        </div>
      </div>
    </article>

    <!-- Card 9 -->
    <article class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <div class="flex items-start gap-3">
        <div class="p-2 rounded-lg bg-blue-100 text-blue-600 flex-shrink-0" aria-hidden="true">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        </div>
        <div class="flex-1">
          <span class="text-xs rounded-full bg-gray-100 px-2 py-0.5 text-gray-600 font-medium">Worldwide Pros</span>
          <h3 class="mt-2 text-sm font-bold text-gray-900">Global Repair Tech Database</h3>
          <p class="mt-1 text-xs text-gray-600">Comprehensive listings connecting you to verified repair professionals worldwide.</p>
        </div>
      </div>
    </article>
  </div>

  <!-- CTA -->
  <div class="flex items-center justify-between flex-wrap gap-4 bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
    <p class="text-sm text-gray-600 max-w-2xl">
      Have reputable sources or datasets that can strengthen the industry? Share them with us to help train and improve Machinery Genius™ for everyone.
    </p>
    <div class="flex gap-2">
      <a href="#" class="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">Suggest a Source</a>
      <a href="#" class="px-4 py-2 text-sm font-semibold text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">Become an OEM Partner</a>
    </div>
  </div>
</div>
</template>

<script></script>

<style scoped>
/* No custom CSS - using Tailwind only */
</style>