<template>
  <section class="py-6 bg-gray-50">
    <div class="container mx-auto px-6">
      <div class="flex items-end justify-between flex-wrap gap-4 mb-6">
        <div class="max-w-4xl">
          <p class="uppercase tracking-wide text-xs text-gray-600">Contact Us</p>
          <h1 class="mt-2 text-2xl font-bold leading-relaxed">Powered By Unmatched Data &amp; Expertise</h1>
          <p class="mt-3 text-gray-600 max-w-3xl">
            Built with experience from some of America’s largest and most respected machinery companies.
            Purpose-built AI that understands the language of machining and delivers instant, reliable answers 24/7.
          </p>
        </div>
        <div class="flex items-center gap-2">
          <span class="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-600">Multilingual</span>
          <span class="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-600">OEM‑Qualified</span>
          <span class="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-600">Always Improving</span>
        </div>
      </div>

      <section>
        <div class="bg-white border border-gray-200 rounded-xl p-8">
          <h2 class="text-xl font-semibold text-gray-900 mb-8">
            Send us a Message
          </h2>

          <form @submit.prevent="submit" novalidate>
            <!-- Status Message -->
            <div v-if="statusMessage" :class="statusClass" class="text-sm p-4 rounded-lg mb-6 border">
              {{ statusMessage }}
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <!-- Name -->
              <div class="space-y-2">
                <label for="name" class="block text-sm font-medium text-gray-700">Full Name *</label>
                <div class="relative">
                  <input id="name" v-model.trim="form.name" type="text" :class="[
                    'w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200',
                    errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  ]" placeholder="Enter your full name" />
                  <div v-if="errors.name" class="absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <p v-if="errors.name" class="text-xs text-red-600">{{ errors.name }}</p>
              </div>

              <!-- Email -->
              <div class="space-y-2">
                <label for="email" class="block text-sm font-medium text-gray-700">Email Address *</label>
                <div class="relative">
                  <input id="email" v-model.trim="form.email" type="email" :class="[
                    'w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200',
                    errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  ]" placeholder="you@example.com" />
                  <div v-if="errors.email" class="absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <p v-if="errors.email" class="text-xs text-red-600">{{ errors.email }}</p>
              </div>
            </div>

            <!-- Subject -->
            <div class="space-y-2 mb-6">
              <label for="subject" class="block text-sm font-medium text-gray-700">Subject</label>
              <input id="subject" v-model.trim="form.subject" type="text"
                class="w-full px-4 py-3 border border-gray-300 hover:border-gray-400 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="What's this regarding?" />
            </div>

            <!-- Message -->
            <div class="space-y-2 mb-6">
              <label for="message" class="block text-sm font-medium text-gray-700">Message *</label>
              <div class="relative">
                <textarea id="message" v-model.trim="form.message" rows="6" :class="[
                  'w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-vertical',
                  errors.message ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                ]"
                  placeholder="Please describe your inquiry, including machine model numbers if applicable..."></textarea>
                <div v-if="errors.message" class="absolute top-3 right-3">
                  <svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <p v-if="errors.message" class="text-xs text-red-600">{{ errors.message }}</p>
            </div>

            <!-- Consent -->
            <div class="flex items-start gap-3 mb-8">
              <input id="consent" type="checkbox" v-model="form.consent"
                class="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <label for="consent" class="text-sm text-gray-600 leading-relaxed">
                I agree to be contacted regarding this inquiry and understand that my information will be handled
                according to your privacy policy.
              </label>
            </div>

            <!-- Submit Button -->
            <button type="submit" :disabled="sending"
              class="flex items-center justify-center gap-3 px-3 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200">
              <svg v-if="sending" class="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" stroke-opacity="0.25"></circle>
                <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" stroke-width="4" stroke-linecap="round"></path>
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span>{{ sending ? 'Sending Message...' : 'Send Message' }}</span>
            </button>

            <p class="text-xs text-gray-500 mt-4 text-center">
              We typically respond within 1 business day. Your information is kept confidential.
            </p>
          </form>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
import { useRouter } from 'vue-router';

/* --- form state --- */
const router = useRouter();
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
const statusMessage = ref('');
const statusType = ref(''); // 'success' | 'error'

const DEFAULT_SUCCESS_MESSAGE = 'Thank you for your message! We\'ll get back to you within 1 business day.';
const DEFAULT_ERROR_MESSAGE = 'Sorry, we couldn\'t send your message. Please try again.';

/* --- validation helpers --- */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate() {
  errors.name = form.name ? '' : 'Please enter your name.';
  errors.email = form.email ? (emailRegex.test(form.email) ? '' : 'Please enter a valid email.') : 'Please enter your email.';
  errors.message = form.message && form.message.length >= 10 ? '' : 'Message must be at least 10 characters.';
  return !errors.name && !errors.email && !errors.message;
}

/* --- submit --- */
async function submit() {
  statusMessage.value = '';
  statusType.value = '';

  if (!validate()) {
    statusMessage.value = 'Please fix the errors above and try again.';
    statusType.value = 'error';
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
      // Some backends respond with empty bodies; ignore JSON parse errors.
    }

    if (!response.ok) {
      throw new Error(data?.message || `Server responded with ${response.status}`);
    }

    const responseStatus = data?.status === 'error' || data?.status === false ? 'error' : 'success';
    const responseMessage = data?.message?.trim();

    statusType.value = responseStatus;
    const finalMessage = responseMessage || (responseStatus === 'success' ? DEFAULT_SUCCESS_MESSAGE : DEFAULT_ERROR_MESSAGE);
    statusMessage.value = finalMessage;

    if (responseStatus === 'success') {
      form.name = '';
      form.email = '';
      form.subject = '';
      form.message = '';
      form.consent = true;
      await router.push({ name: 'thank-you', query: { message: finalMessage } });
    }
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : '';
    statusMessage.value = message ? `Sorry, we couldn't send your message: ${message}` : DEFAULT_ERROR_MESSAGE;
    statusType.value = 'error';
  } finally {
    sending.value = false;
  }
}

/* --- computed for status styling --- */
const statusClass = computed(() => {
  if (!statusType.value) return 'hidden';
  return statusType.value === 'success'
    ? 'bg-green-50 text-green-700 border-green-200'
    : 'bg-red-50 text-red-700 border-red-200';
});
</script>
