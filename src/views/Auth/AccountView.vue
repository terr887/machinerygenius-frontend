<template>
  <div class="w-full bg-gradient-to-br from-slate-50 via-white to-blue-50">
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <section id="account-top"
        class="relative overflow-hidden rounded-[32px] bg-slate-900 px-6 py-7 text-white shadow-2xl sm:px-8 sm:py-8"
      >
        <div
          class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(96,165,250,0.22),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(251,191,36,0.18),_transparent_32%)]"
        ></div>
        <div class="relative grid gap-6 xl:grid-cols-[1.5fr,0.8fr]">
          <div class="space-y-6">
            <div
              class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-100"
            >
              Account Workspace
            </div>

            <div class="max-w-3xl space-y-3">
              <h1 class="text-3xl font-semibold tracking-tight sm:text-4xl">
                Welcome back<span v-if="userDisplay">, {{ userDisplay }}</span>
              </h1>
              <p class="text-sm leading-7 text-slate-200 sm:text-base">
                Everything related to your Machinery Genius account is now in
                one place, from security and profile details to machine records
                and billing access.
              </p>
            </div>

            <div class="flex flex-wrap gap-3">
              <RouterLink
                to="/change-password"
                class="inline-flex items-center justify-center rounded-xl bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-400"
              >
                Change Password
              </RouterLink>
              <button
                type="button"
                @click="handleLogout"
                :disabled="authStore.loading"
                class="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {{ authStore.loading ? "Logging out..." : "Logout" }}
              </button>
            </div>

            <div class="grid gap-3 sm:grid-cols-3">
              <div class="rounded-2xl border border-white/10 bg-white/10 p-4">
                <p
                  class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-300"
                >
                  Machines
                </p>
                <p class="mt-3 text-2xl font-semibold text-white">
                  {{ machines.length }}
                </p>
                <p class="mt-1 text-sm text-slate-300">
                  {{ machineCountLabel }}
                </p>
              </div>
              <div class="rounded-2xl border border-white/10 bg-white/10 p-4">
                <p
                  class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-300"
                >
                  Tokens
                </p>
                <p class="mt-3 text-2xl font-semibold text-white">
                  {{ tokenBalanceLabel }}
                </p>
                <p class="mt-1 text-sm text-slate-300">
                  Available for chats and tools
                </p>
              </div>
              <div class="rounded-2xl border border-white/10 bg-white/10 p-4">
                <p
                  class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-300"
                >
                  Access
                </p>
                <p class="mt-3 text-lg font-semibold text-white">
                  {{ subscriptionLabel }}
                </p>
                <p class="mt-1 text-sm text-slate-300">
                  {{ checkoutStatusLabel }}
                </p>
              </div>
            </div>
          </div>

          <div class="rounded-[28px] border border-white/10 bg-white/10 p-5">
            <div class="flex items-start justify-between gap-4">
              <div>
                <p
                  class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300"
                >
                  Account Summary
                </p>
                <h2 class="mt-2 text-xl font-semibold text-white">
                  Clean and ready to manage
                </h2>
              </div>
              <img
                src="/assets/machinery-genius.png"
                alt="Machinery Genius"
                class="hidden h-16 w-16 object-contain sm:block"
              />
            </div>

            <div class="mt-5 space-y-4">
              <div
                class="rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-3"
              >
                <p
                  class="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-300"
                >
                  Email
                </p>
                <p class="mt-1 text-sm font-medium text-white">
                  {{ accountEmail }}
                </p>
              </div>
              <div
                class="rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-3"
              >
                <p
                  class="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-300"
                >
                  Company
                </p>
                <p class="mt-1 text-sm font-medium text-white">
                  {{ companyDisplay }}
                </p>
              </div>
              <div
                class="rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-3"
              >
                <p
                  class="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-300"
                >
                  Security Reminder
                </p>
                <p class="mt-1 text-sm leading-6 text-slate-100">
                  Use a strong password, avoid reuse across services, and rotate
                  credentials when team access changes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="mt-6 grid gap-6 xl:grid-cols-[1.05fr,0.95fr]">
        <article id="profile"
          class="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div class="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p
                class="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600"
              >
                Profile
              </p>
              <h2 class="mt-2 text-2xl font-semibold text-slate-950">
                Account details
              </h2>
              <p class="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Keep your personal and company information clean so future
                support, billing, and machine ownership stay organized.
              </p>
            </div>
            <span
              class="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-600"
            >
              {{ subscriptionLabel }}
            </span>
          </div>

          <div class="mt-6 grid gap-4 md:grid-cols-2">
            <div class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p
                class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500"
              >
                Full name
              </p>
              <p class="mt-2 text-base font-semibold text-slate-900">
                {{ accountName }}
              </p>
            </div>
            <div class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p
                class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500"
              >
                Email
              </p>
              <p class="mt-2 break-all text-base font-semibold text-slate-900">
                {{ accountEmail }}
              </p>
            </div>
            <div class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p
                class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500"
              >
                Company
              </p>
              <p class="mt-2 text-base font-semibold text-slate-900">
                {{ companyDisplay }}
              </p>
            </div>
            <div class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p
                class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500"
              >
                Checkout status
              </p>
              <p class="mt-2 text-base font-semibold text-slate-900">
                {{ checkoutStatusLabel }}
              </p>
            </div>
          </div>
        </article>

        <article id="security"
          class="relative overflow-hidden rounded-[28px] bg-slate-900 p-6 text-white shadow-lg"
        >
          <div
            class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(96,165,250,0.28),_transparent_32%),radial-gradient(circle_at_bottom_left,_rgba(251,191,36,0.22),_transparent_28%)]"
          ></div>
          <div class="relative">
            <p
              class="text-xs font-semibold uppercase tracking-[0.18em] text-white/70"
            >
              Security
            </p>
            <h2 class="mt-2 text-2xl font-semibold">Protect your workspace</h2>
            <p class="mt-2 text-sm leading-6 text-slate-200">
              These habits keep account access tidy and reduce support issues
              when multiple operators use the same environment.
            </p>

            <div class="mt-6 space-y-3">
              <div
                class="flex gap-3 rounded-2xl border border-white/10 bg-white/10 p-4"
              >
                <span
                  class="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/15 text-sm font-semibold"
                >
                  1
                </span>
                <div>
                  <p class="text-sm font-semibold text-white">
                    Keep passwords unique
                  </p>
                  <p class="mt-1 text-sm leading-6 text-slate-200">
                    Use at least 12 characters and avoid sharing credentials
                    between teams or other services.
                  </p>
                </div>
              </div>
              <div
                class="flex gap-3 rounded-2xl border border-white/10 bg-white/10 p-4"
              >
                <span
                  class="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/15 text-sm font-semibold"
                >
                  2
                </span>
                <div>
                  <p class="text-sm font-semibold text-white">
                    Review machine ownership
                  </p>
                  <p class="mt-1 text-sm leading-6 text-slate-200">
                    Keep saved serials and machine records current so billing and
                    support stay attached to the correct equipment.
                  </p>
                </div>
              </div>
              <div
                class="flex gap-3 rounded-2xl border border-white/10 bg-white/10 p-4"
              >
                <span
                  class="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/15 text-sm font-semibold"
                >
                  3
                </span>
                <div>
                  <p class="text-sm font-semibold text-white">
                    Rotate access when staff changes
                  </p>
                  <p class="mt-1 text-sm leading-6 text-slate-200">
                    Update passwords regularly and remove old session access
                    when operators or vendors no longer need the account.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div class="mt-6 grid gap-6 xl:grid-cols-[1.05fr,0.95fr]">
        <article id="machines"
          class="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div
            class="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-5"
          >
            <div>
              <p
                class="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600"
              >
                Machine Garage
              </p>
              <h2 class="mt-2 text-2xl font-semibold text-slate-950">
                Organize your machines
              </h2>
              <p class="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Add models, serials, and production years so conversations and
                future maintenance tools can be linked to the right equipment.
              </p>
            </div>
            <button
              type="button"
              @click="loadMachines"
              :disabled="machineLoading"
              class="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {{ machineLoading ? "Refreshing..." : "Refresh List" }}
            </button>
          </div>

          <div class="mt-6 grid gap-6 lg:grid-cols-[0.95fr,1.05fr]">
            <div class="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
              <div class="flex items-start justify-between gap-3">
                <div>
                  <h3 class="text-lg font-semibold text-slate-950">
                    Add a machine
                  </h3>
                  <p class="mt-1 text-sm leading-6 text-slate-600">
                    Required fields are brand and model. Serial and year can be
                    added when available.
                  </p>
                </div>
                <span
                  class="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-700"
                >
                  {{ machineCountLabel }}
                </span>
              </div>

              <form
                class="mt-5 grid gap-3 sm:grid-cols-2"
                @submit.prevent="handleCreateMachine"
              >
                <div>
                  <label class="mb-1.5 block text-xs font-bold text-slate-900"
                    >Brand *</label
                  >
                  <input
                    v-model.trim="machineForm.brand"
                    type="text"
                    placeholder="Haas"
                    class="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label class="mb-1.5 block text-xs font-bold text-slate-900"
                    >Model *</label
                  >
                  <input
                    v-model.trim="machineForm.model"
                    type="text"
                    placeholder="VF-2"
                    class="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label class="mb-1.5 block text-xs font-bold text-slate-900"
                    >Serial</label
                  >
                  <input
                    v-model.trim="machineForm.serial"
                    type="text"
                    placeholder="Serial number"
                    class="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label class="mb-1.5 block text-xs font-bold text-slate-900"
                    >Year</label
                  >
                  <input
                    v-model.trim="machineForm.year"
                    type="number"
                    min="1900"
                    max="2100"
                    placeholder="2024"
                    class="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div class="sm:col-span-2">
                  <button
                    type="submit"
                    :disabled="machineSubmitting"
                    class="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {{
                      machineSubmitting ? "Adding machine..." : "Save Machine"
                    }}
                  </button>
                </div>
              </form>

              <p
                v-if="machineMessage"
                class="mt-4 rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
              >
                {{ machineMessage }}
              </p>
              <p
                v-if="machineError"
                class="mt-4 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-600"
              >
                {{ machineError }}
              </p>
            </div>

            <div class="rounded-[24px] border border-slate-200 bg-white p-5">
              <div class="flex items-start justify-between gap-3">
                <div>
                  <h3 class="text-lg font-semibold text-slate-950">
                    Saved machines
                  </h3>
                  <p class="mt-1 text-sm leading-6 text-slate-600">
                    Your registered equipment appears here for quick reference.
                  </p>
                </div>
                <span
                  class="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-600"
                >
                  {{ machines.length }}
                </span>
              </div>

              <div class="mt-5 space-y-3">
                <div
                  v-if="!machines.length"
                  class="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center"
                >
                  <p class="text-sm font-semibold text-slate-700">
                    No machines saved yet
                  </p>
                  <p class="mt-1 text-sm text-slate-500">
                    Add your first machine to start organizing support and
                    account activity around the exact model.
                  </p>
                </div>

                <div
                  v-for="item in machines"
                  :key="item.id"
                  class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-slate-300"
                >
                  <div class="flex items-start justify-between gap-3">
                    <div>
                      <p class="text-base font-semibold text-slate-900">
                        {{ item.brand }} {{ item.model }}
                      </p>
                      <p class="mt-1 text-sm text-slate-500">
                        {{
                          item.serial
                            ? `Serial ${item.serial}`
                            : "Serial not provided"
                        }}
                      </p>
                    </div>
                    <span
                      class="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]"
                      :class="
                        item.tier_access === 'FULL'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-amber-100 text-amber-700'
                      "
                    >
                      {{ item.tier_access || "Preview" }}
                    </span>
                  </div>

                  <div class="mt-3 flex flex-wrap gap-2 text-xs text-slate-600">
                    <span
                      class="rounded-full border border-slate-200 bg-white px-3 py-1"
                    >
                      Brand: {{ item.brand }}
                    </span>
                    <span
                      class="rounded-full border border-slate-200 bg-white px-3 py-1"
                    >
                      Model: {{ item.model }}
                    </span>
                    <span
                      v-if="item.year"
                      class="rounded-full border border-slate-200 bg-white px-3 py-1"
                    >
                      Year: {{ item.year }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        <article id="billing"
          class="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div
            class="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-5"
          >
            <div>
              <p
                class="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600"
              >
                Billing
              </p>
              <h2 class="mt-2 text-2xl font-semibold text-slate-950">
                Credits and access
              </h2>
              <p class="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Buy tokens, activate Pro access, and redeem promo codes from one
                clean billing workspace.
              </p>
            </div>
            <span
              class="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]"
              :class="
                checkoutReady
                  ? 'border border-emerald-200 bg-emerald-50 text-emerald-700'
                  : checkoutLoading
                    ? 'border border-blue-200 bg-blue-50 text-blue-700'
                    : 'border border-amber-200 bg-amber-50 text-amber-700'
              "
            >
              {{ checkoutStatusLabel }}
            </span>
          </div>

          <div class="mt-6 grid gap-3 sm:grid-cols-3">
            <div class="rounded-2xl border border-blue-100 bg-blue-50 p-4">
              <p
                class="text-xs font-semibold uppercase tracking-[0.16em] text-blue-700"
              >
                Token balance
              </p>
              <p class="mt-2 text-2xl font-semibold text-blue-950">
                {{ tokenBalanceLabel }}
              </p>
              <p class="mt-1 text-sm text-blue-800">
                Available for future usage
              </p>
            </div>
            <div class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p
                class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500"
              >
                Plan
              </p>
              <p class="mt-2 text-lg font-semibold text-slate-950">
                {{ subscriptionLabel }}
              </p>
              <p class="mt-1 text-sm text-slate-600">
                {{ proPlanName }} offer available below
              </p>
            </div>
            <div class="rounded-2xl border border-amber-100 bg-amber-50 p-4">
              <p
                class="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700"
              >
                Offers
              </p>
              <p class="mt-2 text-sm font-semibold text-amber-950">
                {{
                  tokensPerDollar > 0
                    ? `${formatTokenCount(tokensPerDollar)} tokens per $1`
                    : "Token pricing unavailable"
                }}
              </p>
              <p class="mt-1 text-sm text-amber-800">
                {{
                  proPrice > 0
                    ? `${formatCurrency(proPrice)} for ${proValidityDays || "configured"} days of Pro`
                    : "Pro pricing unavailable"
                }}
              </p>
            </div>
          </div>

          <div class="mt-6 space-y-4">
            <div class="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
              <div class="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 class="text-lg font-semibold text-slate-950">
                    Buy tokens
                  </h3>
                  <p class="mt-1 text-sm leading-6 text-slate-600">
                    Choose how many tokens you want to add before launching the
                    secure payment sheet.
                  </p>
                </div>
                <span
                  class="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-700"
                >
                  {{
                    tokensPerDollar > 0
                      ? `${formatTokenCount(tokensPerDollar)} / $1`
                      : "Pricing unavailable"
                  }}
                </span>
              </div>

              <div class="mt-5 grid gap-3 sm:grid-cols-3">
                <div>
                  <label class="mb-1.5 block text-xs font-bold text-slate-900"
                    >Tokens</label
                  >
                  <input
                    v-model.number="tokenPurchaseForm.tokens"
                    type="number"
                    min="10000"
                    class="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label class="mb-1.5 block text-xs font-bold text-slate-900"
                    >Rate</label
                  >
                  <div
                    class="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700"
                  >
                    {{
                      tokensPerDollar > 0
                        ? `${formatTokenCount(tokensPerDollar)} tokens / $1`
                        : "--"
                    }}
                  </div>
                </div>
                <div>
                  <label class="mb-1.5 block text-xs font-bold text-slate-900"
                    >Total charge</label
                  >
                  <div
                    class="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-900"
                  >
                    {{
                      tokenUnitPrice > 0
                        ? formatCurrency(tokenPurchaseAmount)
                        : "--"
                    }}
                  </div>
                </div>
              </div>

              <button
                type="button"
                @click="openPaymentSheet('tokens')"
                :disabled="billingLoading.tokens || !checkoutReady || !canPurchaseTokens"
                class="mt-4 inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {{ billingLoading.tokens ? "Processing..." : "Open Checkout" }}
              </button>
            </div>

            <div class="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
              <div class="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 class="text-lg font-semibold text-slate-950">
                    Activate Pro
                  </h3>
                  <p class="mt-1 text-sm leading-6 text-slate-600">
                    Upgrade access with the configured Pro plan and optional
                    auto-renew.
                  </p>
                </div>
                <span
                  class="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-700"
                >
                  {{
                    proPlanActive ? "Available for purchase" : "Unavailable"
                  }}
                </span>
              </div>

              <div class="mt-5 grid gap-3 sm:grid-cols-3">
                <div>
                  <label class="mb-1.5 block text-xs font-bold text-slate-900"
                    >Plan</label
                  >
                  <div
                    class="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700"
                  >
                    {{ proPlanName }}
                  </div>
                </div>
                <div>
                  <label class="mb-1.5 block text-xs font-bold text-slate-900"
                    >Validity</label
                  >
                  <div
                    class="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700"
                  >
                    {{
                      proValidityDays
                        ? `${proValidityDays} days`
                        : "Not configured"
                    }}
                  </div>
                </div>
                <div>
                  <label class="mb-1.5 block text-xs font-bold text-slate-900"
                    >Charge</label
                  >
                  <div
                    class="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-900"
                  >
                    {{ proPrice > 0 ? formatCurrency(proPrice) : "--" }}
                  </div>
                </div>
              </div>

              <label class="mt-4 flex items-center gap-2 text-sm text-slate-700">
                <input
                  v-model="proForm.autoRenew"
                  type="checkbox"
                  class="h-4 w-4 rounded border-slate-300 text-blue-600"
                />
                Auto renew this subscription
              </label>

              <button
                type="button"
                @click="openPaymentSheet('pro')"
                :disabled="billingLoading.pro || !checkoutReady || !proPlanActive"
                class="mt-4 inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {{ billingLoading.pro ? "Processing..." : "Open Checkout" }}
              </button>
            </div>

            <form
              class="rounded-[24px] border border-slate-200 bg-slate-50 p-5"
              @submit.prevent="handleRedeemPromo"
            >
              <div class="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 class="text-lg font-semibold text-slate-950">
                    Redeem promo code
                  </h3>
                  <p class="mt-1 text-sm leading-6 text-slate-600">
                    Apply a valid code to unlock promotional credits or special
                    account benefits.
                  </p>
                </div>
                <span
                  class="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-700"
                >
                  Promotions
                </span>
              </div>

              <div class="mt-5">
                <label class="mb-1.5 block text-xs font-bold text-slate-900"
                  >Code</label
                >
                <input
                  v-model.trim="promoCode"
                  type="text"
                  placeholder="OEM2026"
                  class="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                :disabled="billingLoading.promo"
                class="mt-4 inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {{ billingLoading.promo ? "Redeeming..." : "Redeem Code" }}
              </button>
            </form>
          </div>

          <p
            v-if="billingStatus"
            class="mt-4 rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
          >
            {{ billingStatus }}
          </p>
          <p
            v-if="billingError && !showPaymentSheet"
            class="mt-4 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-600"
          >
            {{ billingError }}
          </p>
        </article>
      </div>

      <p
        v-if="statusMessage"
        class="mt-6 w-fit rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
      >
        {{ statusMessage }}
      </p>
      <p
        v-if="errorMessage"
        class="mt-6 w-fit rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-600"
      >
        {{ errorMessage }}
      </p>

      <PaymentSheetModal
        :open="showPaymentSheet"
        :title="paymentSheetTitle"
        :summary-title="paymentSheetLineTitle"
        :summary-detail="paymentSheetLineDetail"
        :amount-label="paymentSheetAmountLabel"
        :submit-label="paymentSheetSubmitLabel"
        :environment-label="checkoutEnvironmentLabel"
        :is-busy="isPaymentSheetBusy"
        :can-submit="checkoutReady"
        :error-message="billingError"
        :form="paymentForm"
        @close="closePaymentSheet"
        @submit="submitPaymentSheet"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch, nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";
import PaymentSheetModal from "@/components/billing/PaymentSheetModal.vue";
import type {
  BillingAddressPayload,
  CheckoutCatalog,
  CheckoutGatewayConfig,
} from "@/services/BillingService";
import { tokenizeAuthorizeNetCard } from "@/services/accept";
import { useServices } from "@/services/container";
import type { Machine } from "@/services/MachineService";
import { useAuthStore } from "@/stores/auth";
import { useToastStore } from "@/stores/toast";

const authStore = useAuthStore();
const router = useRouter();
const { machine, billing, promo } = useServices();
const toastStore = useToastStore();

const statusMessage = ref("");
const errorMessage = ref("");
const userDisplay = computed(
  () => authStore.userFullName || authStore.user?.email || "",
);
const accountName = computed(
  () => authStore.userFullName || authStore.user?.email || "Not provided",
);
const accountEmail = computed(
  () => authStore.user?.email || "No email available",
);
const companyDisplay = computed(
  () =>
    authStore.user?.company_name ||
    authStore.user?.company ||
    "No company provided",
);

const machines = ref<Machine[]>([]);
const machineLoading = ref(false);
const machineSubmitting = ref(false);
const machineMessage = ref("");
const machineError = ref("");
const machineCountLabel = computed(() => {
  if (!machines.value.length) {
    return "No machines saved";
  }

  if (machines.value.length === 1) {
    return "1 machine saved";
  }

  return `${machines.value.length} machines saved`;
});

const machineForm = reactive({
  brand: "",
  model: "",
  serial: "",
  year: "",
});

const checkoutLoading = ref(false);
const checkoutConfig = ref<CheckoutGatewayConfig | null>(null);
const checkoutCatalog = ref<CheckoutCatalog | null>(null);

const paymentForm = reactive({
  cardholderName: "",
  cardNumber: "",
  expirationMonth: "",
  expirationYear: "",
  cvv: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  country: "US",
});

const tokenPurchaseForm = reactive({
  tokens: 10000,
});

const proForm = reactive({
  autoRenew: true,
});

const promoCode = ref("");
const billingLoading = reactive({
  tokens: false,
  pro: false,
  promo: false,
});
const billingStatus = ref("");
const billingError = ref("");

const billingState = reactive({
  tokenBalance: null as number | null,
  subscriptionSummary: "",
});
const paymentSheetMode = ref<"tokens" | "pro" | null>(null);

const frontendApiLoginId =
  import.meta.env.VITE_API_LOGIN_ID?.trim() ||
  import.meta.env.VITE_LOGIN_ID?.trim() ||
  "";
const frontendClientKey = import.meta.env.VITE_CLIENT_KEY?.trim() || "";

const checkoutReady = computed(() =>
  Boolean(
    (checkoutConfig.value?.api_login_id || frontendApiLoginId) &&
    (checkoutConfig.value?.client_key || frontendClientKey) &&
    checkoutConfig.value?.accept_js_url,
  ),
);
const checkoutStatusLabel = computed(() => {
  if (checkoutReady.value) {
    return "Secure checkout ready";
  }

  if (checkoutLoading.value) {
    return "Connecting secure checkout";
  }

  return "Checkout setup needed";
});

const checkoutEnvironmentLabel = computed(() =>
  checkoutConfig.value?.environment === "production"
    ? "Live Gateway"
    : "Sandbox Gateway",
);

const currencyCode = computed(() => checkoutConfig.value?.currency || "USD");
const tokenUnitPrice = computed(() =>
  Number(checkoutCatalog.value?.token_price_per_token || 0),
);
const tokensPerDollar = computed(() => {
  const apiRate = Number(checkoutCatalog.value?.tokens_per_dollar || 0);
  if (apiRate > 0) {
    return apiRate;
  }

  if (tokenUnitPrice.value > 0) {
    return 1 / tokenUnitPrice.value;
  }

  return 0;
});
const tokenPurchaseAmount = computed(() =>
  roundCurrency(tokenPurchaseForm.tokens * tokenUnitPrice.value),
);
const canPurchaseTokens = computed(
  () =>
    tokenUnitPrice.value > 0 &&
    tokenPurchaseForm.tokens >= 10000 &&
    tokenPurchaseAmount.value > 0,
);
const proPrice = computed(() =>
  Number(checkoutCatalog.value?.pro_plan?.price || 0),
);
const proPlanActive = computed(() =>
  Boolean(checkoutCatalog.value?.pro_plan?.active),
);
const proPlanName = computed(
  () => checkoutCatalog.value?.pro_plan?.name || "PRO",
);
const proValidityDays = computed(
  () => checkoutCatalog.value?.pro_plan?.validity_days ?? null,
);
const subscriptionLabel = computed(
  () => billingState.subscriptionSummary || "Free plan",
);
const tokenBalanceLabel = computed(() =>
  billingState.tokenBalance === null
    ? "Pending"
    : String(billingState.tokenBalance),
);
const showPaymentSheet = computed(() => paymentSheetMode.value !== null);
const isPaymentSheetBusy = computed(
  () => billingLoading.tokens || billingLoading.pro,
);
const paymentSheetTitle = computed(() =>
  paymentSheetMode.value === "pro" ? "Activate Pro" : "Buy Tokens",
);
const paymentSheetLineTitle = computed(() =>
  paymentSheetMode.value === "pro"
    ? proPlanName.value
    : `${tokenPurchaseForm.tokens} token${tokenPurchaseForm.tokens === 1 ? "" : "s"}`,
);
const paymentSheetLineDetail = computed(() =>
  paymentSheetMode.value === "pro"
    ? `${proValidityDays.value || "Configured"} day access${proForm.autoRenew ? " • Auto renew on" : ""}`
    : tokensPerDollar.value > 0
      ? `${formatTokenCount(tokensPerDollar.value)} tokens / $1 (${formatTokenUnitPrice(tokenUnitPrice.value)} per token)`
      : `${formatTokenUnitPrice(tokenUnitPrice.value)} per token`,
);
const paymentSheetAmountLabel = computed(() =>
  paymentSheetMode.value === "pro"
    ? formatCurrency(proPrice.value)
    : formatCurrency(tokenPurchaseAmount.value),
);
const paymentSheetSubmitLabel = computed(() => {
  if (paymentSheetMode.value === "pro") {
    return billingLoading.pro
      ? "Processing..."
      : `Pay ${formatCurrency(proPrice.value)}`;
  }

  return billingLoading.tokens
    ? "Processing..."
    : `Pay ${formatCurrency(tokenPurchaseAmount.value)}`;
});

const resolveErrorMessage = (error: any, fallback: string): string => {
  const validationErrors = error?.response?.data?.errors;
  if (validationErrors && typeof validationErrors === "object") {
    const firstKey = Object.keys(validationErrors)[0];
    if (firstKey) {
      const value = validationErrors[firstKey];
      if (Array.isArray(value) && value.length) {
        return value[0];
      }
      if (typeof value === "string") {
        return value;
      }
    }
  }

  return (
    error?.response?.data?.paywall?.title ||
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    fallback
  );
};

const roundCurrency = (value: number): number =>
  Number.isFinite(value) ? Math.round(value * 100) / 100 : 0;

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode.value,
    maximumFractionDigits: 2,
  }).format(Number.isFinite(value) ? value : 0);
};

