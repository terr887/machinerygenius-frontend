<template>
  <div class="mg-landing bg-white text-gray-800">
    <section class="mg-hero" aria-label="Machinery Genius features hero">
      <img class="mg-avatar" src="https://chat.machinerygenius.com/assets/machinery-genius.png" alt="Machinery Genius Mascot" />
      <h1>Machinery Questions. <span class="text-blue-700">Genius Answers.</span></h1>
      <p>
        The first AI assistant built only for machinery. Get verified specs, setup guidance, quick repair tips, and more,
        plus visual recognition, predictive maintenance, AR fit, parts, and training.
      </p>
      <div class="mg-cta">

      <RouterLink to="/register" class="mg-btn-primary" aria-label="Create my free Machinery Genius account">Join the Genius - It's Free</RouterLink>
      </div>
    </section>

    <section class="mg-section bg-gray-50">
      <h2>What Machinery Genius Can Do</h2>
      <div class="mg-cardgrid">
        <article class="mg-card">
          <img class="icon" src="https://chat.machinerygenius.com/assets/machinery-genius.png" alt="AI Help (Machinery Genius mascot)" />
          <div>
            <h3>AI Help 24/7</h3>
            <p>Ask any machine question: specs, dimensions, power, setup, or quick repair tips from trusted data.</p>
          </div>
        </article>

        <article class="mg-card">
          <img class="icon" src="/assets/icons/visual-recognition.svg" alt="Visual Recognition icon" />
          <div>
            <h3>Visual Recognition</h3>
            <p>Upload a photo to identify the machine or part, then surface its key specs and compatible components.</p>
          </div>
        </article>

        <article class="mg-card">
          <img class="icon" src="/assets/icons/predictive-maintenance.svg" alt="Predictive Maintenance icon" />
          <div>
            <h3>Predictive Maintenance</h3>
            <p>Use AI to read service history and forecast wear so you can prevent downtime.</p>
          </div>
        </article>

        <article class="mg-card">
          <img class="icon" src="/assets/icons/ar-warehouse.svg" alt="AR See It In My Warehouse icon" />
          <div>
            <h3>AR "See It In My Warehouse"</h3>
            <p>Check fit and layout before you move or buy: plan doorways, aisles, and clearances.</p>
          </div>
        </article>

        <article class="mg-card">
          <img class="icon" src="/assets/icons/machine-garage.svg" alt="My Machine Garage icon" />
          <div>
            <h3>My Machine Garage</h3>
            <p>Save your equipment, track maintenance, store serials, and get reminders in one dashboard.</p>
          </div>
        </article>

        <article class="mg-card">
          <img class="icon" src="/assets/icons/parts-service.svg" alt="Parts and Service icon" />
          <div>
            <h3>Parts and Service</h3>
            <p>Find compatible mechanical, electrical, and hydraulic parts fast with trusted sources.</p>
          </div>
        </article>

        <article class="mg-card">
          <img class="icon" src="/assets/icons/repair-finder.svg" alt="Repair Tech Finder icon" />
          <div>
            <h3>Repair Tech Finder</h3>
            <p>Get matched with verified technicians by brand and model for install, troubleshooting, and repairs.</p>
          </div>
        </article>

        <article class="mg-card">
          <img class="icon" src="/assets/icons/3d-parts.svg" alt="3D Printable Parts icon" />
          <div>
            <h3>3D Printable Parts</h3>
            <p>Access validated 3D files for obsolete or custom components.</p>
          </div>
        </article>

        <article class="mg-card">
          <img class="icon" src="/assets/icons/training-setup.svg" alt="Training and Setup icon" />
          <div>
            <h3>Training and Setup Help</h3>
            <p>Step-by-step guidance for controls, offsets, G-code basics, safe first runs, and better cycle times.</p>
          </div>
        </article>

        <article class="mg-card">
          <img class="icon" src="/assets/icons/oem-support.svg" alt="OEM Partner Support icon" />
          <div>
            <h3>OEM Partner Support</h3>
            <p>Manufacturers can connect product data so customers get accurate answers through our partner program.</p>
          </div>
        </article>
      </div>
    </section>

    <section class="mg-section">
      <div class="max-w-6xl mx-auto text-center">
        <h2>Trusted by Leading OEMs and Dealers</h2>
        <p class="text-gray-600 mg-limit">
          Machinery Genius works with manufacturers, importers, and dealers worldwide, bringing their data to your fingertips.
        </p>
        <div class="mg-oem-logos">
          <!-- <img src="/assets/oem-logos/amada.png" alt="Amada" />
          <img src="/assets/oem-logos/cincinnati.png" alt="Cincinnati" />
          <img src="/assets/oem-logos/betenbender.png" alt="Betenbender" />
          <img src="/assets/oem-logos/piranha.png" alt="Piranha" />
          <img src="/assets/oem-logos/doall.png" alt="DoAll" />
          <img src="/assets/oem-logos/sharp.png" alt="Sharp" /> -->
        </div>
        <div class="mt-4">
          <a class="mg-link" href="/oem-partners.html">View All Trusted OEM Partners</a>
        </div>
      </div>
    </section>

    <section class="mg-cta-band">
      <h3>Experience the Full Power of Machinery Genius</h3>
      <p>Ask questions, identify machines, plan layouts, and track maintenance - all in one place.</p>
      <RouterLink to="/register" aria-label="Create my free Machinery Genius account">Create My Free Account</RouterLink>
    </section>

    <footer class="mg-footer">
      <p>© 2025 Machinery Genius LLC.</p>
      <p>
        All information is provided for reference. Always verify critical details with the original manufacturer.
        <a href="/disclaimer.html">Disclaimer</a>
      </p>
    </footer>
  </div>
