<template>
<div class="max-w-6xl mx-auto px-4 py-6">
  <!-- HERO -->
  <section class="bg-gradient-to-br from-blue-50 via-white to-amber-50 border border-gray-200 rounded-2xl p-6 mb-6">
    <div class="flex items-center justify-between gap-6">
      <div class="flex-1">
        <span class="inline-flex items-center gap-2 border border-gray-200 rounded-full px-3 py-1 text-xs text-gray-600 bg-white">
          <span aria-hidden="true">🔧</span><span>Machine Tools</span>
        </span>
        <h1 class="text-3xl font-bold text-gray-900 mt-4 mb-3">
          Lathes - <span class="text-blue-600">AI Answers</span> for Setup, Specs, Repairs & Parts
        </h1>
        <p class="text-gray-600 max-w-3xl">
          Quickly find information about lathes - specs, power, setup, troubleshooting, and parts.
          Don't have the manual? Machinery Genius can still find what you need from trusted sources.
        </p>

        <div class="flex flex-wrap gap-2 mt-5">
          <a href="/signup.html" class="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">Ask the Genius - Free</a>
          <a href="/features/machine-garage.html" class="px-4 py-2 text-sm font-semibold text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">Save My Machines</a>
        </div>
      </div>
      <img src="/assets/machinery-genius.png" alt="Machinery Genius" class="w-32 h-32 object-contain flex-shrink-0 hidden md:block" />
    </div>
  </section>

  <!-- LATHE TYPES -->
  <section class="mb-6 min-h-[180px]">
    <div class="grid md:grid-cols-2 gap-4">
      <article class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex gap-4 items-start">
        <div class="p-2 rounded-lg bg-blue-100 text-blue-600 flex-shrink-0">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
        </div>
        <div>
          <h3 class="text-sm font-bold text-gray-900 mb-1">Lathe Types & Applications</h3>
          <p class="text-xs text-gray-600 leading-relaxed">
            <strong>Precision/Toolroom & Engine:</strong> repair and one-offs.<br>
            <strong>Gap Bed:</strong> large diameters.<br>
            <strong>Chuckers/Turret:</strong> repetitive ops.<br>
            <strong>CNC Turning:</strong> short or long runs.<br>
            <strong>Swiss:</strong> small, high-precision parts.
          </p>
        </div>
      </article>
      <article class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex gap-4 items-start">
        <div class="p-2 rounded-lg bg-blue-100 text-blue-600 flex-shrink-0">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
        </div>
        <div>
          <h3 class="text-sm font-bold text-gray-900 mb-1">Find the Right Lathe for Your Job</h3>
          <p class="text-xs text-gray-600 leading-relaxed">Compare spindle bore, HP, and travels across brands. Get recommendations based on your parts and production volume - manual or CNC.</p>
        </div>
      </article>
    </div>
  </section>

  <!-- QUESTIONS -->
  <section class="bg-gray-100 px-4 py-12 mb-10 min-h-[280px] rounded-xl">
    <h2 class="text-center text-lg font-bold text-blue-600 mb-4">Ask the Genius About Lathes</h2>
    <div class="grid md:grid-cols-3 gap-4">
      <article class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex gap-3 items-start">
        <div class="p-2 rounded-lg bg-blue-100 text-blue-600 flex-shrink-0">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        </div>
        <div>
          <h3 class="text-sm font-bold text-gray-900">How do I align my tailstock?</h3>
          <p class="text-xs text-gray-600 mt-1">Use test-bar alignment and indicator readings for precise parallelism.</p>
        </div>
      </article>
      <article class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex gap-3 items-start">
        <div class="p-2 rounded-lg bg-blue-100 text-blue-600 flex-shrink-0">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        </div>
        <div>
          <h3 class="text-sm font-bold text-gray-900">What's my spindle bore & nose?</h3>
          <p class="text-xs text-gray-600 mt-1">Identify D1/A2/L-series noses, tapers, and bore sizes by model.</p>
        </div>
      </article>
      <article class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex gap-3 items-start">
        <div class="p-2 rounded-lg bg-blue-100 text-blue-600 flex-shrink-0">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        </div>
        <div>
          <h3 class="text-sm font-bold text-gray-900">How do I stop chatter?</h3>
          <p class="text-xs text-gray-600 mt-1">Tool geometry, rigidity, feeds/speeds, and setup tips for smoother cuts.</p>
        </div>
      </article>
      <article class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex gap-3 items-start">
        <div class="p-2 rounded-lg bg-blue-100 text-blue-600 flex-shrink-0">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
        </div>
        <div>
          <h3 class="text-sm font-bold text-gray-900">Can I run on 208V?</h3>
          <p class="text-xs text-gray-600 mt-1">Check transformer taps, motor FLA, and control voltage requirements.</p>
        </div>
      </article>
      <article class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex gap-3 items-start">
        <div class="p-2 rounded-lg bg-blue-100 text-blue-600 flex-shrink-0">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/></svg>
        </div>
        <div>
          <h3 class="text-sm font-bold text-gray-900">What does it weigh for rigging?</h3>
          <p class="text-xs text-gray-600 mt-1">MG provides approximate weights, lift points, and floor load data.</p>
        </div>
      </article>
      <article class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex gap-3 items-start">
        <div class="p-2 rounded-lg bg-blue-100 text-blue-600 flex-shrink-0">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
        </div>
        <div>
          <h3 class="text-sm font-bold text-gray-900">Where do I get parts/tooling?</h3>
          <p class="text-xs text-gray-600 mt-1">Find chucks, belts, bearings, and cross-reference replacements easily.</p>
        </div>
      </article>
    </div>
  </section>

  <!-- TRUSTED BRANDS -->
  <section class="text-center my-10 mt-20 min-h-[120px]">
    <h2 class="text-lg font-bold text-blue-600 mb-2">Trusted Lathe Brands</h2>
    <p class="text-sm text-gray-600 mb-5">Ask MG for specs, setup, and repair info for top manufacturers.</p>
    <div class="flex flex-wrap gap-6 justify-center items-center">
      <!-- Placeholder for brand logos -->
      <span class="text-xs text-gray-400">--</span>
      <span class="text-xs text-gray-400">--</span>
      <span class="text-xs text-gray-400">--</span>
      <span class="text-xs text-gray-400">--</span>
      <span class="text-xs text-gray-400">--</span>
      <span class="text-xs text-gray-400">--</span>
      <span class="text-xs text-gray-400">--</span>
      <span class="text-xs text-gray-400">--</span>
    </div>
  </section>

  <!-- BUY / SELL / SERVICE -->
  <section class="min-h-[180px]">
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      <article class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex gap-3 items-start">
        <div class="p-2 rounded-lg bg-blue-100 text-blue-600 flex-shrink-0">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
        </div>
        <div>
          <h3 class="text-sm font-bold text-gray-900">Buy a Lathe</h3>
          <p class="text-xs text-gray-600 mt-1">Compare precision, gap bed, CNC, and Swiss lathes.</p>
          <a class="text-xs font-bold text-blue-600 hover:underline mt-2 inline-block" href="https://www.sterlingmachinery.com/lathes/" target="_blank">See Lathes for Sale →</a>
        </div>
      </article>
      <article class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex gap-3 items-start">
        <div class="p-2 rounded-lg bg-blue-100 text-blue-600 flex-shrink-0">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>
        </div>
        <div>
          <h3 class="text-sm font-bold text-gray-900">Sell or Trade</h3>
          <p class="text-xs text-gray-600 mt-1">Upgrade quickly with fast evaluations and trade-ins.</p>
          <a class="text-xs font-bold text-blue-600 hover:underline mt-2 inline-block" href="https://www.sterlingmachinery.com/sell-machinery" target="_blank">Sell or Trade →</a>
        </div>
      </article>
      <article class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex gap-3 items-start">
        <div class="p-2 rounded-lg bg-blue-100 text-blue-600 flex-shrink-0">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
        </div>
        <div>
          <h3 class="text-sm font-bold text-gray-900">Parts & Service</h3>
          <p class="text-xs text-gray-600 mt-1">Find replacement and maintenance parts through verified sources.</p>
          <a class="text-xs font-bold text-blue-600 hover:underline mt-2 inline-block" href="/features/parts-service.html">Request Parts →</a>
        </div>
      </article>
      <article class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex gap-3 items-start">
        <div class="p-2 rounded-lg bg-blue-100 text-blue-600 flex-shrink-0">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        </div>
        <div>
          <h3 class="text-sm font-bold text-gray-900">Financing Options</h3>
          <p class="text-xs text-gray-600 mt-1">Flexible programs for manual or CNC. Section 179-friendly.</p>
          <a class="text-xs font-bold text-blue-600 hover:underline mt-2 inline-block" href="/financing.html">Apply for Financing →</a>
        </div>
      </article>
    </div>
  </section>

  <!-- CTA BAND -->
  <section class="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center rounded-xl p-6 min-h-[140px]">
    <h3 class="text-lg font-bold">Ask Machinery Genius About Lathes</h3>
    <p class="text-sm opacity-90 mt-1">Specs, power, repairs, rigging, parts, and quick fixes - 24/7.</p>
    <a href="/signup.html" class="inline-block mt-4 px-4 py-2 text-sm font-semibold text-blue-600 bg-white rounded-lg hover:bg-gray-100 transition">Start Free</a>
  </section>
</div>
</template>

<script></script>

<style scoped>
/* No custom CSS - using Tailwind only */
</style>