const formatTokenUnitPrice = (value: number): string => {
  const normalized = Number.isFinite(value) ? value : 0;
  const microPrice = normalized > 0 && normalized < 0.01;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode.value,
    minimumFractionDigits: microPrice ? 4 : 2,
    maximumFractionDigits: microPrice ? 6 : 2,
  }).format(normalized);
};

const formatTokenCount = (value: number): string => {
  const normalized = Number.isFinite(value) ? value : 0;
  const isWhole = Math.abs(normalized - Math.round(normalized)) < 0.00001;

  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: isWhole ? 0 : 2,
  }).format(normalized);
};

const syncBillingStateFromUser = () => {
  if (typeof authStore.user?.token_balance === "number") {
    billingState.tokenBalance = authStore.user.token_balance;
  }

  const planName = String(authStore.user?.plan || "").trim();
  const status = String(
    authStore.user?.subscription_status || "",
  ).toLowerCase();

  if (authStore.user?.has_unlimited_questions || status === "active") {
    billingState.subscriptionSummary = planName
      ? `${planName} active`
      : "Subscription active";
    return;
  }

  if (!planName || planName.toUpperCase() === "FREE") {
    billingState.subscriptionSummary = "";
    return;
  }

  billingState.subscriptionSummary = planName;
};

const syncPaymentIdentity = () => {
  if (!paymentForm.cardholderName) {
    paymentForm.cardholderName = authStore.userFullName || "";
  }
};

