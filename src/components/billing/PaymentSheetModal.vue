<template>
  <transition name="fade">
    <div
      v-if="open"
      class="fixed inset-0 z-[120] flex items-center justify-center"
    >
      <div
        class="absolute inset-0 bg-slate-950/65 backdrop-blur-sm"
        @click="emit('close')"
      ></div>

      <div
        class="relative z-[121] flex h-[100dvh] w-full max-w-none flex-col overflow-hidden bg-white shadow-2xl sm:h-[calc(100dvh-2rem)] sm:w-[min(1120px,calc(100vw-2rem))] sm:rounded-[28px] sm:border sm:border-slate-200"
        role="dialog"
        aria-modal="true"
        :aria-label="title"
      >
        <div class="border-b border-slate-200 bg-white/95 px-5 py-4 sm:px-6">
          <div class="flex items-start justify-between gap-4">
            <div class="space-y-3">
              <div
                class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600"
              >
                <span
                  class="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"
                ></span>
                Secure Checkout
              </div>
              <div>
                <h3
                  class="text-2xl font-semibold tracking-tight text-slate-950"
                >
                  {{ title }}
                </h3>
                <p class="mt-1 text-sm leading-6 text-slate-600">
                  Complete your payment securely with Machinery Genius and
                  Authorize.Net.
                </p>
              </div>
            </div>
            <button
              type="button"
              class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
              aria-label="Close payment sheet"
              @click="emit('close')"
            >
              X
            </button>
          </div>
        </div>

        <div class="min-h-0 flex-1 overflow-y-auto bg-slate-50/80">
          <div class="space-y-5 px-5 py-5 sm:px-6 sm:py-6">
            <div
              class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div class="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p
                    class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500"
                  >
                    Order Summary
                  </p>
                  <p class="mt-2 text-lg font-semibold text-slate-950">
                    {{ summaryTitle }}
                  </p>
                  <p class="mt-1 text-sm text-slate-500">
                    {{ summaryDetail }}
                  </p>
                </div>
                <div class="min-w-[120px] text-left sm:text-right">
                  <p class="text-xs font-semibold uppercase text-slate-400">
                    Total Due
                  </p>
                  <p
                    class="mt-1 text-3xl font-semibold tracking-tight text-slate-950"
                  >
                    {{ amountLabel }}
                  </p>
                </div>
              </div>

              <div
                class="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500"
              >
                <span
                  class="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-medium text-slate-600"
                >
                  Powered by Authorize.Net
                </span>
                <span
                  class="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 font-medium text-emerald-700"
                >
                  {{ environmentLabel }}
                </span>
              </div>
            </div>

            <div
              v-if="errorMessage"
              class="rounded-2xl border border-red-200 bg-red-50 p-4"
            >
              <p
                class="text-xs font-semibold uppercase tracking-[0.16em] text-red-700"
              >
                Payment Error
              </p>
              <p class="mt-2 text-sm leading-6 text-red-700">
                {{ errorMessage }}
              </p>
            </div>

            <div
              class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div class="flex items-start justify-between gap-4">
                <div>
                  <p
                    class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500"
                  >
                    Payment Details
                  </p>
                  <p class="mt-1 text-sm text-slate-600">
                    Your card details are tokenized with Accept.js before the
                    charge request is sent.
                  </p>
                </div>
                <div
                  class="hidden rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-700 sm:block"
                >
                  PCI-aware flow
                </div>
              </div>

              <div class="mt-5 grid gap-4 sm:grid-cols-2">
                <div class="sm:col-span-2">
                  <label class="mb-1.5 block text-xs font-bold text-slate-900"
                    >Cardholder Name</label
                  >
                  <input
                    v-model.trim="form.cardholderName"
                    type="text"
                    placeholder="Jane Smith"
                    class="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div class="sm:col-span-2">
                  <label class="mb-1.5 block text-xs font-bold text-slate-900"
                    >Card Number</label
                  >
                  <input
                    v-model.trim="form.cardNumber"
                    type="text"
                    inputmode="numeric"
                    autocomplete="cc-number"
                    placeholder="4111 1111 1111 1111"
                    class="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label class="mb-1.5 block text-xs font-bold text-slate-900"
                    >Exp. Month</label
                  >
                  <input
                    v-model.trim="form.expirationMonth"
                    type="text"
                    inputmode="numeric"
                    maxlength="2"
                    placeholder="12"
                    class="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label class="mb-1.5 block text-xs font-bold text-slate-900"
                    >Exp. Year</label
                  >
                  <input
                    v-model.trim="form.expirationYear"
                    type="text"
                    inputmode="numeric"
                    maxlength="4"
                    placeholder="2028"
                    class="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label class="mb-1.5 block text-xs font-bold text-slate-900"
                    >CVV</label
                  >
                  <input
                    v-model.trim="form.cvv"
                    type="password"
                    inputmode="numeric"
                    maxlength="4"
                    autocomplete="cc-csc"
                    placeholder="123"
                    class="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label class="mb-1.5 block text-xs font-bold text-slate-900"
                    >ZIP / Postal Code</label
                  >
                  <input
                    v-model.trim="form.zip"
                    type="text"
                    autocomplete="postal-code"
                    placeholder="60606"
                    class="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div
              class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p
                class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500"
              >
                Billing Address
              </p>

              <div class="mt-5 grid gap-4 sm:grid-cols-2">
                <div class="sm:col-span-2">
                  <label class="mb-1.5 block text-xs font-bold text-slate-900"
                    >Street Address</label
                  >
                  <input
                    v-model.trim="form.address"
                    type="text"
                    autocomplete="street-address"
                    placeholder="123 Machine Way"
                    class="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label class="mb-1.5 block text-xs font-bold text-slate-900"
                    >City</label
                  >
                  <input
                    v-model.trim="form.city"
                    type="text"
                    autocomplete="address-level2"
                    placeholder="Chicago"
                    class="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label class="mb-1.5 block text-xs font-bold text-slate-900"
                    >State / Province</label
                  >
                  <input
                    v-model.trim="form.state"
                    type="text"
                    autocomplete="address-level1"
                    placeholder="IL"
                    class="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div class="sm:col-span-2">
                  <label class="mb-1.5 block text-xs font-bold text-slate-900"
                    >Country</label
                  >
                  <input
                    v-model.trim="form.country"
                    type="text"
                    autocomplete="country-name"
                    placeholder="US"
                    class="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div
              class="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm leading-6 text-slate-700"
            >
              We tokenize your card details in the browser and send the payment
              request securely through the Machinery Genius API.
            </div>
          </div>
        </div>

        <div class="border-t border-slate-200 bg-white px-5 py-4 sm:px-6">
          <div class="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              :disabled="isBusy"
              class="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
              @click="emit('close')"
            >
              Cancel
            </button>
            <button
              type="button"
              :disabled="isBusy || !canSubmit"
              class="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              @click="emit('submit')"
            >
              {{ submitLabel }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, toRef, watch } from "vue";

type PaymentSheetForm = {
  cardholderName: string;
  cardNumber: string;
  expirationMonth: string;
  expirationYear: string;
  cvv: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

const props = defineProps<{
  open: boolean;
  title: string;
  summaryTitle: string;
  summaryDetail: string;
  amountLabel: string;
  submitLabel: string;
  environmentLabel: string;
  isBusy: boolean;
  canSubmit: boolean;
  errorMessage?: string;
  form: PaymentSheetForm;
}>();

const emit = defineEmits<{
  close: [];
  submit: [];
}>();

const form = toRef(props, "form");

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === "Escape" && props.open) {
    emit("close");
  }
};

watch(
  () => props.open,
  (isOpen) => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  },
);

onMounted(() => {
  window.addEventListener("keydown", handleEscape);
});

onBeforeUnmount(() => {
  document.body.style.overflow = "";
  window.removeEventListener("keydown", handleEscape);
});
</script>
