<template>
   <div style="max-width:1100px;margin:0 auto;padding:26px 16px;">

    <!-- HERO -->
    <section class="mg-hero">
      <div class="mg-badge"><span aria-hidden="true">📬</span><span>Contact Machinery Genius</span></div>
      <h1 style="font-size:40px;line-height:1.05;letter-spacing:-0.03em;margin:14px 0 10px 0;">
        Talk to a human (we promise we’re real)
      </h1>
      <p style="font-size:16px;color:#374151;margin:0;max-width:900px;">
        Whether you’re an OEM, a shop, a dealer, an investor, or you just need help getting started—send us a note.
        We’ll route your message to the right team so you get answers fast.
      </p>

      <div class="mg-chips" style="margin-top:14px;">
        <span class="mg-chip" data-topic="General Support" aria-pressed="false">General Support</span>
        <span class="mg-chip" data-topic="Sales / Pricing" aria-pressed="false">Sales / Pricing</span>
        <span class="mg-chip" data-topic="Trusted OEM Partners" aria-pressed="false">Trusted OEM Partners</span>
        <span class="mg-chip" data-topic="Dealer Program" aria-pressed="false">Dealer Program</span>
        <span class="mg-chip" data-topic="Financing / Sponsored Credits" aria-pressed="false">Financing / Sponsored Credits</span>
        <span class="mg-chip" data-topic="Press / Investors" aria-pressed="false">Press / Investors</span>
      </div>

      <div class="mg-small" style="margin-top:10px;">
        Tip: pick a topic above to pre-fill the form.
      </div>
    </section>

    <section style="margin-top:18px;">
      <div class="mg-grid">

        <!-- CONTACT FORM -->
        <article class="mg-card">
          <h2 class="mg-section-title">Send a message</h2>
          <p class="mg-muted" style="margin:0;">
            Fill this out and we’ll reply as soon as possible. For account-specific issues, include the email you used to sign up.
          </p>

          <div class="mg-divider"></div>

          <!-- Replace action/method with your backend endpoint -->
          <form class="mg-form" action="/api/contact" method="post">

            <div class="mg-row">
              <div>
                <label for="name">Name</label>
                <input class="mg-input" id="name" name="name" type="text" placeholder="Your name" required />
              </div>
              <div>
                <label for="email">Email</label>
                <input class="mg-input" id="email" name="email" type="email" placeholder="you@company.com" required />
              </div>
            </div>

            <div class="mg-row">
              <div>
                <label for="company">Company (optional)</label>
                <input class="mg-input" id="company" name="company" type="text" placeholder="Shop / OEM / Dealer name" />
              </div>
              <div>
                <label for="topic">Topic</label>
                <select class="mg-select" id="topic" name="topic" required>
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

            <div class="mg-row">
              <div>
                <label for="machine">Machine / Brand / Model (optional)</label>
                <input class="mg-input" id="machine" name="machine" type="text" placeholder="e.g., Amada HFE, Haas VF-2, Flow MACH 4…" />
              </div>
              <div>
                <label for="urgency">Urgency</label>
                <select class="mg-select" id="urgency" name="urgency" required>
                  <option value="Normal" selected>Normal</option>
                  <option value="Time-sensitive">Time-sensitive</option>
                  <option value="Emergency / Machine down">Emergency / Machine down</option>
                </select>
              </div>
            </div>

            <!-- NEW: QUESTION BOX -->
            <label for="question">Your question (one-liner)</label>
            <textarea class="mg-textarea short" id="question" name="question"
              placeholder="Example: ‘What hydraulic oil does my Accurpress 725012 take?’"></textarea>
            <div class="mg-small" style="margin-top:6px;">
              Suggestion: add info about your machines including <strong>model</strong> and <strong>serial numbers</strong> if available.
            </div>

            <label for="message" style="margin-top:14px;">Details (optional but helpful)</label>
            <textarea class="mg-textarea" id="message" name="message"
              placeholder="Share context: symptoms, error codes, controller type, voltage, photos/logs you have, what you’ve tried, and what ‘done’ looks like."></textarea>

            <!-- Helpful hidden context fields -->
            <input type="hidden" id="source_page" name="source_page" value="contact-us" />
            <input type="hidden" id="selected_chip" name="selected_chip" value="" />

            <div class="mg-divider"></div>

            <div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:space-between;">
              <div class="mg-small" style="max-width:620px;">
                By sending this form, you understand Machinery Genius provides informational assistance and you are responsible for verifying safety,
                requirements, and manufacturer specifications.
              </div>
              <div style="display:flex;gap:10px;flex-wrap:wrap;">
                <button class="mg-btn-primary" type="submit">Send Message</button>
                <a class="mg-btn-ghost" href="/pricing">View Pricing</a>
              </div>
            </div>
          </form>
        </article>

        <!-- QUICK CONTACT + LINKS -->
        <aside class="mg-card">
          <h2 class="mg-section-title">Quick links</h2>
          <p class="mg-muted" style="margin:0;">
            If you’re looking for a faster path, these usually help.
          </p>

          <div class="mg-divider"></div>

          <!-- NEW: PHONE NUMBER -->
          <div class="mg-callout">
            <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;">
              <div>
                <div style="font-weight:900;">Call us</div>
                <div class="mg-small">Mon–Fri • business hours</div>
              </div>
              <div style="font-weight:900;">
                <a href="tel:+16264440311" style="text-decoration:none;color:#2563eb;">(626) 444-0311</a>
              </div>
            </div>
            <div class="mg-small" style="margin-top:8px;">
              If your machine is down after hours… tokens are the fastest path to immediate answers.
            </div>
          </div>

          <div class="mg-divider"></div>

          <div class="mg-kv">
            <div class="k">Pricing</div>
            <div class="v"><a href="/pricing" style="text-decoration:none;font-weight:800;color:#2563eb;">View plans & tokens →</a></div>

            <div class="k">Redeem</div>
            <div class="v"><a href="/redeem" style="text-decoration:none;font-weight:800;color:#2563eb;">Redeem sponsored credits →</a></div>

            <div class="k">Partners</div>
            <div class="v"><a href="/partners" style="text-decoration:none;font-weight:800;color:#2563eb;">Trusted OEM Partners →</a></div>

            <div class="k">Support</div>
            <div class="v"><a href="/help" style="text-decoration:none;font-weight:800;color:#2563eb;">General Support / Guides →</a></div>
          </div>

          <div class="mg-divider"></div>

          <h3 style="margin:0 0 8px 0;font-size:16px;font-weight:900;">For OEMs & Dealers</h3>
          <p class="mg-small" style="margin:0;">
            Want to sponsor tokens, embed Machinery Genius on your site, or provide customers with manufacturer-aligned answers?
            Select <strong>Trusted OEM Partners</strong> or <strong>Dealer Program</strong> in the form topic.
          </p>

          <div class="mg-divider"></div>

          <h3 style="margin:0 0 8px 0;font-size:16px;font-weight:900;">For Press / Investors</h3>
          <p class="mg-small" style="margin:0;">
            Media, partnerships, and investor inquiries are welcome. Select <strong>Press / Investors</strong> so we route it correctly.
          </p>

          <div class="mg-divider"></div>

          <p class="mg-small" style="margin:0;">
            (If you’re reading this at 2:00 AM with a machine down… we respect the grind.)
          </p>
        </aside>

      </div>
    </section>

  </div>