const clearBillingMessages = () => {
  billingStatus.value = "";
  billingError.value = "";
};

const clearMachineMessages = () => {
  machineMessage.value = "";
  machineError.value = "";
};

const clearCardSensitiveFields = () => {
  paymentForm.cardNumber = "";
  paymentForm.expirationMonth = "";
  paymentForm.expirationYear = "";
  paymentForm.cvv = "";
};

const closePaymentSheet = () => {
  if (isPaymentSheetBusy.value) {
    return;
  }

  paymentSheetMode.value = null;
};

const openPaymentSheet = (mode: "tokens" | "pro") => {
  clearBillingMessages();
  syncPaymentIdentity();
  paymentSheetMode.value = mode;
};

const splitCardholderName = (fullName: string) => {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  const firstName = parts[0] || authStore.user?.first_name || "";
  const lastName = parts.slice(1).join(" ") || authStore.user?.last_name || "";

  return { firstName, lastName };
};

const buildBillingPayload = (): BillingAddressPayload => {
  const { firstName, lastName } = splitCardholderName(
    paymentForm.cardholderName,
  );

  return {
    first_name: firstName || undefined,
    last_name: lastName || undefined,
    company:
      authStore.user?.company_name || authStore.user?.company || undefined,
    address: paymentForm.address || undefined,
    city: paymentForm.city || undefined,
    state: paymentForm.state || undefined,
    zip: paymentForm.zip || undefined,
    country: paymentForm.country || undefined,
  };
};

