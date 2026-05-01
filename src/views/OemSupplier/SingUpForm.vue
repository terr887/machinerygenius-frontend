<template>
    <div class="mx-auto px-6 bg-gray-50">
        <section class="py-6">
            <div class="hero">
                <div class="hero-inner">
                    <div class="flex items-center justify-between gap-3 flex-wrap">
                        <h1 class="text-2xl font-bold leading-relaxed">Trusted OEM Partner Program</h1>
                        <span class="chip">24/7 First‑Line Support</span>
                    </div>
                    <p class="mt-2 text-gray-700 max-w-3xl">
                        Launch a multilingual, OEM‑qualified AI support portal that answers instantly, triages
                        tickets,
                        and frees your team to build the future.
                    </p>
                    <div class="chip-row mt-3">
                        <span class="chip">Secure Content Controls</span>
                        <span class="chip">Analytics &amp; Insights</span>
                        <span class="chip">White‑Label Widget</span>
                        <span class="chip">Global Multilingual</span>
                    </div>
                    <div class="mt-4 flex gap-2">
                        <a href="#oem-form"
                            class="px-3 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200">Apply
                            Now</a>
                        <a href="#benefits"
                            class="px-3 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200">See
                            Benefits</a>
                    </div>
                </div>
            </div>
        </section>

        <!-- SINGLE MARQUEE (keep this; removed mosaic) -->
        <section class="py-4">
            <div class="marquee" :aria-label="ariaLabel">
                <div class="marquee-track" ref="track">
                    <template v-for="(item, idx) in duplicatedImages" :key="`m-${idx}-${item.src}`">
                        <img :src="item.src" :alt="item.alt || item.name || 'machine'" loading="lazy"
                            @error="handleError($event, idx)" class="mx-4 max-h-20 object-contain" />
                    </template>
                </div>
            </div>
        </section>

        <!-- BENEFITS -->
        <section id="benefits" class="py-6">
            <h2 class="text-xl font-bold mb-3">Why OEMs Partner with Machinery Genius</h2>
            <div class="mg-grid">
                <article class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-semibold">24/7 First‑Line Support</h3>
                    <p class="text-gray-700 mt-2">Instant answers for routine questions (setup, lubrication, specs,
                        weights, voltages, basic troubleshooting) so your team handles fewer tickets—and more
                        complex
                        work.</p>
                </article>
                <article class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-semibold">OEM‑Qualified Knowledge</h3>
                    <p class="text-gray-700 mt-2">We train the AI on <em>your</em> approved content: brochures,
                        public
                        specs, parts info, and safely‑ingested service data—with your distribution controls
                        respected.
                    </p>
                </article>
                <article class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-semibold">“Genius Support” Website Button</h3>
                    <p class="text-gray-700 mt-2">Customers look for the Machinery Genius™ support badge on OEM
                        sites.
                        Add our button to provide immediate help and capture high‑quality leads.</p>
                </article>
                <article class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-semibold">Lower Cost‑Per‑Resolution</h3>
                    <p class="text-gray-700 mt-2">Automate repetitive Q&amp;A and triage. Free your engineers for
                        R&amp;D, upgrades, and high‑impact customer cases.</p>
                </article>
                <article class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-semibold">AR “Will It Fit” + Sales Assist</h3>
                    <p class="text-gray-700 mt-2">Help prospects preview floor fit, compare models, and get matched
                        to
                        the right machine for their production volume.</p>
                </article>
                <article class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-semibold">Predictive Maintenance Ready</h3>
                    <p class="text-gray-700 mt-2">Use technician notes and service logs to forecast failures and
                        suggest
                        preventative steps—reducing downtime in the field.</p>
                </article>
            </div>
        </section>

        <!-- ONBOARDING (modern stepper with arrows) -->
        <section class="py-6">
            <h2 class="text-xl font-bold mb-3">Fast, Secure Onboarding</h2>
            <Stepper />
        </section>

        <!-- SECURITY & CONTROL -->
        <section class="py-6">
            <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h2 class="text-xl font-bold">Security, IP &amp; Control</h2>
                <ul class="list-disc pl-6 mt-3 text-gray-700">
                    <li><strong>Permissions‑first ingestion:</strong> We only ingest what you authorize. Private
                        docs
                        are never publicly distributed by us.</li>
                    <li><strong>Answer style:</strong> AI returns guided answers and references; downloading of
                        source
                        files is restricted unless you explicitly permit it.</li>
                    <li><strong>Data isolation:</strong> Your content stays segregated and access‑controlled.</li>
                    <li><strong>Updates &amp; recalls:</strong> Model/serial mapping supports owner notifications
                        for
                        changes, updates, or upgrade kits.</li>
                    <li><strong>Compliance:</strong> We support DMCA/takedown workflows and redaction policies per
                        your
                        requirements.</li>
                </ul>
            </div>
        </section>

        <!-- OEM APPLICATION FORM -->
        <section id="oem-form" class="py-6">
            <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h2 class="text-xl font-bold">OEM Partnership Application</h2>
                <p class="text-gray-700 mt-2">Tell us about your company. We’ll follow up with pricing, onboarding,
                    and
                    best‑practice guidance.</p>
                <form action="#" method="post" class="mt-4">
                    <div class="two-col">
                        <div class="field">
                            <label class="req" for="company">Company Name</label>
                            <input id="company" name="company" type="text" required>
                        </div>
                        <div class="field">
                            <label class="req" for="contact">Contact Name</label>
                            <input id="contact" name="contact" type="text" required>
                        </div>
                        <div class="field">
                            <label class="req" for="phone">Phone</label>
                            <input id="phone" name="phone" type="tel" required>
                        </div>
                        <div class="field">
                            <label for="email">Email</label>
                            <input id="email" name="email" type="email" placeholder="you@company.com">
                            <span class="hint">Optional but recommended.</span>
                        </div>
                        <div class="field" style="grid-column:1 / -1;">
                            <label class="req" for="address">Company Address</label>
                            <textarea id="address" name="address" required></textarea>
                        </div>
                        <div class="field">
                            <label class="req" for="website">Website</label>
                            <input id="website" name="website" type="url" placeholder="https://example.com" required>
                        </div>
                        <div class="field">
                            <label for="brands">Brands / Divisions</label>
                            <input id="brands" name="brands" type="text" placeholder="e.g., ACRA, ACME Laser">
                        </div>
                        <div class="field" style="grid-column:1 / -1;">
                            <label class="req" for="products">Products Offered (describe)</label>
                            <textarea id="products" name="products" required
                                placeholder="Machine types, model families, controller platforms, capacities, etc."></textarea>
                        </div>
                    </div>

                    <div class="divider"></div>
                    <h3 class="text-lg font-semibold">Data &amp; Integration Preferences</h3>
                    <div class="mg-grid" style="margin-top:12px;">
                        <label class="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex items-start gap-3">
                            <input type="checkbox" name="pref_answers" class="mt-1">
                            <span>
                                <strong>Allow AI to generate answers</strong> from uploaded brochures, public
                                specifications,
                                and authorized service info.
                            </span>
                        </label>
                        <label class="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex items-start gap-3">
                            <input type="checkbox" name="pref_restrict" class="mt-1">
                            <span>
                                <strong>Restrict distribution</strong> of proprietary files (no downloads). Answers may
                                summarize; files remain access‑controlled.
                            </span>
                        </label>
                        <label class="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex items-start gap-3">
                            <input type="checkbox" name="pref_register" class="mt-1">
                            <span>
                                <strong>Enable product registration &amp; updates</strong> (model/serial mapping for
                                recalls,
                                upgrades, bulletins).
                            </span>
                        </label>
                        <label class="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex items-start gap-3">
                            <input type="checkbox" name="pref_widget" class="mt-1">
                            <span>
                                <strong>Add “Machinery Genius Support” button</strong> on our website (white‑label
                                widget +
                                brand styling).
                            </span>
                        </label>
                    </div>

                    <div class="mt-4 flex items-center gap-2">
                        <button type="submit"
                            class="px-3 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200">Submit
                            Application</button>
                        <a href="#benefits"
                            class="px-3 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200">Review
                            Benefits</a>
                    </div>

                    <p class="hint mt-3">By submitting, you confirm any materials are authorized for these purposes.
                        We
                        do not publicly distribute proprietary content without your explicit permission.</p>
                </form>
            </div>
        </section>

        <!-- CTA -->
        <section class="py-6">
            <div
                class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex items-center justify-between flex-wrap gap-3">
                <div>
                    <h2 class="text-xl font-bold">Ready to add the Genius Support button?</h2>
                    <p class="text-gray-700">Customers are looking for Machinery Genius™ support on OEM sites. Let’s
                        make sure yours has it.</p>
                </div>
                <a href="#oem-form"
                    class="px-3 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200">Inquire
                    for Pricing</a>
            </div>
        </section>
    </div>
