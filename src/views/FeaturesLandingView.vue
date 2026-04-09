<template>
<div class="max-w-6xl mx-auto px-4 py-6">
  <!-- HERO -->
  <section class="bg-gradient-to-br from-blue-50 via-white to-amber-50 border border-gray-200 rounded-2xl p-6 mb-6">
    <div class="flex items-center justify-between gap-6">
      <div class="flex-1">
        <span class="inline-flex items-center gap-2 border border-gray-200 rounded-full px-3 py-1 text-xs text-gray-600 bg-white">
          <span aria-hidden="true">⚡</span><span>AI-Powered Machinery Support</span>
        </span>
        <h1 class="text-3xl font-bold text-gray-900 mt-4 mb-3">
          Machinery Questions. <span class="text-blue-600">Genius Answers.</span>
        </h1>
        <p class="text-gray-600 max-w-3xl">
          The first AI assistant built only for machinery. Get verified specs, setup guidance, quick repair tips, and more,
          plus visual recognition, predictive maintenance, AR fit, parts, and training.
        </p>

        <div class="flex flex-wrap gap-2 mt-4">
          <span class="border border-gray-200 rounded-full px-3 py-1 text-xs text-gray-600 bg-white cursor-pointer hover:border-blue-400">AI Help 24/7</span>
          <span class="border border-gray-200 rounded-full px-3 py-1 text-xs text-gray-600 bg-white cursor-pointer hover:border-blue-400">Visual Recognition</span>
          <span class="border border-gray-200 rounded-full px-3 py-1 text-xs text-gray-600 bg-white cursor-pointer hover:border-blue-400">Predictive Maintenance</span>
          <span class="border border-gray-200 rounded-full px-3 py-1 text-xs text-gray-600 bg-white cursor-pointer hover:border-blue-400">Parts & Service</span>
          <span class="border border-gray-200 rounded-full px-3 py-1 text-xs text-gray-600 bg-white cursor-pointer hover:border-blue-400">Training & Setup</span>
        </div>

        <div class="flex gap-2 mt-5">
          <RouterLink to="/register" class="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">Join the Genius - It's Free</RouterLink>
        </div>
      </div>
      <img src="/assets/machinery-genius.png" alt="Machinery Genius" class="w-32 h-32 object-contain flex-shrink-0 hidden md:block" />
    </div>
  </section>

  <!-- FEATURES GRID -->
  <section class="mb-6">
    <h2 class="text-center text-lg font-bold text-gray-900 mb-4">What Machinery Genius Can Do</h2>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      <article class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex gap-4 items-start">
        <div class="p-2 rounded-lg bg-blue-100 text-blue-600 flex-shrink-0">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
        </div>
        <div>
          <h3 class="text-sm font-bold text-gray-900 mb-1">AI Help 24/7</h3>
          <p class="text-xs text-gray-600">Ask any machine question: specs, dimensions, power, setup, or quick repair tips from trusted data.</p>
        </div>
      </article>

      <article class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex gap-4 items-start">
        <div class="p-2 rounded-lg bg-blue-100 text-blue-600 flex-shrink-0">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
        </div>
        <div>
          <h3 class="text-sm font-bold text-gray-900 mb-1">Visual Recognition</h3>
          <p class="text-xs text-gray-600">Upload a photo to identify the machine or part, then surface its key specs and compatible components.</p>
        </div>
      </article>

      <article class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex gap-4 items-start">
        <div class="p-2 rounded-lg bg-blue-100 text-blue-600 flex-shrink-0">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
        </div>
        <div>
          <h3 class="text-sm font-bold text-gray-900 mb-1">Predictive Maintenance</h3>
          <p class="text-xs text-gray-600">Use AI to read service history and forecast wear so you can prevent downtime.</p>
        </div>
      </article>

      <article class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex gap-4 items-start">
        <div class="p-2 rounded-lg bg-blue-100 text-blue-600 flex-shrink-0">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
        </div>
        <div>
          <h3 class="text-sm font-bold text-gray-900 mb-1">AR "See It In My Warehouse"</h3>
          <p class="text-xs text-gray-600">Check fit and layout before you move or buy: plan doorways, aisles, and clearances.</p>
        </div>
      </article>

      <article class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex gap-4 items-start">
        <div class="p-2 rounded-lg bg-blue-100 text-blue-600 flex-shrink-0">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
        </div>
        <div>
          <h3 class="text-sm font-bold text-gray-900 mb-1">My Machine Garage</h3>
          <p class="text-xs text-gray-600">Save your equipment, track maintenance, store serials, and get reminders in one dashboard.</p>
        </div>
      </article>

      <article class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex gap-4 items-start">
        <div class="p-2 rounded-lg bg-blue-100 text-blue-600 flex-shrink-0">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
        </div>
        <div>
          <h3 class="text-sm font-bold text-gray-900 mb-1">Parts and Service</h3>
          <p class="text-xs text-gray-600">Find compatible mechanical, electrical, and hydraulic parts fast with trusted sources.</p>
        </div>
      </article>

      <article class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex gap-4 items-start">
        <div class="p-2 rounded-lg bg-blue-100 text-blue-600 flex-shrink-0">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
        </div>
        <div>
          <h3 class="text-sm font-bold text-gray-900 mb-1">Repair Tech Finder</h3>
          <p class="text-xs text-gray-600">Get matched with verified technicians by brand and model for install, troubleshooting, and repairs.</p>
        </div>
      </article>

      <article class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex gap-4 items-start">
        <div class="p-2 rounded-lg bg-blue-100 text-blue-600 flex-shrink-0">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"/></svg>
        </div>
        <div>
          <h3 class="text-sm font-bold text-gray-900 mb-1">3D Printable Parts</h3>
          <p class="text-xs text-gray-600">Access validated 3D files for obsolete or custom components.</p>
        </div>
      </article>

      <article class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex gap-4 items-start">
        <div class="p-2 rounded-lg bg-blue-100 text-blue-600 flex-shrink-0">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
        </div>
        <div>
          <h3 class="text-sm font-bold text-gray-900 mb-1">Training and Setup Help</h3>
          <p class="text-xs text-gray-600">Step-by-step guidance for controls, offsets, G-code basics, safe first runs, and better cycle times.</p>
        </div>
      </article>

      <article class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex gap-4 items-start">
        <div class="p-2 rounded-lg bg-blue-100 text-blue-600 flex-shrink-0">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
        </div>
        <div>
          <h3 class="text-sm font-bold text-gray-900 mb-1">OEM Partner Support</h3>
          <p class="text-xs text-gray-600">Manufacturers can connect product data so customers get accurate answers through our partner program.</p>
        </div>
      </article>
    </div>
  </section>

  <!-- TRUSTED OEMs -->
  <section class="text-center mb-6">
    <h2 class="text-lg font-bold text-gray-900 mb-2">Trusted by Leading OEMs and Dealers</h2>
    <p class="text-sm text-gray-600 mb-5 max-w-2xl mx-auto">
      Machinery Genius works with manufacturers, importers, and dealers worldwide, bringing their data to your fingertips.
    </p>
    <div class="flex flex-wrap gap-6 justify-center items-center">
      <!-- Placeholder for OEM logos -->
      <span class="text-xs text-gray-400">--</span>
      <span class="text-xs text-gray-400">--</span>
      <span class="text-xs text-gray-400">--</span>
      <span class="text-xs text-gray-400">--</span>
      <span class="text-xs text-gray-400">--</span>
      <span class="text-xs text-gray-400">--</span>
    </div>
    <a href="/oem-partners.html" class="text-sm font-bold text-blue-600 hover:underline mt-4 inline-block">View All Trusted OEM Partners →</a>
  </section>

  <!-- CTA BAND -->
  <section class="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center rounded-xl p-6 mb-6">
    <h3 class="text-lg font-bold">Experience the Full Power of Machinery Genius</h3>
    <p class="text-sm opacity-90 mt-1">Ask questions, identify machines, plan layouts, and track maintenance - all in one place.</p>
    <RouterLink to="/register" class="inline-block mt-4 px-4 py-2 text-sm font-semibold text-blue-600 bg-white rounded-lg hover:bg-gray-100 transition">Create My Free Account</RouterLink>
  </section>

  <!-- FOOTER -->
  <footer class="bg-gray-900 text-gray-300 text-center rounded-xl p-5 text-xs">
    <p>© 2025 Machinery Genius LLC.</p>
    <p class="mt-2">
      All information is provided for reference. Always verify critical details with the original manufacturer.
      <a href="/disclaimer.html" class="text-blue-400 hover:underline ml-1">Disclaimer</a>
    </p>
  </footer>
</div>
</template>

<script>
</script>

<style scoped>
/* No custom CSS - using Tailwind only */
</style>
