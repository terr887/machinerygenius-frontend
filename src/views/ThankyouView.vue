<template>
   <div style="max-width:1100px;margin:0 auto;padding:26px 16px;">

    <!-- HERO -->
    <section class="mg-hero">
      <div class="mg-badge"><span aria-hidden="true">✅</span><span>Message received</span></div>
      <h1 style="font-size:40px;line-height:1.05;letter-spacing:-0.03em;margin:14px 0 10px 0;">
        Thank you for contacting Machinery Genius
      </h1>
      <p style="font-size:16px;color:#374151;margin:0;max-width:920px;">
        We’ve got your message and we’ll route it to the right team. In the meantime, many users can get
        quick answers instantly inside Machinery Genius—especially for common questions like specs, weights,
        power, oil types, tooling, and model comparisons.
      </p>

      <div class="mg-note" style="margin-top:16px;" role="status">
        {{ successMessage }}
      </div>

      <div class="mg-cta-row" style="margin-top:16px;">
        <a class="mg-btn-primary" href="/app">Ask a Question Now</a>
        <a class="mg-btn-ghost" href="/help">Browse Common Answers</a>
        <a class="mg-btn-secondary" href="/pricing">Pricing & Tokens</a>
      </div>

      <div class="mg-small" style="margin-top:10px;">
        If you’re reading this at 2:00 AM with a machine down… we respect the grind.
      </div>
    </section>

    <section style="margin-top:18px;">
      <div class="mg-grid">

        <!-- QUICK HELP / TROUBLESHOOT -->
        <article class="mg-card">
          <h2 class="mg-section-title">Need a quick answer right now?</h2>

          <div class="mg-note">
            <strong>If your chat isn’t working</strong>, you may be out of free questions or tokens.
            Free accounts include <strong>20 lifetime questions</strong>. Token packs keep you moving when you need answers fast.
          </div>

          <div class="mg-divider"></div>

          <h3 style="margin:0 0 8px 0;font-size:16px;font-weight:900;">Try these common question types</h3>
          <ul class="mg-list">
            <li>“What oil does my machine take?”</li>
            <li>“How much does it weigh and what are the dimensions?”</li>
            <li>“What power/voltage/phase do I need?”</li>
            <li>“What’s the difference between Model A and Model B?”</li>
            <li>“What tooling does this spindle/taper use?”</li>
          </ul>

          <div class="mg-divider"></div>

          <div class="mg-cta-row">
            <a class="mg-btn-primary" href="/app">Open Chat</a>
            <a class="mg-btn-ghost" href="/contact">Send another message</a>
          </div>

          <p class="mg-small" style="margin-top:12px;">
            Tip: Add your machine brand/model and serial number when available. It improves accuracy and speed.
          </p>
        </article>

        <!-- TOKENS / PRICING SNIPPET -->
        <aside class="mg-card">
          <h2 class="mg-section-title">Tokens & Pricing (quick view)</h2>
          <p class="mg-muted" style="margin:0;">
            Tokens don’t expire. Perfect for emergency use or occasional questions.
          </p>

          <div class="mg-divider"></div>

          <div style="display:grid;gap:10px;">
            <div class="mg-pack">
              <div class="name">Starter</div>
              <div class="meta">100 tokens</div>
              <div class="cost">$25</div>
            </div>
            <div class="mg-pack">
              <div class="name">Shop</div>
              <div class="meta">500 tokens</div>
              <div class="cost">$75</div>
            </div>
            <div class="mg-pack">
              <div class="name">Power</div>
              <div class="meta">1,500 tokens</div>
              <div class="cost">$150</div>
            </div>
          </div>

          <div class="mg-divider"></div>

          <h3 style="margin:0 0 8px 0;font-size:16px;font-weight:900;">Machine Garage™ Pro</h3>
          <div class="mg-price">$79<span style="font-size:14px;font-weight:800;">/mo</span></div>
          <p class="mg-small" style="margin:8px 0 0 0;">
            Best for ongoing use: save machines, save chats to machines, uploads, reminders, and long-term machine memory.
          </p>

          <div class="mg-divider"></div>

          <div class="mg-cta-row">
            <a class="mg-btn-primary" href="/buy-tokens">Buy Tokens</a>
            <a class="mg-btn-secondary" href="/start-pro">Go Pro</a>
            <a class="mg-btn-ghost" href="/pricing">See full pricing</a>
          </div>
        </aside>

      </div>
    </section>

    <!-- OPTIONAL: SPONSORED CREDITS -->
    <section style="margin-top:20px;">
      <div class="mg-card">
        <h2 class="mg-section-title">Have a sponsored code?</h2>
        <p style="margin:0;color:#374151;max-width:900px;">
          Some users receive credits from <strong>Trusted OEM Partners</strong>, dealers, financing/leasing programs,
          or machine purchase bundles. If you have a promo code or QR link, redeem it here.
        </p>

        <div class="mg-divider"></div>

        <div class="mg-cta-row">
          <a class="mg-btn-primary" href="/redeem">Redeem Sponsored Credits</a>
          <a class="mg-btn-ghost" href="/partners">Learn about partner programs</a>
        </div>

        <p class="mg-small" style="margin-top:12px;">
          Sponsored credits may be restricted by brand/model or usage type, depending on the program.
        </p>
      </div>
    </section>

    <!-- FOOTER-ish NOTE -->
    <section style="margin-top:20px;">
      <div class="mg-card">
        <div class="mg-kv">
          <div class="k">Need to call?</div>
          <div class="v"><a href="tel:+16264440311" style="text-decoration:none;color:#2563eb;">(626) 444-0311</a></div>

          <div class="k">Next steps</div>
          <div class="v">
            <a href="/app" style="text-decoration:none;color:#2563eb;">Ask a question →</a>
            &nbsp;•&nbsp;
            <a href="/pricing" style="text-decoration:none;color:#2563eb;">View pricing →</a>
            &nbsp;•&nbsp;
            <a href="/help" style="text-decoration:none;color:#2563eb;">Get support →</a>
          </div>
        </div>

        <div class="mg-divider"></div>

        <p class="mg-small" style="margin:0;">
          Machinery Genius provides informational assistance. Users are responsible for verifying safety, requirements, and manufacturer specifications.
        </p>
      </div>
    </section>

  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const DEFAULT_MESSAGE = 'Thanks for reaching out. We will get back to you shortly.';