</template>

<script setup>
import Stepper from '@/components/Stepper.vue'
import { ref, computed } from 'vue'


// Props
const props = defineProps({
    images: {
        type: Array,
        default: () => [
            { src: 'flow-waterjet.webp', alt: 'Flow Waterjet' },
            { src: 'cincinnati-press-brake.webp', alt: 'Cincinnati Press Brake' },
            { src: 'doall-horizontal-bandsaw.webp', alt: 'DoALL Bandsaw' },
            { src: 'knuth-drill-press.webp', alt: 'Knuth Drill Press' },
            { src: 'bridgeport-vertical-milling-machine.webp', alt: 'Bridgeport Vertical Milling Machine' }
        ]
    },
    ariaLabel: {
        type: String,
        default: 'Representative machines / manufacturers'
    },
    // optional fallback image (data URL used by default)
    fallbackSrc: {
        type: String,
        default:
            "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='120'><rect width='100%' height='100%' fill='%23f3f4f6'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-family='Arial, Helvetica, sans-serif' font-size='16'>Image not found</text></svg>"
    }
})


// Duplicate images to allow seamless looping
const duplicatedImages = computed(() => [...props.images, ...props.images])


const track = ref(null)


// If an image fails to load, replace it with fallbackSrc and remove future errors
function handleError(event, idx) {
    const img = event.target
    if (!img) return
    // avoid infinite loop if fallback is broken
    img.onerror = null
    img.src = props.fallbackSrc
    img.setAttribute('aria-hidden', 'true')
    img.classList.add('opacity-60')
}
</script>

