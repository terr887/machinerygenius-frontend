<template>
    <div class="mx-auto px-6 bg-gray-50">

        <!-- ================= HERO ================= -->
        <section class="py-6">
            <div class="container mx-auto px-6">
                <div class="hero">
                    <div class="hero-inner">
                        <div class="flex items-center justify-between gap-3 flex-wrap">
                            <div>
                                <div class="kicker">Genius OEM Official Partner</div>
                                <h1 class="text-2xl font-bold leading-relaxed">Parmigiani Plate & Angle Rolls — 24/7
                                    Support, Specs &amp; OEM Partner Portal</h1>
                            </div>
                            <span class="chip">AI-Powered • Multilingual</span>
                        </div>

                        <p class="mt-2 text-gray-700 max-w-3xl">
                            Machinery Genius supports <strong>Parmigiani plate rolls</strong> (VBH 4-roll, TBH 3-roll,
                            PCO variable-axis)
                            and <strong>PLANET angle/section rolls</strong>. Compare capacities, explore
                            <strong>STRADIVARI® CNC</strong>, get programming & troubleshooting tips,
                            watch training, source parts & service, and preview fit with AR.
                        </p>

                        <div class="chip-row mt-3">
                            <span class="chip">Instant Answers</span>
                            <span class="chip">Parts &amp; Upgrades</span>
                            <span class="chip">Model Comparisons</span>
                            <span class="chip">AR Fit-Checks</span>
                        </div>

                        <!-- CTA buttons (same classes as Acra template) -->
                        <div class="mt-4 flex gap-2 flex-wrap">
                            <a href="#ask-ai"
                                class="bg-gradient-to-r from-blue-600 to-blue-500 px-3 py-2 bg-blue-600 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200">
                                AskAI: Parmigiani Support
                            </a>
                            <RouterLink to="/register"
                                class="px-3 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200">
                                Register Your Machine
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
                            <strong>Included with new Parmigiani purchases:</strong> Free Machinery Genius Basic for
                            registered machines.
                            Most questions are free with signup + registration. Deeper access plans available for larger
                            teams.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- ============== Marquee (swap image filenames) ============== -->
        <section class="py-4">
            <div class="container mx-auto px-6">
                <div class="marquee" aria-label="Parmigiani machines">
                    <div class="track">
                        <template v-for="num in 11" :key="num">
                            <img :src="`/assets/images/paramigiani/${1000 + num}.jpg`" :alt="`Machine ${1000 + num}`"
                                loading="lazy" class="mx-4 max-h-20 object-contain" @error="handleError($event, num)" />
                        </template>
                    </div>
                </div>
            </div>
        </section>

        <!-- ============== Why / Included ============== -->
        <section class="py-4">
            <div class="container mx-auto px-6">
                <div class="mg-grid">
                    <article class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                        <h2 class="text-lg font-semibold">Why Parmigiani Stands Out</h2>
                        <ul class="list-disc pl-6 mt-2 list">
                            <li><strong>VBH 4-roll</strong> for shortest flats & high single-pass productivity.</li>
                            <li><strong>TBH 3-roll double-pinch</strong> with independent lower rolls for prebend on
                                both edges.</li>
                            <li><strong>PCO variable-axis</strong> moves all three rolls; works thin-to-heavy plate with
                                safer horizontal handling.</li>
                            <li><strong>PLANET angle rolls</strong> with 3 driven rolls & six-direction guides for
                                precision & twist control.</li>
                        </ul>
                    </article>

                    <article class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                        <h2 class="text-lg font-semibold">Included with New Purchases</h2>
                        <ul class="list-disc pl-6 mt-2 list">
                            <li><strong>Free Machinery Genius Basic</strong> for your registered machine</li>
                            <li>24/7 first-line answers for ranges, setup, safety & maintenance</li>
                            <li>Quick access to training videos and “Will-It-Fit” AR visualizations</li>
                            <li>Guided routing to the right Carell/Parmigiani contact for complex issues</li>
                        </ul>
                        <p class="note mt-2">Need more? Upgrade to deeper access plans for fleets, teams and advanced
                            troubleshooting.</p>
                    </article>
                </div>
            </div>
        </section>

        <!-- ============== Plate Rolls (VBH • TBH • PCO) ============== -->
        <section class="py-4" id="plate-rolls">
            <div class="container mx-auto px-6">
                <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                    <h2 class="text-xl font-bold">Parmigiani Plate Rolls — VBH • TBH • PCO</h2>
                    <p class="mt-2 text-gray-700">
                        <strong>VBH 4-roll</strong> → shortest flats, fast single-pass production.
                        <strong>TBH 3-roll</strong> → double-pinch geometry; prebend both edges in one insertion.
                        <strong>PCO variable-axis</strong> → both lower rolls move horizontally and the top roll
                        vertically; ideal across thin-to-heavy plate while the sheet stays horizontal.
                    </p>

                    <div class="mt-4" style="overflow:auto;">
                        <table class="mg-table" aria-label="Plate roll ranges">
                            <thead>
                                <tr>
                                    <th>Family</th>
                                    <th>Type</th>
                                    <th>Typical Range</th>
                                    <th>Best For</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>VBH</td>
                                    <td>4-roll double-pinch</td>
                                    <td>Up to ~12″ × ~26′ (model-dependent)</td>
                                    <td>Shortest flats, high-speed single-pass production</td>
                                </tr>
                                <tr>
                                    <td>TBH</td>
                                    <td>3-roll double-pinch</td>
                                    <td>~0.05–6″ × 1–26′</td>
                                    <td>Prebending both edges; general job-shop versatility</td>
                                </tr>
                                <tr>
                                    <td>PCO</td>
                                    <td>3-roll variable-axis</td>
                                    <td>~0.25–12″ × 3–26′</td>
                                    <td>Mixed workloads, better safety & control, thin-to-heavy plate</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Programming & Troubleshooting (Plate Rolls) -->
                    <div class="two-col mt-4">
                        <div>
                            <h3 class="font-semibold">Programming / Operation (Plate)</h3>
                            <ul class="list-disc pl-6 mt-2 text-gray-700">
                                <li>Sequence: <em>prebend #1 → roll body → prebend #2 → close shell</em></li>
                                <li>Target diameter is influenced by thickness, yield, and unbent flat</li>
                                <li>Cones: program small-end offset, taper angle, and incremental passes</li>
                                <li>Use side supports & plate followers to reduce edge droop on thin sheet</li>
                            </ul>
                        </div>
                        <div>
                            <h3 class="font-semibold">Troubleshooting (Plate)</h3>
                            <ul class="list-disc pl-6 mt-2 text-gray-700">
                                <li>Flat too long → increase pinching force or prebend depth; check roll parallelism
                                </li>
                                <li>Banana/conicity → check entry alignment, pass count, and pinch balance</li>
                                <li>Out-of-round → add calibration passes; verify material springback assumption</li>
                                <li>Skidding/slip → confirm surface condition, drive torque & correct lubricant</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ============== Angle / Section Rolls (PLANET) ============== -->
        <section class="py-4" id="angle-rolls">
            <div class="container mx-auto px-6">
                <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                    <h2 class="text-xl font-bold">PLANET — Angle / Section Rolls</h2>
                    <p class="mt-2 text-gray-700">
                        Three driven rolls deliver torque/traction; <strong>six-direction lateral guides</strong> manage
                        twist. Options: beam-on-edge (x-x),
                        spiral/coil devices, pipe & tube tooling, and calibrating attachments for roundness.
                    </p>

                    <div class="mt-4" style="overflow:auto;">
                        <table class="mg-table" aria-label="Angle roll ranges">
                            <thead>
                                <tr>
                                    <th>Material</th>
                                    <th>Example Capability</th>
                                    <th>Notes</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Beams / Channels</td>
                                    <td>Models to ~44″ beams (x-x with accessories)</td>
                                    <td>Guide rolls control web/flange twist; beam-on-edge kits available</td>
                                </tr>
                                <tr>
                                    <td>Pipe / Tube</td>
                                    <td>Pipe to ~24″ (model-dependent)</td>
                                    <td>Calibrating devices improve roundness on thin-wall material</td>
                                </tr>
                                <tr>
                                    <td>Angles / Flats / Special Sections</td>
                                    <td>Large section modulus (models to ~1100 in³)</td>
                                    <td>Tooling for equal/unequal angle, flats leg-in/leg-out, half-pipe & spirals</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Programming & Troubleshooting (Angle) -->
                    <div class="two-col mt-4">
                        <div>
                            <h3 class="font-semibold">Programming / Operation (Angle)</h3>
                            <ul class="list-disc pl-6 mt-2 text-gray-700">
                                <li>Set guide rolls to support the free leg/flange; start with shallow forming passes
                                </li>
                                <li>Coiling/spiral: enable pitch control; verify lead-in cutoff allowance</li>
                                <li>Beam x-x: use beam-on-edge device; watch web buckling threshold</li>
                            </ul>
                        </div>
                        <div>
                            <h3 class="font-semibold">Troubleshooting (Angle)</h3>
                            <ul class="list-disc pl-6 mt-2 text-gray-700">
                                <li>Twist in angle/pipe → adjust lateral guides; check roll skew & pass symmetry</li>
                                <li>Ovality → add calibrating passes or use dedicated calibration tooling</li>
                                <li>Under-radius → increase pass count; verify section modulus vs. machine rating</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ============== CNC & Controls (for Plate + Angle) ============== -->
        <section class="py-4" id="cnc">
            <div class="container mx-auto px-6">
                <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                    <h2 class="text-xl font-bold">CNC & Control Options</h2>
                    <div class="two-col">
                        <div>
                            <h3 class="font-semibold">STRADIVARI® CNC</h3>
                            <ul class="list-disc pl-6 mt-2 text-gray-700">
                                <li><strong>3D visualization</strong> of the program and part</li>
                                <li>Automatic <strong>prebend / rolling / squaring</strong> sequences</li>
                                <li>Libraries for <strong>cones</strong>, multi-radius parts & repetition jobs</li>
                                <li>On-screen help and <strong>remote diagnostics</strong> (on supported models)</li>
                            </ul>
                        </div>
                        <div>
                            <h3 class="font-semibold">SAVE & BEND / FAST (Simplified)</h3>
                            <ul class="list-disc pl-6 mt-2 text-gray-700">
                                <li>Teach & repeat for proven parts and daily production</li>
                                <li>Operator prompts for step-by-step sequences and target diameters</li>
                                <li>Ideal when you want consistency without full CAD/CAM</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ============== Videos ============== -->
        <section class="py-4" id="videos">
            <div class="container mx-auto px-6">
                <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                    <h2 class="text-xl font-bold">Helpful Parmigiani Videos & Training</h2>
                    <div class="two-col">
                        <div>
                            <h3 class="font-semibold">Plate Rolls</h3>
                            <ul class="list-disc pl-6 mt-2 text-gray-700">
                                <li><a href="#" class="text-blue-700 underline">VBH: Single-Pass Productivity & Short
                                        Flats</a></li>
                                <li><a href="#" class="text-blue-700 underline">PCO: Variable-Axis Prebend & Safety</a>
                                </li>
                                <li><a href="#" class="text-blue-700 underline">TBH: Double-Pinch Setup Sequence</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 class="font-semibold">Angle / Section Rolls</h3>
                            <ul class="list-disc pl-6 mt-2 text-gray-700">
                                <li><a href="#" class="text-blue-700 underline">PLANET: Beam on x-x Axis (On-Edge)</a>
                                </li>
                                <li><a href="#" class="text-blue-700 underline">Spiraling Device & Calibration Tips</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <p class="mt-2 text-gray-700">👉 Full video library available on MachineryTube.com</p>
                </div>
            </div>
        </section>

        <!-- ============== Sample Q&A Blocks (Plate / Angle / CNC) ============== -->
        <section class="py-4" id="ask-ai">
            <div class="container mx-auto px-6">
                <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                    <h2 class="text-xl font-bold">Sample Questions You Can Ask Machinery Genius</h2>

                    <div class="two-col mt-2">
                        <div>
                            <h3 class="font-semibold">Plate Rolls (VBH • TBH • PCO)</h3>
                            <ul class="list-disc pl-6 mt-2 text-gray-700">
                                <li>How do I size a roll for <em>AR400</em> vs <em>A36</em> at my target diameter?</li>
                                <li>How do I reduce the <em>unbent flat</em> on a VBH 4-roll?</li>
                                <li>PCO: why is horizontal rolling safer for our long thin shells?</li>
                                <li>TBH: what’s the correct double-pinch sequence for cones?</li>
                            </ul>
                        </div>
                        <div>
                            <h3 class="font-semibold">Angle / Section Rolls (PLANET)</h3>
                            <ul class="list-disc pl-6 mt-2 text-gray-700">
                                <li>How do I control angle-leg twist when rolling leg-out?</li>
                                <li>What tooling do I need for spiral stair stringers?</li>
                                <li>How many calibration passes for 3″ sch40 pipe at 24″ DIA?</li>
                                <li>Beam x-x: what’s the minimum recommended radius on our model?</li>
                            </ul>
                        </div>
                    </div>

                    <div class="two-col mt-4">
                        <div>
                            <h3 class="font-semibold">CNC / Programming</h3>
                            <ul class="list-disc pl-6 mt-2 text-gray-700">
                                <li>How do I program STRADIVARI® for multi-radius shells?</li>
                                <li>What’s the best cone macro for a 10° taper, 40″ small-end?</li>
                                <li>How do I teach a repeat job with SAVE & BEND?</li>
                                <li>Best practice to store & back up rolling recipes?</li>
                            </ul>
                        </div>
                        <div>
                            <a href="#"
                                class="bg-gradient-to-r from-blue-600 to-blue-500 px-3 py-2 bg-blue-600 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200">Ask
                                AI Now</a>
                            <p class="note mt-2">Most questions are free once you sign up and register your machine.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ============== Parts / Register / Sell ============== -->
        <section class="py-4" id="parts">
            <div class="container mx-auto px-6">
                <div class="mg-grid">
                    <article class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                        <h3 class="text-lg font-semibold">Find Parts & Service</h3>
                        <ul class="list-disc pl-6 mt-2 text-gray-700">
                            <li>Source replacement parts (mechanical, hydraulic, electrical)</li>
                            <li>Connect with certified repair technicians in your region</li>
                            <li>Access verified electrical service companies (220V, 440V, 480V, 3-phase)</li>
                        </ul>
                        <div class="mt-3 flex gap-2 flex-wrap">
                            <a href="#"
                                class="px-3 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200">
                                Find a Parmigiani Repair Tech
                            </a>
                            <a href="#"
                                class="px-3 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200">
                                Request a Part
                            </a>
                        </div>
                    </article>

                    <article class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm" id="register">
                        <h3 class="text-lg font-semibold">Register Your Parmigiani Machine</h3>
                        <p class="mt-2 text-gray-700">Get recalls & safety notices, product updates, and trade-in
                            options.</p>
                        <div class="mt-3">
                            <RouterLink to="/register"
                                class="inline-block px-3 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200">
                                Register Your Machine
                            </RouterLink>
                        </div>
                        <div class="mt-4" id="sell">
                            <h4 class="font-semibold">Sell or Trade Your Machine</h4>
                            <ul class="list-disc pl-6 mt-2 text-gray-700">
                                <li>Sell directly from your shop</li>
                                <li>Competitive consignment options</li>
                                <li>Trade-in toward new Parmigiani machinery</li>
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

        <!-- ============== Compare ============== -->
        <section class="py-4">
            <div class="container mx-auto px-6">
                <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                    <h2 class="text-xl font-bold">Compare Parmigiani Machines Side by Side</h2>
                    <ul class="list-disc pl-6 mt-2 text-gray-700">
                        <li>Compare VBH vs TBH vs PCO ranges and minimum diameters</li>
                        <li>Review specs, dimensions, and capacity across families</li>
                        <li>Training videos for each family</li>
                        <li>Use AR to visualize machines in your facility</li>
                    </ul>
                    <div class="mt-3">
                        <a href="#specs"
                            class="px-3 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200">
                            Start Comparing
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- ============== Contact OEM (Carell) ============== -->
        <section class="py-4" id="contact-oem">
            <div class="container mx-auto px-6">
                <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                    <h2 class="text-xl font-bold">Contact Carell — OEM Manufacturer / Importer</h2>
                    <p class="mt-2 text-gray-700">We’ll route you to the appropriate Carell representative for warranty
                        questions, service, or factory upgrades.</p>
                    <div class="mt-3 flex gap-2 flex-wrap">
                        <a href="https://www.carellcorp.com" target="_blank" rel="noopener"
                            class="px-3 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200">Contact
                            OEM Manufacturer</a>
                        <RouterLink to="/register"
                            class="px-3 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200">Register
                            Your
                            Machine</RouterLink>
                    </div>
                    <p class="note mt-2">T 251.937.0947 • F 251.937.4742 • PO Box 99, 34225 US Hwy. 31, Stapleton, AL
                        36578 • Web: carellcorp.com</p>
                </div>
            </div>
        </section>

        <!-- ============== Safety & Footer CTA ============== -->
        <section class="py-4">
            <div class="container mx-auto px-6">
                <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                    <h2 class="text-xl font-bold">Safety Disclaimer</h2>
                    <p class="mt-2 text-gray-700">
                        Machinery Genius is not a substitute for OEM training or certified technicians. Always follow
                        Parmigiani/Carell documentation,
                        OSHA safety guidelines, and consult qualified electricians before connecting or maintaining
                        machinery. Use at your own risk.
                    </p>
                </div>
            </div>
        </section>

        <section class="py-6">
            <div class="container mx-auto px-6">
                <div
                    class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex items-center justify-between flex-wrap gap-3">
                    <div>
                        <h2 class="text-xl font-bold">Need Help Right Now?</h2>
                        <p class="text-gray-700">Call / Text: <strong>626-444-0311</strong> &nbsp; · &nbsp; Email:
                            <strong>support@machinerygenius.com</strong>
                        </p>
                    </div>
                    <a href="#ask-ai"
                        class="bg-gradient-to-r from-blue-600 to-blue-500 px-3 py-2 bg-blue-600 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200">
                        Ask Machinery Genius Now
                    </a>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
    images: {
        type: Array,
        default: () => [
            { src: 'paramigiani_VBH.webp', alt: 'VBH 4-roll' },
            { src: 'paramigiani_TBH.webp', alt: 'TBH 3-roll' },
            { src: 'paramigiani_PCO.webp', alt: 'PCO variable-axis' },
            { src: 'paramigiani_PLANET.webp', alt: 'PLANET angle roll' },
        ]
    },
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

const duplicatedImages = computed(() => [...props.images, ...props.images])
const track = ref(null)

function handleError(event, idx) {
    const img = event.target
    if (!img) return
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

.list {
    color: #374151;
}

/* Hero & chips (exact look as template) */
.hero {
    position: relative;
    overflow: hidden;
    background: linear-gradient(180deg, #f8fafc 0%, #fff 65%, #f8fafc 100%);
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

/* Scrolling marquee (swap images below) */
.marquee {
    overflow: hidden;
    border: 1px solid #e5e7eb;
    border-radius: 16px;
    background: #fff;
}

.track {
    display: flex;
    gap: 24px;
    padding: 12px;
    animation: scroll 22s linear infinite;
}

.track img {
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

/* Table look (same as template) */
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