const validatePaymentForm = (): string | null => {
  if (!checkoutReady.value || !checkoutConfig.value) {
    return "Secure checkout is not ready yet.";
  }

  if (!paymentForm.cardholderName.trim()) {
    return "Cardholder name is required.";
  }

  const normalizedCardNumber = paymentForm.cardNumber.replace(/\s+/g, "");
  if (!/^\d{12,19}$/.test(normalizedCardNumber)) {
    return "Enter a valid card number.";
  }

  const month = paymentForm.expirationMonth.trim();
  if (!/^\d{1,2}$/.test(month) || Number(month) < 1 || Number(month) > 12) {
    return "Enter a valid expiration month.";
  }

  const year = paymentForm.expirationYear.trim();
  const normalizedYear = year.length === 2 ? `20${year}` : year;
  if (!/^\d{4}$/.test(normalizedYear)) {
    return "Enter a valid expiration year.";
  }

  if (!/^\d{3,4}$/.test(paymentForm.cvv.trim())) {
    return "Enter a valid CVV.";
  }

  return null;
};

const requestOpaquePaymentData = async () => {
  const validationMessage = validatePaymentForm();
  if (validationMessage) {
    throw new Error(validationMessage);
  }

  if (
    !(checkoutConfig.value?.api_login_id || frontendApiLoginId) ||
    !(checkoutConfig.value?.client_key || frontendClientKey) ||
    !checkoutConfig.value?.accept_js_url
  ) {
    throw new Error("Secure checkout is not configured.");
  }

  const normalizedYear =
    paymentForm.expirationYear.trim().length === 2
      ? `20${paymentForm.expirationYear.trim()}`
      : paymentForm.expirationYear.trim();

  return tokenizeAuthorizeNetCard(
    {
      api_login_id: checkoutConfig.value.api_login_id || frontendApiLoginId,
      client_key: checkoutConfig.value.client_key || frontendClientKey,
      accept_js_url: checkoutConfig.value.accept_js_url,
    },
    {
      cardNumber: paymentForm.cardNumber,
      month: paymentForm.expirationMonth,
      year: normalizedYear,
      cardCode: paymentForm.cvv,
      zip: paymentForm.zip || undefined,
      fullName: paymentForm.cardholderName || undefined,
    },
  );
};