<style scoped>
.mg-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
}

.two-col {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
}

@media (min-width:720px) {
    .two-col {
        grid-template-columns: 1fr 1fr;
    }
}

.field {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.field input,
.field textarea {
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 10px 12px;
    font: inherit;
    background: #fff;
    color: #0f172a;
}

.field textarea {
    min-height: 120px;
}

.req::after {
    content: ' *';
    color: #dc2626;
    font-weight: 600;
}

.hint {
    font-size: 12px;
    color: #6b7280;
}

.divider {
    height: 1px;
    background: #e5e7eb;
    margin: 20px 0;
}

/* ===== Hero ===== */
.hero {
    position: relative;
    overflow: hidden;
    background: linear-gradient(180deg, #f8fafc 0%, #ffffff 65%, #f8fafc 100%);
    border: 1px solid #e5e7eb;
    border-radius: 20px;
}

.hero::before {
    content: '';
    position: absolute;
    inset: -20% -10% auto auto;
    height: 280px;
    width: 120%;
    background: radial-gradient(800px 240px at 15% 0%, rgba(37, 99, 235, .15), transparent 60%),
        radial-gradient(600px 220px at 85% 100%, rgba(245, 158, 11, .14), transparent 60%);
    pointer-events: none;
}

.hero-inner {
    position: relative;
    padding: 24px;
}

.chip {
    border: 1px solid #e5e7eb;
    padding: 6px 12px;
    border-radius: 999px;
    font-size: 12px;
    color: #475569;
    background: #fff;
}

.chip-row {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}

/* ===== Single marquee (keep, no mosaic) ===== */
.marquee {
    overflow: hidden;
    border: 1px solid #e5e7eb;
    border-radius: 16px;
    background: #fff;
}

.marquee-track {
    display: flex;
    gap: 24px;
    padding: 12px;
    animation: scroll 22s linear infinite;
}

.marquee-track img {
    height: 56px;
    object-fit: contain;
    filter: grayscale(30%);
    opacity: .95;
}

@keyframes scroll {
    from {
        transform: translateX(0)
    }

    to {
        transform: translateX(-50%)
    }
}

/* ===== Onboarding stepper with arrows (wraps on smaller screens) ===== */
.stepper {
    display: grid;
    grid-template-columns: repeat(6, minmax(180px, 1fr));
    gap: 12px;
}

.step {
    position: relative;
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 14px;
    padding: 14px;
    box-shadow: 0 6px 20px rgba(2, 6, 23, .06);
}

.badge {
    display: inline-grid;
    place-items: center;
    width: 28px;
    height: 28px;
    border-radius: 999px;
    color: #fff;
    font-weight: 700;
    font-size: 14px;
    box-shadow: inset 0 2px 6px rgba(255, 255, 255, .25);
}

.b-blue {
    background: radial-gradient(120% 120% at 30% 30%, #2563eb 0%, #1d4ed8 60%, #0b72ff 100%);
}

.b-gold {
    background: radial-gradient(120% 120% at 30% 30%, #f59e0b 0%, #d97706 60%, #ffcd45 100%);
}

.b-red {
    background: radial-gradient(120% 120% at 30% 30%, #dc2626 0%, #b91c1c 60%, #ff5d5d 100%);
}

.b-slate {
    background: radial-gradient(120% 120% at 30% 30%, #64748b 0%, #475569 60%, #334155 100%);
}

.step h4 {
    margin: 0 0 6px;
    font-size: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.step p {
    margin: 0;
    color: #475569;
    font-size: 13px;
}

.step:not(:last-child)::after {
    content: '';
    position: absolute;
    right: -8px;
    top: 50%;
    width: 14px;
    height: 2px;
    background: #cbd5e1;
    transform: translateY(-50%);
}

.step:not(:last-child)::before {
    content: '';
    position: absolute;
    right: -8px;
    top: 50%;
    border-left: 6px solid #cbd5e1;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    transform: translate(6px, -50%);
}

@media (max-width:1000px) {
    .stepper {
        grid-template-columns: 1fr 1fr;
    }

    .step:not(:last-child)::after,
    .step:not(:last-child)::before {
        display: none;
    }
}

@media (max-width:640px) {
    .stepper {
        grid-template-columns: 1fr;
    }
}
</style>