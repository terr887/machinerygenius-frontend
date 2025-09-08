<template>
  <div class="flex items-end mb-4 w-full" :class="{ 'flex-row-reverse': isUser }" role="article"
    :aria-label="isUser ? 'User message' : 'Assistant message'">
    <MessageAvatar :isUser="isUser" />

    <div class="flex-1">
      <Bubble :message="message" :isUser="isUser">
        <template #more_context>
          <div class="mb-3 py-2 px-1 bg-yellow-50 rounded-lg" aria-live="polite" v-if="message.need_more_context">
            <p class="text-xs text-yellow-800">Can you please provide more context for the same? e.g Model number or
              Machine name.</p>
          </div>
        </template>

        <template #advice>
          <AdviceList :points="message.advice_points" />
        </template>

        <template #followups>
          <!-- related models chips -->
          <RelatedModels :models="message.related_models" @selectModel="handleModelSelect" />

          <!-- show need_more_context hint and followups -->
          <FollowUpGroup :questions="message.followup_questions" @sendFollowup="handleFollowup" />
        </template>
      </Bubble>
    </div>
  </div>
</template>

<script setup>

import MessageAvatar from '@/components/partials/bubble/MessageAvatar.vue'
import Bubble from '@/components/partials/bubble/Bubble.vue'
import AdviceList from '@/components/partials/bubble/AdviceList.vue'
import FollowUpGroup from '@/components/partials/bubble/FollowUpGroup.vue'
import RelatedModels from '@/components/partials/bubble/RelatedModels.vue'

const emits = defineEmits(['sendFollowup', 'sendMessage', 'fillContext'])
const props = defineProps({
  message: { type: Object, required: true },
  isUser: { type: Boolean, default: false }
})

function handleFollowup(q) { emits('sendFollowup', q) }

function handleModelSelect(model) {
  emits('sendFollowup', model)
  emits('fillContext', { field: 'model', value: model })
}
</script>

<style scoped>
.break-words {
  word-break: break-word;
}

@media (max-width: 420px) {
  .px-3 {
    padding-left: 0.6rem;
    padding-right: 0.6rem;
  }

  .py-2 {
    padding-top: 0.45rem;
    padding-bottom: 0.45rem;
  }
}

@media (max-width: 420px) {
  .from-blue-600 {
    --tw-gradient-from: #2563eb;
  }
}

button:focus {
  outline: 3px solid rgba(59, 130, 246, 0.18);
  outline-offset: 2px;
}
</style>