const loadBillingCheckout = async () => {
  checkoutLoading.value = true;

  try {
    const { data } = await billing.getCheckoutConfig();
    const payload = data?.data || data || {};
    const checkout = payload.checkout || {};
    const mergedApiLoginId =
      checkout.api_login_id || frontendApiLoginId || undefined;
    const mergedClientKey =
      checkout.client_key || frontendClientKey || undefined;

    checkoutConfig.value = {
      ...checkout,
      api_login_id: mergedApiLoginId,
      client_key: mergedClientKey,
      enabled: Boolean(
        mergedApiLoginId && checkout.accept_js_url && mergedClientKey,
      ),
    };
    checkoutCatalog.value = payload.catalog || null;

    if (payload.billing && typeof payload.billing === "object") {
      authStore.mergeUser(payload.billing);
    }

    if (typeof payload.catalog?.pro_plan?.auto_renew === "boolean") {
      proForm.autoRenew = payload.catalog.pro_plan.auto_renew;
    }

    syncBillingStateFromUser();
    syncPaymentIdentity();
  } catch (error: any) {
    billingError.value = resolveErrorMessage(
      error,
      "Unable to load secure checkout configuration.",
    );
  } finally {
    checkoutLoading.value = false;
  }
};

const loadMachines = async () => {
  machineLoading.value = true;
  try {
    const { data } = await machine.list();
    machines.value = Array.isArray(data?.machines) ? data.machines : [];
  } catch (error: any) {
    machineError.value = resolveErrorMessage(
      error,
      "Unable to load machines right now.",
    );
  } finally {
    machineLoading.value = false;
  }
};