const successMessage = computed(() => {
  const message = route.query.message;
  if (Array.isArray(message)) {
    return message[0] || DEFAULT_MESSAGE;
  }
  return (message as string | undefined)?.trim() || DEFAULT_MESSAGE;
});
</script>
<style>
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

    .mg-btn-primary {
      display:inline-flex; align-items:center; justify-content:center;
      background: linear-gradient(90deg,#2563eb,#3b82f6);
      color:#fff; border-radius: 18px; padding:10px 14px; font-weight:800;
      text-decoration:none; box-shadow: 0 1px 2px rgba(0,0,0,0.08);
      border:none; cursor:pointer;
    }
    .mg-btn-secondary {
      display:inline-flex; align-items:center; justify-content:center;
      background:#2563eb; color:#fff;
      border-radius: 18px; padding:10px 14px; font-weight:800;
      text-decoration:none; box-shadow: 0 1px 2px rgba(0,0,0,0.08);
    }
    .mg-btn-ghost {
      display:inline-flex; align-items:center; justify-content:center;
      background:#fff; color:#111827; border:1px solid #e5e7eb;
      border-radius: 18px; padding:10px 14px; font-weight:800;
      text-decoration:none; cursor:pointer;
    }
    .mg-cta-row { display:flex; flex-wrap:wrap; gap:10px; align-items:center; }
    .mg-kv { display:grid; grid-template-columns: 130px 1fr; gap:10px; }
    .mg-kv div { padding: 6px 0; }
    .mg-kv .k { color:#6b7280; font-size:12px; font-weight:800; }
    .mg-kv .v { color:#111827; font-size:14px; font-weight:800; }

    .mg-price { font-size: 30px; font-weight: 900; letter-spacing: -0.02em; line-height: 1.1; }
    .mg-pack {
      border:1px solid #e5e7eb; border-radius:18px; padding:14px; background:#fff;
    }
    .mg-pack .name { font-weight:900; }
    .mg-pack .meta { color:#6b7280; font-size:12px; margin-top:2px; }
    .mg-pack .cost { font-weight:900; font-size:18px; margin-top:8px; }
    .mg-note {
      border:1px solid rgba(37,99,235,0.25);
      background: rgba(37,99,235,0.06);
      border-radius: 18px;
      padding: 12px 14px;
      color:#1f2937;
      font-size:13px;
    }
    .mg-list { margin: 0; padding-left: 18px; color:#374151; }
    .mg-list li { margin: 8px 0; }
</style>