</template>
<script>
  // Chip-to-topic helper (no dependencies)
    (function () {
      const chips = document.querySelectorAll(".mg-chip");
      const topic = document.getElementById("topic");
      const selectedChip = document.getElementById("selected_chip");

      chips.forEach(chip => {
        chip.addEventListener("click", () => {
          // Toggle pressed state
          const isPressed = chip.getAttribute("aria-pressed") === "true";

          chips.forEach(c => c.setAttribute("aria-pressed", "false"));
          chip.setAttribute("aria-pressed", isPressed ? "false" : "true");

          const val = isPressed ? "" : (chip.getAttribute("data-topic") || "");

          // Set form topic + hidden field
          if (val) {
            const options = Array.from(topic.options);
            const match = options.find(o => o.text === val);
            if (match) topic.value = match.text;
            selectedChip.value = val;
          } else {
            topic.value = "";
            selectedChip.value = "";
          }

          // Scroll gently to form
          document.querySelector(".mg-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      });
    })();
</script>
<style scoped>
 /* Minimal, scoped helpers (per MG build rules) */
    .mg-grid { display:grid; grid-template-columns: repeat(auto-fit, minmax(280px,1fr)); gap:20px; }
    .mg-hero {
      background: linear-gradient(135deg, rgba(37,99,235,0.10), rgba(245,158,11,0.08));
      border: 1px solid rgba(229,231,235,1);
      border-radius: 24px;
      padding: 28px;
      box-shadow: 0 1px 2px rgba(0,0,0,0.04);
    }
    .mg-card {
      background:#fff; border:1px solid #e5e7eb; border-radius:24px;
      padding:24px; box-shadow:0 1px 2px rgba(0,0,0,0.04);
    }
    .mg-badge {
      display:inline-flex; align-items:center; gap:8px;
      border:1px solid #e5e7eb; border-radius:999px;
      padding:6px 12px; font-size:12px; color:#4b5563; background:#fff;
    }
    .mg-section-title { font-size: 22px; font-weight: 800; margin: 0 0 10px 0; letter-spacing: -0.01em; }
    .mg-muted { color:#6b7280; }
    .mg-small { font-size:12px; color:#6b7280; line-height: 1.45; }
    .mg-divider { height:1px; background:#e5e7eb; margin:16px 0; }

    /* Form styling that still matches mg_css “white card” look */
    .mg-form label { display:block; font-size:12px; font-weight:800; color:#111827; margin: 10px 0 6px; }
    .mg-input, .mg-select, .mg-textarea {
      width:100%;
      border:1px solid #e5e7eb;
      border-radius: 16px;
      padding: 10px 12px;
      font-size:14px;
      outline:none;
      background:#fff;
      color:#111827;
    }
    .mg-textarea { min-height: 120px; resize: vertical; }
    .mg-textarea.short { min-height: 74px; }
    .mg-row { display:grid; grid-template-columns: 1fr 1fr; gap:12px; }
    @media (max-width: 720px) { .mg-row { grid-template-columns: 1fr; } }

    .mg-btn-primary {
      display:inline-flex; align-items:center; justify-content:center;
      background: linear-gradient(90deg,#2563eb,#3b82f6);
      color:#fff; border-radius: 18px; padding:10px 14px; font-weight:800;
      text-decoration:none; box-shadow: 0 1px 2px rgba(0,0,0,0.08);
      border:none; cursor:pointer;
    }
    .mg-btn-ghost {
      display:inline-flex; align-items:center; justify-content:center;
      background:#fff; color:#111827; border:1px solid #e5e7eb;
      border-radius: 18px; padding:10px 14px; font-weight:800;
      text-decoration:none; cursor:pointer;
    }

    .mg-chips { display:flex; flex-wrap:wrap; gap:8px; margin-top: 10px; }
    .mg-chip {
      border:1px solid #e5e7eb; border-radius:999px; padding:6px 10px;
      font-size:12px; color:#374151; background:#fff; cursor:pointer;
      user-select:none;
    }
    .mg-chip[aria-pressed="true"] { border-color: rgba(37,99,235,0.5); box-shadow: 0 1px 2px rgba(37,99,235,0.12); }
    .mg-kv { display:grid; grid-template-columns: 130px 1fr; gap:10px; }
    .mg-kv div { padding: 6px 0; }
    .mg-kv .k { color:#6b7280; font-size:12px; font-weight:800; }
    .mg-kv .v { color:#111827; font-size:14px; font-weight:700; }
    .mg-callout {
      border:1px solid #e5e7eb;
      border-radius:18px;
      padding:12px 14px;
      background:#fff;
    }
</style>