const handleCreateMachine = async () => {
  clearMachineMessages();

  if (!machineForm.brand || !machineForm.model) {
    machineError.value = "Brand and model are required.";
    return;
  }

  const normalizedYear = machineForm.year
    ? Number(machineForm.year)
    : undefined;
  if (machineForm.year && Number.isNaN(normalizedYear)) {
    machineError.value = "Year must be a valid number.";
    return;
  }

  machineSubmitting.value = true;
  try {
    const { data } = await machine.create({
      brand: machineForm.brand,
      model: machineForm.model,
      serial: machineForm.serial || undefined,
      year: normalizedYear,
    });

    if (data?.machine) {
      machines.value = [
        data.machine,
        ...machines.value.filter((item) => item.id !== data.machine.id),
      ];
    }

    machineMessage.value = data?.message || "Machine added successfully.";
    machineForm.brand = "";
    machineForm.model = "";
    machineForm.serial = "";
    machineForm.year = "";
  } catch (error: any) {
    machineError.value = resolveErrorMessage(error, "Unable to add machine.");
  } finally {
    machineSubmitting.value = false;
  }
};

const handlePurchaseTokens = async () => {
  clearBillingMessages();

  if (!tokenPurchaseForm.tokens || tokenPurchaseForm.tokens < 10000) {
    billingError.value = "Minimum token purchase is 10,000.";
    return;
  }

  if (tokenUnitPrice.value <= 0) {
    billingError.value = "Token pricing is not configured.";
    return;
  }

  billingLoading.tokens = true;
  try {
    const opaqueData = await requestOpaquePaymentData();
    const { data } = await billing.purchaseTokens({
      tokens: tokenPurchaseForm.tokens,
      amount: tokenPurchaseAmount.value,
      opaque_data: opaqueData,
      billing: buildBillingPayload(),
    });

    if (typeof data?.token_balance === "number") {
      billingState.tokenBalance = data.token_balance;
    }

    await authStore.fetchProfile();
    syncBillingStateFromUser();
    clearCardSensitiveFields();
    paymentSheetMode.value = null;
    billingStatus.value = data?.message || "Token purchase successful.";
  } catch (error: any) {
    billingError.value = resolveErrorMessage(
      error,
      "Unable to purchase tokens right now.",
    );
  } finally {
    billingLoading.tokens = false;
  }
};

