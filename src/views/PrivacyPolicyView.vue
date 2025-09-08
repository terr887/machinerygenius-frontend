<template>
  <div class="bg-gray-50">
    <div class="max-w-3xl mx-auto px-4 py-10"> <!-- NARROWER CONTAINER -->
      <!-- Header -->
      <header class="mb-8">
        <h1 class="text-2xl md:text-3xl font-extrabold text-gray-900">Privacy & Use Policy</h1>
        <p class="mt-2 text-sm text-gray-600">
          Effective date: <time :dateTime="effectiveDateISO">{{ effectiveDateDisplay }}</time>
        </p>
      </header>

      <main>
        <!-- Use prose-sm and max-w-prose so typography plugin controls line-length -->
        <article class="prose prose-sm max-w-5xl">
          <section id="privacy">
            <h2>1. Privacy & Data Consent</h2>
            <p>
              By using Machinery Genius, you consent to our collection, storage, and processing of your interactions in
              accordance with applicable data protection laws. Chat streams, uploaded files, and metadata may be stored
              and analyzed to provide responses, improve service quality, and develop new features.
            </p>
            <p>
              We do not sell your personal information. Data may be shared with trusted service providers and partners
              solely to operate and maintain the platform. Where applicable, you retain rights under local data
              protection
              laws (e.g., access, correction, deletion) — contact us to exercise those rights.
            </p>
          </section>

          <section id="sources">
            <h2>2. Information Source & Limitations</h2>
            <p>
              Machinery Genius is an AI-powered informational tool. It is intended to help users find and evaluate
              information — it is <strong>not</strong> a substitute for a certified technician, engineer, or consultant.
            </p>
            <ul>
              <li>The system can make mistakes, omit details, or provide outdated recommendations.</li>
              <li>Always verify critical information (weights, capacities, voltages, lubrication, repair steps, etc.)
                with the machine manufacturer’s official documentation or a qualified professional.</li>
              <li>If you request information for a machine from a manufacturer we do not support, we will direct you to
                contact the manufacturer directly.</li>
            </ul>
          </section>

          <section id="safety">
            <h2>3. Safety First — Always</h2>
            <ul>
              <li>Follow all manufacturer safety instructions and OSHA or applicable regulatory safety procedures.</li>
              <li>Turn the machine OFF and disconnect it from power before performing any inspection, maintenance, or
                repair.</li>
              <li>All electrical work must be performed by a licensed, certified electrician.</li>
              <li>Do not bypass or disable safety guards, interlocks, or protective devices.</li>
            </ul>
          </section>

          <section id="risk">
            <h2>4. Use at Your Own Risk</h2>
            <p>
              All content and guidance is provided “as-is” without warranties of any kind. You assume full
              responsibility
              for any actions you take based on information from this platform. Machinery Genius and its affiliates are
              not responsible for outcomes resulting from your reliance on the information.
            </p>
          </section>

          <section id="accuracy">
            <h2>5. No Guarantees of Accuracy</h2>
            <p>
              While we strive for accuracy and safety, we make no guarantees that content is complete, correct, legal,
              or safe for your specific use case. Always confirm details with official machine documentation or an
              appropriately qualified expert.
            </p>
          </section>

          <section id="no-advice">
            <h2>6. No Professional Advice</h2>
            <p>
              This service does not provide legal, medical, electrical, or formal engineering advice. Any content that
              appears professional must be validated by a suitably licensed human professional before you rely on it.
            </p>
          </section>

          <section id="liability">
            <h2>7. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Machinery Genius, its owners, partners, and affiliates will not be
              liable for injuries, damages, downtime, financial loss, or other consequences arising from use of the
              platform. By using this service, you release us from any claims related to reliance on the information
              provided.
            </p>
          </section>

          <section id="updates">
            <h2>8. Updates to This Policy</h2>
            <p>
              We may update this Privacy & Use Policy periodically. We will post the revised effective date at the top
              of
              this page. Continued use of the platform after an update constitutes acceptance of the updated policy.
            </p>
          </section>
          <!-- 
          <section id="contact">
            <h2>9. Contact</h2>
            <p>
              If you have questions or requests regarding this policy or your data rights, contact us at:
              <a class="text-blue-600 hover:underline" href="mailto:support@machinerygenius.com">support@machinerygenius.com</a>.
            </p>
          </section> -->
        </article>
      </main>
    </div>
  </div>
</template>

<script setup>
const effectiveDateISO = '2025-07-01'
const effectiveDateDisplay = new Date(effectiveDateISO).toLocaleDateString()
</script>

<style scoped>
/* Optional fine-tune: make H2 a bit smaller and tighten spacing */
@layer components {
  .prose h2 {
    font-size: 1.05rem;
    /* ~16.8px */
    margin-top: 1.25rem;
    margin-bottom: 0.5rem;
    line-height: 1.25;
  }

  .prose p {
    margin-bottom: 0.85rem;
  }

  /* smaller bullets spacing */
  .prose ul>li {
    margin-bottom: 0.35rem;
  }
}
</style>
