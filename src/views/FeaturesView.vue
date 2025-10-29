<template>
<div class="bg-white text-gray-800 mg-features">
  <!-- HERO -->
  <section class="hero text-center py-10">
    <img src="https://chat.machinerygenius.com//assets/machinery-genius.png" alt="Machinery Genius Mascot" />
    <h1 class="text-2xl md:text-3xl font-bold text-blue-700 mt-2">Machinery Genius Features</h1>
    <p class="muted">Small, fast, and focused — everything you need to ask, diagnose, plan, and maintain machinery smarter.</p>
  </section>

  <!-- FEATURE GRID -->
  <section class="max-w-6xl mx-auto px-4 pb-10">
    <div class="grid">

      <div class="card">
        <img src="/assets/icons/ai-help.svg" alt="AI Help" />
        <h3>AI Help — 24/7 Answers</h3>
        <p>Ask for specs, setup steps, and quick fixes for any machine — verified from trusted technical data sources.</p>
      </div>

      <div class="card">
        <img src="/assets/icons/visual-recognition.svg" alt="Visual Recognition" />
        <h3>Visual Recognition</h3>
        <p>Upload a photo to identify your machine or part. Find matching specs, capacities, and compatible components instantly.</p>
      </div>

      <div class="card">
        <img src="/assets/icons/predictive-maintenance.svg" alt="Predictive Maintenance" />
        <h3>Predictive Maintenance</h3>
        <p>Analyze service data to predict wear, schedule preventive maintenance, and reduce downtime before it happens.</p>
      </div>

      <div class="card">
        <img src="/assets/icons/machine-garage.svg" alt="My Machine Garage" />
        <h3>My Machine Garage™</h3>
        <p>Save all your equipment in one secure dashboard. Track maintenance, store serials, and get update alerts.</p>
      </div>

      <div class="card">
        <img src="/assets/icons/ar-warehouse.svg" alt="AR See It In My Warehouse" />
        <h3>AR “See It In My Warehouse”</h3>
        <p>Visualize machines in your space before buying or moving them. Check fit, clearance, and rigging layout via AR.</p>
      </div>

      <div class="card">
        <img src="/assets/icons/repair-finder.svg" alt="Repair Tech Finder" />
        <h3>Repair Tech Finder</h3>
        <p>Connect with verified technicians by brand, model, and location for installation, troubleshooting, and service.</p>
      </div>

      <div class="card">
        <img src="/assets/icons/3d-parts.svg" alt="3D Printable Parts" />
        <h3>3D Printable Parts</h3>
        <p>Access a growing database of validated 3D parts for obsolete or custom machine components — powered by Sterling 3D Creative.</p>
      </div>

      <div class="card">
        <img src="/assets/icons/training-setup.svg" alt="Training & Setup Help" />
        <h3>Training & Setup Help</h3>
        <p>Step-by-step guidance for controls, offsets, G-code basics, and safe first-run operation for every skill level.</p>
      </div>

      <div class="card">
        <img src="/assets/icons/parts-service.svg" alt="Parts & Service Support" />
        <h3>Parts & Service Support</h3>
        <p>Find mechanical, electrical, and hydraulic parts faster. Get verified data and supplier options in one place.</p>
      </div>

      <div class="card">
        <img src="/assets/icons/oem-support.svg" alt="OEM Partner Support" />
        <h3>OEM Partner Support</h3>
        <p>Manufacturers can securely connect product data to provide accurate AI answers for their customers through our Trusted OEM Partner program.</p>
      </div>

    </div>
  </section>

  <!-- CTA -->
  <section class="max-w-4xl mx-auto px-4">
    <div class="cta">
      <h2 class="text-xl font-semibold mb-2">Ready to Try the Genius?</h2>
      <p class="mb-3" style="opacity:.9">Ask questions, identify machines, plan layouts, and track maintenance — all in one platform.</p>
      <a href="/signup.html">Join Free</a>
    </div>
  </section>
 </div> 
</template>
<script></script>
<style scoped>
  .mg-features { --pad:16px; --radius:16px; }
    .mg-features .hero img { width:72px; height:auto; }
    .mg-features .grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:14px; }
    .mg-features .card { background:#fff; border:1px solid #e5e7eb; border-radius:var(--radius); padding:var(--pad); box-shadow:0 1px 2px rgba(0,0,0,.04); text-align:left; }
    .mg-features .card h3 { margin:8px 0 6px; font-size:15px; font-weight:700; color:#1d4ed8; }
    .mg-features .card p { font-size:13px; color:#475569; line-height:1.45; }
    .mg-features .card img { width:42px; height:42px; margin-bottom:6px; }
    .mg-features .cta { text-align:center; padding:28px 0; background:#1d4ed8; color:#fff; border-radius:18px; margin-top:40px; }
    .mg-features .cta a { background:#fff; color:#1d4ed8; padding:8px 14px; border-radius:14px; font-weight:600; display:inline-block; }
    .mg-features .muted { color:#64748b; font-size:14px; max-width:760px; margin:6px auto 0; }
	  svg { fill:none; stroke:currentColor; color:#1d4ed8; }
</style>