<template>
<div class="max-w-6xl mx-auto px-4 py-6">

  <!-- HERO -->
  <section class="bg-gradient-to-br from-blue-50 via-white to-amber-50 border border-gray-200 rounded-2xl p-6 mb-6">
    <div class="flex items-center justify-between gap-6">
      <div class="flex-1">
        <span class="inline-flex items-center gap-2 border border-gray-200 rounded-full px-3 py-1 text-xs text-gray-600 bg-white">
          <span aria-hidden="true">📬</span><span>Contact Machinery Genius</span>
        </span>
        <h1 class="text-3xl font-bold text-gray-900 mt-4 mb-3">
          Talk to a human (we promise we're real)
        </h1>
        <p class="text-gray-600 max-w-3xl">
          Whether you're an OEM, a shop, a dealer, an investor, or you just need help getting started—send us a note.
          We'll route your message to the right team so you get answers fast.
        </p>

        <div class="flex flex-wrap gap-2 mt-4">
          <span class="border border-gray-200 rounded-full px-3 py-1 text-xs text-gray-600 bg-white cursor-pointer hover:border-blue-400">General Support</span>
          <span class="border border-gray-200 rounded-full px-3 py-1 text-xs text-gray-600 bg-white cursor-pointer hover:border-blue-400">Sales / Pricing</span>
          <span class="border border-gray-200 rounded-full px-3 py-1 text-xs text-gray-600 bg-white cursor-pointer hover:border-blue-400">Trusted OEM Partners</span>
          <span class="border border-gray-200 rounded-full px-3 py-1 text-xs text-gray-600 bg-white cursor-pointer hover:border-blue-400">Dealer Program</span>
          <span class="border border-gray-200 rounded-full px-3 py-1 text-xs text-gray-600 bg-white cursor-pointer hover:border-blue-400">Financing / Sponsored Credits</span>
          <span class="border border-gray-200 rounded-full px-3 py-1 text-xs text-gray-600 bg-white cursor-pointer hover:border-blue-400">Press / Investors</span>
        </div>

        <p class="text-xs text-gray-500 mt-3">Tip: pick a topic above to pre-fill the form.</p>
      </div>
      <img src="/assets/machinery-genius.png" alt="Machinery Genius" class="w-32 h-32 object-contain flex-shrink-0 hidden md:block" />
    </div>
  </section>

  <div class="grid lg:grid-cols-3 gap-6">

    <!-- CONTACT FORM -->
    <article class="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <h2 class="text-lg font-bold text-gray-900 mb-1">Send a message</h2>
      <p class="text-sm text-gray-600 mb-4">
        Fill this out and we'll reply as soon as possible. For account-specific issues, include the email you used to sign up.
      </p>

      <hr class="border-gray-200 mb-4" />

      <form action="/api/contact" method="post" class="space-y-4">

        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label for="name" class="block text-xs font-bold text-gray-900 mb-1">Name</label>
            <input id="name" name="name" type="text" placeholder="Your name" required
              class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label for="email" class="block text-xs font-bold text-gray-900 mb-1">Email</label>
            <input id="email" name="email" type="email" placeholder="you@company.com" required
              class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label for="company" class="block text-xs font-bold text-gray-900 mb-1">Company (optional)</label>
            <input id="company" name="company" type="text" placeholder="Shop / OEM / Dealer name"
              class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label for="topic" class="block text-xs font-bold text-gray-900 mb-1">Topic</label>
            <select id="topic" name="topic" required
              class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white">
              <option value="" selected disabled>Select a topic</option>
              <option>General Support</option>
              <option>Sales / Pricing</option>
              <option>Trusted OEM Partners</option>
              <option>Dealer Program</option>
              <option>Financing / Sponsored Credits</option>
              <option>Press / Investors</option>
            </select>
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label for="machine" class="block text-xs font-bold text-gray-900 mb-1">Machine / Brand / Model (optional)</label>
            <input id="machine" name="machine" type="text" placeholder="e.g., Amada HFE, Haas VF-2, Flow MACH 4…"
              class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label for="urgency" class="block text-xs font-bold text-gray-900 mb-1">Urgency</label>
            <select id="urgency" name="urgency" required
              class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white">
              <option value="Normal" selected>Normal</option>
              <option value="Time-sensitive">Time-sensitive</option>
              <option value="Emergency / Machine down">Emergency / Machine down</option>
            </select>
          </div>
        </div>

        <div>
          <label for="question" class="block text-xs font-bold text-gray-900 mb-1">Your question (one-liner)</label>
          <textarea id="question" name="question" rows="2"
            placeholder="Example: 'What hydraulic oil does my Accurpress 725012 take?'"
            class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y"></textarea>
          <p class="text-xs text-gray-500 mt-1">
            Suggestion: add info about your machines including <strong>model</strong> and <strong>serial numbers</strong> if available.
          </p>
        </div>

        <div>
          <label for="message" class="block text-xs font-bold text-gray-900 mb-1">Details (optional but helpful)</label>
          <textarea id="message" name="message" rows="4"
            placeholder="Share context: symptoms, error codes, controller type, voltage, photos/logs you have, what you've tried, and what 'done' looks like."
            class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y"></textarea>
        </div>

        <input type="hidden" id="source_page" name="source_page" value="contact-us" />
        <input type="hidden" id="selected_chip" name="selected_chip" value="" />

        <hr class="border-gray-200" />

        <div class="flex flex-wrap items-center justify-between gap-4">
          <p class="text-xs text-gray-500 max-w-md">
            By sending this form, you understand Machinery Genius provides informational assistance and you are responsible for verifying safety, requirements, and manufacturer specifications.
          </p>
          <div class="flex gap-2">
            <button type="submit" class="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">Send Message</button>
            <a href="/pricing" class="px-4 py-2 text-sm font-semibold text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">View Pricing</a>
          </div>
        </div>
      </form>
    </article>

    <!-- QUICK LINKS -->
    <aside class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <h2 class="text-lg font-bold text-gray-900 mb-1">Quick links</h2>
      <p class="text-sm text-gray-600 mb-4">If you're looking for a faster path, these usually help.</p>

      <hr class="border-gray-200 mb-4" />

      <!-- PHONE -->
      <div class="border border-gray-200 rounded-xl p-4 mb-4">
        <div class="flex items-center justify-between gap-3">
          <div>
            <div class="font-bold text-gray-900">Call us</div>
            <div class="text-xs text-gray-500">Mon–Fri • business hours</div>
          </div>
          <a href="tel:+16264440311" class="font-bold text-blue-600 hover:underline">(626) 444-0311</a>
        </div>
        <p class="text-xs text-gray-500 mt-2">If your machine is down after hours… tokens are the fastest path to immediate answers.</p>
      </div>

      <hr class="border-gray-200 mb-4" />

      <div class="space-y-3 text-sm">
        <div class="flex justify-between">
          <span class="text-gray-500 font-bold">Pricing</span>
          <a href="/pricing" class="font-bold text-blue-600 hover:underline">View plans & tokens →</a>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-500 font-bold">Redeem</span>
          <a href="/redeem" class="font-bold text-blue-600 hover:underline">Redeem sponsored credits →</a>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-500 font-bold">Partners</span>
          <a href="/partners" class="font-bold text-blue-600 hover:underline">Trusted OEM Partners →</a>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-500 font-bold">Support</span>
          <a href="/help" class="font-bold text-blue-600 hover:underline">General Support / Guides →</a>
        </div>
      </div>

      <hr class="border-gray-200 my-4" />

      <h3 class="font-bold text-gray-900 mb-2">For OEMs & Dealers</h3>
      <p class="text-xs text-gray-600 mb-4">
        Want to sponsor tokens, embed Machinery Genius on your site, or provide customers with manufacturer-aligned answers?
        Select <strong>Trusted OEM Partners</strong> or <strong>Dealer Program</strong> in the form topic.
      </p>

      <hr class="border-gray-200 mb-4" />

      <h3 class="font-bold text-gray-900 mb-2">For Press / Investors</h3>
      <p class="text-xs text-gray-600 mb-4">
        Media, partnerships, and investor inquiries are welcome. Select <strong>Press / Investors</strong> so we route it correctly.
      </p>

      <hr class="border-gray-200 mb-4" />

      <p class="text-xs text-gray-500">(If you're reading this at 2:00 AM with a machine down… we respect the grind.)</p>
    </aside>

  </div>

</div>
</template>

<script>
</script>

<style scoped>
/* No custom CSS - using Tailwind only */
</style>