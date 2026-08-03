<template>
    <div class="mx-auto px-6 bg-gray-50">
        <section class="py-6">
            <div class="hero">
                <div class="hero-inner">
                    <div class="flex items-center justify-between gap-3 flex-wrap">
                        <div>
                            <div class="kicker">Genius OEM Official Partner</div>
                            <h1 class="text-2xl font-bold leading-relaxed">Acra Machinery – 24/7 Support, Specs
                                &amp;
                                OEM Partner Portal</h1>
                        </div>
                        <span class="chip">AI-Powered • Multilingual</span>
                    </div>
                    <p class="mt-2 text-gray-700 max-w-3xl">
                        Machinery Genius provides AI-powered support and resources for Acra Machinery equipment
                        worldwide. From precision lathes and vertical mills to bandsaws, grinders, and drill
                        presses,
                        Acra has been a trusted manufacturer for decades.
                    </p>
                    <div class="chip-row mt-3">
                        <span class="chip">Instant Answers</span>
                        <span class="chip">Parts &amp; Upgrades</span>
                        <span class="chip">Model Comparisons</span>
                        <span class="chip">AR Fit-Checks</span>
                    </div>
                    <div class="mt-4 cta-row">
                        <a href="#ask-ai"
                            class="px-3 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200">
                            AskAI: Acra Support
                        </a>
                        <RouterLink to="/register"
                            class="px-3 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200">
                            Register Your Acra
                        </RouterLink>
                        <a href="#parts"
                            class="px-3 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200">
                            Find Parts &amp; Repair Techs
                        </a>
                        <a href="#contact-oem"
                            class="px-3 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200">
                            Contact OEM Manufacturer
                        </a>
                    </div>
                    <p class="note mt-2">
                        <strong>Included with new Acra purchases:</strong> Free Machinery Genius Basic for the
                        registered machine.
                        Most questions are free with signup + machine registration. Deeper access plans are
                        available
                        for teams that need more.
                    </p>
                </div>
            </div>
        </section>

        <!-- SINGLE MARQUEE -->
        <section class="py-4">
            <div class="marquee" :aria-label="ariaLabel">
                <div class="marquee-track" ref="track">
                    <template v-for="num in 19" :key="num">
                        <img :src="`/assets/images/acra/${1000 + num}.png`" :alt="`Machine ${1000 + num}`"
                            loading="lazy" class="mx-4 max-h-20 object-contain" @error="handleError($event, num)" />
                    </template>
                </div>
            </div>
        </section>

        <!-- SPOTLIGHT: WHY ACRA -->
        <section class="py-4">
            <div class="mg-grid">
                <article class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                    <h2 class="text-lg font-semibold">Why Acra Machines Stand Out</h2>
                    <ul class="list-disc pl-6 mt-2 list">
                        <li>Proven performance across <strong>lathes, mills, bandsaws, grinders, and drill
                                presses</strong>.</li>
                        <li>Versatile configurations with practical controls that shops trust.</li>
                        <li>Reliable parts availability and a strong global support footprint.</li>
                        <li>Value-forward options for schools, job shops, and production floors.</li>
                    </ul>
                </article>
                <article class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                    <h2 class="text-lg font-semibold">Included with New Acra Purchases</h2>
                    <ul class="list-disc pl-6 mt-2 list">
                        <li><strong>Free Machinery Genius Basic</strong> for your registered Acra machine.</li>
                        <li>24/7 first-line answers for specs, lubrication, setup, and maintenance.</li>
                        <li>Quick access to training videos and “Will-It-Fit” AR visualizations.</li>
                        <li>Guided routing to the right Acra contact for complex issues.</li>
                    </ul>
                    <p class="note mt-2">Need more? Upgrade to deeper access plans for multi-machine fleets, teams,
                        and
                        advanced troubleshooting.</p>
                </article>
            </div>
        </section>

        <!-- WAYS WE HELP ACRA OWNERS -->
        <section class="py-4">
            <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h2 class="text-xl font-bold">Ways We Help Acra Owners</h2>
                <div class="mg-grid mt-2">
                    <ul class="list-disc pl-6 list">
                        <li><strong>Repairs:</strong> step-by-step guidance and referrals to certified technicians.
                        </li>
                        <li><strong>Upgrades:</strong> find controllers, DROs, guards, coolant systems, and more.
                        </li>
                        <li><strong>Parts:</strong> request mechanical, hydraulic, and electrical components.</li>
                    </ul>
                    <ul class="list-disc pl-6 list">
                        <li><strong>Sales & Trade-Ins:</strong> sell from your floor, consignment options, or trade
                            toward new Acra.</li>
                        <li><strong>Installation & Training:</strong> setup checklists and video resources.</li>
                        <li><strong>Moving & Rigging:</strong> instant mover quotes using weights & dimensions.</li>
                    </ul>
                </div>
                <div class="mt-3 cta-row">
                    <a href="#parts"
                        class="px-3 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200">
                        Request a Part
                    </a>
                    <a href="#movers"
                        class="px-3 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200">
                        Find a Mover
                    </a>
                    <a href="#sell"
                        class="px-3 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200">
                        Sell / Trade-In
                    </a>
                </div>
            </div>
        </section>

        <!-- CONTACT OEM / IMPORTER -->
        <section class="py-4" id="contact-oem">
            <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h2 class="text-xl font-bold">Contact Acra — OEM Manufacturer / Importer</h2>
                <p class="mt-2 text-gray-700">We’ll route you to the appropriate Acra representative (by region and
                    machine type) for warranty questions, authorized service, or factory upgrades.</p>
                <div class="mt-3 cta-row">
                    <a href="#"
                        class="px-3 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200">
                        Contact OEM Now
                    </a>
                    <a href="#register"
                        class="px-3 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200">
                        Register Your Machine
                    </a>
                </div>
                <p class="note mt-2">Most questions are answered free with Machinery Genius signup and machine
                    registration. For complex issues, we connect you directly with the proper Acra contact.</p>
            </div>
        </section>

        <!-- WEIGHTS & DIMENSIONS -->
        <section class="py-4" id="specs">
            <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h2 class="text-xl font-bold">Acra Machinery Weights & Dimensions (Quick Reference)</h2>
                <p class="note mt-1">Example models shown — your team can expand this table from catalog.</p>
                <div class="mt-3" style="overflow:auto;">
                    <table class="mg-table">
                        <thead>
                            <tr>
                                <th>Machine Type</th>
                                <th>Model</th>
                                <th>Swing / Capacity</th>
                                <th>Approx. Weight</th>
                                <th>Footprint (L × W)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Engine Lathe</td>
                                <td>Acra 16×40</td>
                                <td>16&quot; swing, 40&quot; centers</td>
                                <td>3,200 lbs</td>
                                <td>80&quot; × 40&quot;</td>
                            </tr>
                            <tr>
                                <td>Vertical Mill</td>
                                <td>Acra LCM-42</td>
                                <td>9&quot; × 42&quot; table</td>
                                <td>2,500 lbs</td>
                                <td>60&quot; × 63&quot;</td>
                            </tr>
                            <tr>
                                <td>Bandsaw</td>
                                <td>Acra ABS-350</td>
                                <td>13.7&quot; capacity</td>
                                <td>2,000 lbs</td>
                                <td>80&quot; × 35&quot;</td>
                            </tr>
                            <tr>
                                <td>Surface Grinder</td>
                                <td>Acra ASM-618</td>
                                <td>6&quot; × 18&quot; table</td>
                                <td>1,400 lbs</td>
                                <td>65&quot; × 40&quot;</td>
                            </tr>
                            <tr>
                                <td>Drill Press</td>
                                <td>Acra RDM-25</td>
                                <td>1&quot; drill capacity</td>
                                <td>650 lbs</td>
                                <td>24&quot; × 20&quot;</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="mt-3 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                    <strong>Tip:</strong> Knowing weights and dimensions before moving prevents costly damage. Use
                    our
                    rigger/mover finder for instant quotes.
                    <div class="mt-2">
                        <a href="#movers"
                            class="px-3 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200">
                            Find a Mover
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- VIDEOS & TRAINING -->
        <section class="py-4" id="videos">
            <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h2 class="text-xl font-bold">Helpful Acra Videos & Training</h2>
                <ul class="list-disc pl-6 mt-2 text-gray-700">
                    <li><a href="#" class="text-blue-700 underline">Watch Acra Vertical Mill Setup</a></li>
                    <li><a href="#" class="text-blue-700 underline">See an Acra Lathe in Action</a></li>
                    <li><a href="#" class="text-blue-700 underline">Blade Change on Acra Bandsaw</a></li>
                    <li><a href="#" class="text-blue-700 underline">Surface Grinder Safety Tips</a></li>
                </ul>
                <p class="mt-2 text-gray-700">👉 Full video library available on MachineryTube.com</p>
            </div>
        </section>

        <!-- FAQ / SAMPLE QUESTIONS -->
        <section class="py-4" id="ask-ai">
            <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h2 class="text-xl font-bold">Sample Questions You Can Ask Machinery Genius About Acra</h2>
                <ul class="list-disc pl-6 mt-2 text-gray-700">
                    <li>What oil should I use in my Acra vertical mill head?</li>
                    <li>How do I adjust backlash on an Acra lathe?</li>
                    <li>What's the electrical requirement for the Acra ABS-350 bandsaw?</li>
                    <li>Where can I order Acra lathe replacement gears?</li>
                    <li>What's the shipping weight of an Acra LCM-42 mill?</li>
                    <li>How do I align the head on an Acra knee mill?</li>
                    <li>What coolant is recommended for Acra grinders?</li>
                </ul>
                <div class="mt-3">
                    <a href="#"
                        class="px-3 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200">Ask
                        AI Now</a>
                </div>
                <p class="note mt-2">Most questions are free once you sign up and register your machine.</p>
            </div>
        </section>

        <!-- PARTS & SERVICE / REGISTER / SELL -->
        <section class="py-4" id="parts">
            <div class="container mx-auto px-6">
                <div class="mg-grid">
                    <article class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                        <h3 class="text-lg font-semibold">Find Parts & Service</h3>
                        <ul class="list-disc pl-6 mt-2 text-gray-700">
                            <li>Search and order replacement parts (mechanical, hydraulic, electrical).</li>
                            <li>Connect with certified repair technicians in your region.</li>
                            <li>Access verified service companies for electrical hookup (220V, 440V, 480V 3-phase).</li>
                        </ul>
                        <div class="mt-3 cta-row">
                            <a href="#"
                                class="px-3 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200">
                                Find an Acra Repair Tech

                            </a>
                            <a href="#"
                                class="px-3 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200">
                                Request a Part
                            </a>
                        </div>
                    </article>
                    <article class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm" id="register">
                        <h3 class="text-lg font-semibold">Register Your Acra Machine</h3>
                        <p class="mt-2 text-gray-700">
                            Stay updated with recalls, safety updates, new product releases, and trade-in opportunities.
                        </p>
                        <div class="mt-3">
                            <RouterLink to="/register"
                                class="inline-block px-3 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200">
                                Register Your Machine
                            </RouterLink>
                        </div>
                        <div class="mt-4" id="sell">
                            <h4 class="font-semibold">Sell or Trade Your Acra Machine</h4>
                            <ul class="list-disc pl-6 mt-2 text-gray-700">
                                <li>Sell directly from your shop</li>
                                <li>Competitive consignment options</li>
                                <li>Trade-in toward new Acra machinery</li>
                            </ul>
                            <div class="mt-3">
                                <a href="#"
                                    class="px-3 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200">
                                    Sell Your Machine
                                </a>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </section>

        <!-- COMPARE MACHINES -->
        <section class="py-4" id="compare">
            <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h2 class="text-xl font-bold">Compare Acra Machines Side by Side</h2>
                <ul class="list-disc pl-6 mt-2 text-gray-700">
                    <li>Specs, dimensions, and capacity</li>
                    <li>Ergonomics and control layouts</li>
                    <li>Training videos for each model</li>
                    <li>AR test-fit to see machines in your facility</li>
                </ul>
                <div class="mt-3">
                    <a href="#"
                        class="px-3 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200">Start
                        Comparing</a>
                </div>
            </div>
        </section>

        <!-- SAFETY DISCLAIMER -->
        <section class="py-4">
            <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h2 class="text-xl font-bold">Safety Disclaimer</h2>
                <p class="mt-2 text-gray-700">
                    Machinery Genius is not a substitute for OEM training or certified technicians. Always follow
                    Acra’s
                    official manuals,
                    OSHA safety guidelines, and consult qualified electricians before connecting or maintaining
                    machinery.
                    Information is provided as a helpful guide only — use at your own risk.
                </p>
            </div>
        </section>

        <!-- CONTACT / CTA -->
        <section class="py-6">
            <div
                class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex items-center justify-between flex-wrap gap-3">
                <div>
                    <h2 class="text-xl font-bold">Need Help Right Now?</h2>
                    <p class="text-gray-700">Call / Text: <strong>626-444-0311</strong> &nbsp; · &nbsp; Email:
                        <strong>support@machinerygenius.com</strong>
                    </p>
                </div>
                <a href="#ask-ai"
                    class="px-3 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200">Ask
                    Machinery Genius Now</a>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
    ariaLabel: {
        type: String,
        default: 'Representative machines / manufacturers'
    },
    fallbackSrc: {
        type: String,
        default:
            "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='120'><rect width='100%' height='100%' fill='%23f3f4f6'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-family='Arial, Helvetica, sans-serif' font-size='16'>Image not found</text></svg>"
    }
})

const track = ref(null)

function handleError(event, idx) {
    const img = event.target
    if (!img) return
    img.onerror = null
    img.src = img.src.replace('.png', '.jpg')
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

.kicker {
    letter-spacing: .18em;
    text-transform: uppercase;
    font-size: 12px;
    color: #64748b
}

.note {
    font-size: 13px;
    color: #475569;
}

.cta-row {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}

.list {
    color: #374151;
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
    background:
        radial-gradient(800px 240px at 15% 0%, rgba(37, 99, 235, .15), transparent 60%),
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

/* ===== Single marquee (keep; no mosaic below) ===== */
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
    filter: grayscale(20%);
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

/* ===== Table ===== */
table.mg-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    overflow: hidden;
    border-radius: 14px;
    border: 1px solid #e5e7eb;
    background: #fff;
}

table.mg-table th,
table.mg-table td {
    padding: 12px 14px;
    text-align: left;
}

table.mg-table thead th {
    background: #f8fafc;
    font-weight: 700;
    color: #0f172a;
    border-bottom: 1px solid #e5e7eb;
}

table.mg-table tbody tr:not(:last-child) td {
    border-bottom: 1px solid #f1f5f9;
}
</style>