const handleActivatePro = async () => {
  clearBillingMessages();

  if (proPrice.value <= 0) {
    billingError.value = "Pro pricing is not configured.";
    return;
  }

  if (!proValidityDays.value) {
    billingError.value = "Pro validity is not configured.";
    return;
  }

  if (!proPlanActive.value) {
    billingError.value = "The Pro plan is currently unavailable.";
    return;
  }

  billingLoading.pro = true;
  try {
    const opaqueData = await requestOpaquePaymentData();
    const { data } = await billing.activatePro({
      amount: proPrice.value,
      validity_days: proValidityDays.value,
      auto_renew: proForm.autoRenew,
      opaque_data: opaqueData,
      billing: buildBillingPayload(),
    });

    await authStore.fetchProfile();
    syncBillingStateFromUser();

    const planName = data?.subscription?.plan?.name || proPlanName.value;
    const endDate = data?.subscription?.end_date
      ? new Date(data.subscription.end_date).toLocaleDateString()
      : "";

    billingState.subscriptionSummary = endDate
      ? `${planName} active until ${endDate}`
      : `${planName} active`;

    clearCardSensitiveFields();
    paymentSheetMode.value = null;
    billingStatus.value = data?.message || "Pro subscription activated.";
  } catch (error: any) {
    billingError.value = resolveErrorMessage(error, "Unable to activate Pro.");
  } finally {
    billingLoading.pro = false;
  }
};

