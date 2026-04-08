<template>
  <div class="w-full rounded-xl border border-slate-200 bg-white/90 p-3 shadow-sm backdrop-blur-sm">
    <div class="flex flex-wrap items-start justify-between gap-2">
      <div>
        <p class="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Usage Snapshot</p>
        <p class="mt-0.5 text-xs font-medium leading-5 text-slate-700">{{ remainingLabel }}</p>
      </div>
      <div v-if="planLabel" class="rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700">
        {{ planLabel }}
      </div>
    </div>

    <div class="mt-3 grid grid-cols-3 gap-2">
      <article class="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-2">
        <p class="text-[10px] font-semibold uppercase tracking-wide text-slate-500">Total</p>
        <p class="mt-0.5 text-lg font-bold text-slate-900">{{ totalQuestions }}</p>
      </article>

      <article class="rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-2">
        <p class="text-[10px] font-semibold uppercase tracking-wide text-amber-700">Left</p>
        <p class="mt-0.5 text-lg font-bold text-amber-900">{{ remainingValue }}</p>
      </article>

      <article class="rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-2">
        <p class="text-[10px] font-semibold uppercase tracking-wide text-emerald-700">Source</p>
        <p class="mt-0.5 text-xs font-bold leading-4 text-emerald-900">{{ currentSourceLabel }}</p>
      </article>
    </div>

    <p class="mt-2 text-[10px] leading-4 text-slate-500">
      Free {{ freeRemaining }} • User Tokens {{ tokenBalance }} • Sponsored {{ sponsoredBalance }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { AuthUser } from '@/services/AuthService'

const props = defineProps<{
  user?: AuthUser | null
}>()

const totalQuestions = computed(() => Number(props.user?.lifetime_questions_used ?? 0))
const freeRemaining = computed(() => Number(props.user?.free_questions_remaining ?? 0))
const tokenBalance = computed(() => Number(props.user?.token_balance ?? 0))
const sponsoredBalance = computed(() => Number(props.user?.sponsored_token_balance ?? 0))
const planLabel = computed(() => props.user?.plan || '')
const hasUnlimitedQuestions = computed(() => Boolean(props.user?.has_unlimited_questions))
const totalRemaining = computed(() => {
  if (hasUnlimitedQuestions.value) {
    return null
  }

  if (typeof props.user?.total_questions_remaining === 'number') {
    return props.user.total_questions_remaining
  }

  return freeRemaining.value + tokenBalance.value + sponsoredBalance.value
})
const remainingValue = computed(() => hasUnlimitedQuestions.value ? 'Unlimited' : String(totalRemaining.value ?? 0))
const remainingLabel = computed(() => {
  return props.user?.remaining_questions_label
    || props.user?.header_label
    || (hasUnlimitedQuestions.value ? 'Unlimited questions available' : `${remainingValue.value} questions remaining`)
})
const currentSourceLabel = computed(() => props.user?.current_question_source_label || 'No Credits Remaining')
</script>