</template>

<script>
</script>

<style scoped>
  .mg-landing { max-width: 1200px; margin: 0 auto; padding: 0 16px 40px; }
  .mg-hero { padding: 56px 16px 28px; text-align: center; }
  .mg-hero .mg-avatar { width: 96px; height: auto; margin: 0 auto 12px; }
  .mg-hero h1 { font-weight: 800; color: #0f172a; }
  .mg-hero p { color: #475569; max-width: 760px; margin: 8px auto 0; }
  .mg-cta { display: inline-block; margin-top: 18px; }

  .mg-section { padding: 40px 16px; }
  .mg-section h2 { text-align: center; color: #0f172a; font-size: 28px; font-weight: 800; margin-bottom: 18px; }
  .mg-cardgrid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; }
  .mg-card {
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 16px;
    padding: 16px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
    display: flex;
    gap: 12px;
    align-items: flex-start;
  }
  .mg-card img.icon { width: 36px; height: 36px; }
  .mg-card h3 { margin: 0 0 4px; font-size: 16px; color: #0f172a; font-weight: 700; }
  .mg-card p { margin: 0; color: #475569; font-size: 14px; line-height: 1.45; }

  .mg-oem-logos { display: flex; flex-wrap: wrap; gap: 18px; justify-content: center; align-items: center; }
  .mg-oem-logos img { height: 26px; filter: grayscale(1); opacity: 0.85; }
  .mg-link { color: #2563eb; font-weight: 700; text-decoration: none; }
  .mg-limit { max-width: 740px; margin: 8px auto 18px; }

  .mg-cta-band {
    background: #1d4ed8;
    color: #fff;
    text-align: center;
    padding: 36px 16px;
    border-radius: 18px;
    margin: 0 16px;
  }
  .mg-cta-band a {
    background: #fff;
    color: #1d4ed8;
    padding: 10px 16px;
    border-radius: 14px;
    font-weight: 700;
    display: inline-block;
    margin-top: 8px;
  }

  .mg-footer {
    background: #111827;
    color: #d1d5db;
    text-align: center;
    padding: 24px 16px;
    border-radius: 16px;
    margin: 22px 16px 0;
    font-size: 12px;
  }
  .mg-footer a { color: #93c5fd; text-decoration: none; }

  .mg-btn-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(90deg, #2563eb, #3b82f6);
    color: #fff;
    border-radius: 18px;
    padding: 10px 14px;
    font-weight: 800;
    text-decoration: none;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
    border: none;
  }
  @media (min-width: 1024px) {
    .mg-hero h1 { font-size: 44px; }
    .mg-hero p { font-size: 18px; }
  }
</style>