const handleRedeemPromo = async () => {
  clearBillingMessages();

  if (!promoCode.value) {
    billingError.value = "Enter a promo code to redeem.";
    return;
  }

  billingLoading.promo = true;
  try {
    const { data } = await promo.redeem(promoCode.value);
    if (typeof data?.wallet?.token_balance === "number") {
      const current = billingState.tokenBalance || 0;
      billingState.tokenBalance = current + data.wallet.token_balance;
    }
    await authStore.fetchProfile();
    syncBillingStateFromUser();
    billingStatus.value = data?.message || "Promo code redeemed successfully.";
    promoCode.value = "";
  } catch (error: any) {
    billingError.value = resolveErrorMessage(
      error,
      "Unable to redeem promo code.",
    );
  } finally {
    billingLoading.promo = false;
  }
};

const submitPaymentSheet = async () => {
  if (paymentSheetMode.value === "pro") {
    await handleActivatePro();
    return;
  }

  await handlePurchaseTokens();
};

watch(statusMessage, (message) => {
  if (message) {
    toastStore.success(message);
  }
});

watch(errorMessage, (message) => {
  if (message) {
    toastStore.error(message);
  }
});

watch(machineMessage, (message) => {
  if (message) {
    toastStore.success(message);
  }
});

watch(machineError, (message) => {
  if (message) {
    toastStore.error(message);
  }
});

watch(billingStatus, (message) => {
  if (message) {
    toastStore.success(message);
  }
});

watch(billingError, (message) => {
  if (message) {
    toastStore.error(message);
  }
});

onMounted(async () => {
  if (!authStore.user && authStore.token) {
    try {
      await authStore.fetchProfile();
    } catch {
      errorMessage.value =
        authStore.error || "Unable to load your profile right now.";
    }
  }

  syncBillingStateFromUser();
  syncPaymentIdentity();

  await Promise.all([loadMachines(), loadBillingCheckout()]);

  // If a hash or query section is provided, scroll to that section
  const scrollToSection = (sec?: string) => {
    if (!sec) return;
    const id = String(sec).replace(/^#/, "");
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 120);
  };

  // prefer explicit hash, fallback to ?section=...
  const route = useRoute();
  if (route.hash) {
    scrollToSection(route.hash);
  } else if (route.query && route.query.section) {
    scrollToSection(String(route.query.section));
  }
});
onMounted(async () => {
  await nextTick()

  if (window.location.hash) {
    const el = document.querySelector(window.location.hash)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }
})
const handleLogout = async () => {
  statusMessage.value = "";
  errorMessage.value = "";
  try {
    await authStore.logout();
    statusMessage.value = "You have been logged out.";
    router.push({
      name: "login",
    });
  } catch {
    errorMessage.value =
      authStore.error || "We could not log you out. Please try again.";
  }
};
</script>
