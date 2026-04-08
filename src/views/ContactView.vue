<template>
  <div class="max-w-6xl mx-auto px-4 py-6">
    <!-- HERO -->
    <section class="bg-gradient-to-br from-blue-50 via-white to-amber-50 border border-gray-200 rounded-2xl p-6 mb-6">
      <div class="flex items-center justify-between gap-6">
        <div class="flex-1">
          <span class="inline-flex items-center gap-2 border border-gray-200 rounded-full px-3 py-1 text-xs text-gray-600 bg-white">
            <span aria-hidden="true">📞</span><span>Contact Us</span>
          </span>
          <h1 class="text-3xl font-bold text-gray-900 mt-4 mb-3">Powered By Unmatched Data &amp; Expertise</h1>
          <p class="text-gray-600 max-w-3xl">
            Built with experience from some of America's largest and most respected machinery companies.
            Purpose-built AI that understands the language of machining and delivers instant, reliable answers 24/7.
          </p>

          <div class="flex flex-wrap gap-2 mt-4">
            <span class="border border-gray-200 rounded-full px-3 py-1 text-xs text-gray-600 bg-white">Multilingual</span>
            <span class="border border-gray-200 rounded-full px-3 py-1 text-xs text-gray-600 bg-white">OEM‑Qualified</span>
            <span class="border border-gray-200 rounded-full px-3 py-1 text-xs text-gray-600 bg-white">Always Improving</span>
          </div>
        </div>
        <img src="/assets/machinery-genius.png" alt="Machinery Genius" class="w-32 h-32 object-contain flex-shrink-0 hidden md:block" />
      </div>
    </section>

    <!-- CONTACT FORM -->
    <article class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <h2 class="text-lg font-bold text-gray-900 mb-1">Send us a Message</h2>
      <p class="text-sm text-gray-600 mb-4">Fill this out and we'll reply as soon as possible.</p>

      <hr class="border-gray-200 mb-4" />

      <form @submit.prevent="submit" novalidate class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Name -->
          <div>
            <label for="name" class="block text-xs font-bold text-gray-900 mb-1">Full Name *</label>
            <div class="relative">
              <input id="name" v-model.trim="form.name" type="text" :class="[
                'w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition',
                errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
              ]" placeholder="Enter your full name" />
              <div v-if="errors.name" class="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p v-if="errors.name" class="text-xs text-red-600 mt-1">{{ errors.name }}</p>
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-xs font-bold text-gray-900 mb-1">Email Address *</label>
            <div class="relative">
              <input id="email" v-model.trim="form.email" type="email" :class="[
                'w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition',
                errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
              ]" placeholder="you@example.com" />
              <div v-if="errors.email" class="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p v-if="errors.email" class="text-xs text-red-600 mt-1">{{ errors.email }}</p>
          </div>
        </div>

        <!-- Subject -->
        <div>
          <label for="subject" class="block text-xs font-bold text-gray-900 mb-1">Subject</label>
          <input id="subject" v-model.trim="form.subject" type="text"
            class="w-full px-3 py-2 text-sm border border-gray-300 hover:border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="What's this regarding?" />
        </div>

        <!-- Message -->
        <div>
          <label for="message" class="block text-xs font-bold text-gray-900 mb-1">Message *</label>
          <div class="relative">
            <textarea id="message" v-model.trim="form.message" rows="4" :class="[
              'w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-y',
              errors.message ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
            ]" placeholder="Please describe your inquiry, including machine model numbers if applicable..."></textarea>
            <div v-if="errors.message" class="absolute top-2 right-2">
              <svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p v-if="errors.message" class="text-xs text-red-600 mt-1">{{ errors.message }}</p>
        </div>

        <!-- Consent -->
        <div class="flex items-start gap-2">
          <input id="consent" type="checkbox" v-model="form.consent"
            class="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
          <label for="consent" class="text-xs text-gray-600">
            I agree to be contacted regarding this inquiry and understand that my information will be handled according to your privacy policy.
          </label>
        </div>

        <!-- Submit Button -->
        <div class="flex items-center justify-between flex-wrap gap-4 pt-2">
          <button type="submit" :disabled="sending"
            class="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition">
            <svg v-if="sending" class="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" stroke-opacity="0.25"></circle>
              <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" stroke-width="4" stroke-linecap="round"></path>
            </svg>
            <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <span>{{ sending ? 'Sending...' : 'Send Message' }}</span>
          </button>
          <p class="text-xs text-gray-500">We typically respond within 1 business day.</p>
        </div>
      </form>
    </article>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToastStore } from '@/stores/toast';

const router = useRouter();
const toastStore = useToastStore();
const apiBaseUrl = (import.meta.env.VITE_API_URL?.replace(/\/$/, '') || 'http://127.0.0.1:8000');
const contactEndpoint = apiBaseUrl.endsWith('/api') ? `${apiBaseUrl}/contact` : `${apiBaseUrl}/api/contact`;

interface ContactFormPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
  consent: boolean;
  source_page: string;
}

interface ContactResponse {
  status?: string | boolean;
  message?: string;
}

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
  consent: true,
});

const errors = reactive({
  name: '',
  email: '',
  message: '',
});

const sending = ref(false);

const DEFAULT_SUCCESS_MESSAGE = 'Thank you for your message! We\'ll get back to you within 1 business day.';
const DEFAULT_ERROR_MESSAGE = 'Sorry, we couldn\'t send your message. Please try again.';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate() {
  errors.name = form.name ? '' : 'Please enter your name.';
  errors.email = form.email ? (emailRegex.test(form.email) ? '' : 'Please enter a valid email.') : 'Please enter your email.';
  errors.message = form.message && form.message.length >= 10 ? '' : 'Message must be at least 10 characters.';
  return !errors.name && !errors.email && !errors.message;
}

async function submit() {
  if (!validate()) {
    toastStore.error('Please fix the errors above and try again.');
    return;
  }

  sending.value = true;

  try {
    const payload: ContactFormPayload = {
      name: form.name,
      email: form.email,
      subject: form.subject,
      message: form.message,
      consent: form.consent,
      source_page: 'contact'
    };

    const body = new URLSearchParams();
    Object.entries(payload).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      body.append(key, String(value));
    });

    const response = await fetch(contactEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });

    let data: ContactResponse | undefined;
    try {
      data = await response.json();
    } catch (error) {
      // Ignore JSON parse errors
    }

    if (!response.ok) {
      throw new Error(data?.message || `Server responded with ${response.status}`);
    }

    const responseStatus = data?.status === 'error' || data?.status === false ? 'error' : 'success';
    const responseMessage = data?.message?.trim();

    const finalMessage = responseMessage || (responseStatus === 'success' ? DEFAULT_SUCCESS_MESSAGE : DEFAULT_ERROR_MESSAGE);

    if (responseStatus === 'success') {
      form.name = '';
      form.email = '';
      form.subject = '';
      form.message = '';
      form.consent = true;
      await router.push({ name: 'thank-you', query: { message: finalMessage } });
      return;
    }

    toastStore.error(finalMessage);
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : '';
    toastStore.error(
      message ? `Sorry, we couldn't send your message: ${message}` : DEFAULT_ERROR_MESSAGE,
    );
  } finally {
    sending.value = false;
  }
}
</script>

<style scoped>
/* No custom CSS - using Tailwind only */
</style>
