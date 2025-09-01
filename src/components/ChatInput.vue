<template>
  <div :class="['p-4 bg-gray-50', hasTopBorder ? 'border-t border-gray-200' : null]">
    <div class="max-w-4xl mx-auto">
      <div class="relative bg-white rounded-lg">
        <!-- File Upload Button -->
        <button v-if="allowFileUpload" @click="triggerFileUpload"
          class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors z-10"
          title="Attach file">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
          </svg>
        </button>

        <!-- Main Input -->
        <input ref="inputBoxRef" v-model="inputMessage" @keydown="handleKeydown" @input="adjustHeight"
          :placeholder="placeholder" :disabled="disabled || isLoading" :class="[
            'w-full resize-none outline-none text-sm text-gray-700 placeholder:text-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200',
            allowFileUpload ? 'pl-12 pr-20' : 'pl-5 pr-30',
            'py-3 min-h-[48px] max-h-32 overflow-y-auto'
          ]" rows="2" />

        <!-- Character Count -->
        <div v-if="showCharCount && maxLength" :class="[
          'absolute right-16 top-1/2 transform -translate-y-1/2 text-xs',
          inputMessage.length > maxLength * 0.8 ? 'text-orange-500' : 'text-gray-400',
          inputMessage.length >= maxLength ? 'text-red-500' : ''
        ]">
          {{ inputMessage.length }}/{{ maxLength }}
        </div>

        <!-- Send Button -->
        <button @click="sendMessage" :disabled="!canSend" :class="[
          'bg-blue-600 text-white text-xs rounded px-2 py-2 absolute right-2 top-1/2 transform -translate-y-1/2 transition-all duration-200',
          canSend
            ? 'text-blue-600 hover:bg-blue-700'
            : 'disabled:opacity-50 text-gray-300 cursor-not-allowed'
        ]" title="Send message">
          <svg v-if="!isLoading" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          <!-- Loading spinner -->
          <svg v-else class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
          </svg>
        </button>

        <!-- File input (hidden) -->
        <input v-if="allowFileUpload" ref="fileInputRef" type="file" :accept="acceptedFileTypes"
          :multiple="allowMultipleFiles" @change="handleFileUpload" class="hidden" />
      </div>

      <!-- File Preview -->
      <div v-if="uploadedFiles.length > 0" class="mt-3 flex flex-wrap gap-2">
        <div v-for="(file, index) in uploadedFiles" :key="index"
          class="flex items-center space-x-2 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
          <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span class="text-sm text-blue-800">{{ file.name }}</span>
          <button @click="removeFile(index)" class="text-blue-600 hover:text-blue-800">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Typing Indicator -->
      <div v-if="showTypingIndicator" class="mt-2 text-sm text-gray-500 animate-pulse">
        {{ typingText }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, watch } from 'vue'

// Props
const props = defineProps({
  placeholder: {
    type: String,
    default: 'Type your message...'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  hasTopBorder: {
    type: Boolean,
    default: true
  },
  allowFileUpload: {
    type: Boolean,
    default: true
  },
  allowMultipleFiles: {
    type: Boolean,
    default: true
  },
  acceptedFileTypes: {
    type: String,
    default: 'image/*,application/pdf,.doc,.docx,.txt'
  },
  maxLength: {
    type: Number,
    default: 2000
  },
  showCharCount: {
    type: Boolean,
    default: true
  },
  showTypingIndicator: {
    type: Boolean,
    default: false
  },
  typingText: {
    type: String,
    default: 'Bot is typing...'
  },
  autoFocus: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['send-message', 'file-upload', 'input-change'])

// Refs
const inputBoxRef = ref(null)
const fileInputRef = ref(null)
const inputMessage = ref('')
const uploadedFiles = ref([])

// Computed
const canSend = computed(() => {
  return !props.disabled &&
    !props.isLoading &&
    (inputMessage.value.trim().length > 0 || uploadedFiles.value.length > 0) &&
    (!props.maxLength || inputMessage.value.length <= props.maxLength)
})

// Methods
const sendMessage = () => {
  if (!canSend.value) return

  const messageData = {
    text: inputMessage.value.trim(),
    files: [...uploadedFiles.value],
    timestamp: new Date()
  }

  emit('send-message', messageData)

  // Clear input and files
  inputMessage.value = ''
  uploadedFiles.value = []
  adjustHeight()
}

const handleKeydown = (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    sendMessage()
  }
}

const adjustHeight = () => {
  nextTick(() => {
    if (inputBoxRef.value) {
      inputBoxRef.value.style.height = 'auto'
      inputBoxRef.value.style.height = Math.min(inputBoxRef.value.scrollHeight, 128) + 'px'
    }
  })
}

const triggerFileUpload = () => {
  fileInputRef.value?.click()
}

const handleFileUpload = (event) => {
  const files = Array.from(event.target.files)

  if (props.allowMultipleFiles) {
    uploadedFiles.value.push(...files)
  } else {
    uploadedFiles.value = [files[0]]
  }

  emit('file-upload', files)

  // Clear the input so the same file can be selected again
  event.target.value = ''
}

const removeFile = (index) => {
  uploadedFiles.value.splice(index, 1)
}

// Watchers
watch(() => inputMessage.value, (newValue) => {
  emit('input-change', newValue)
  adjustHeight()
})

// Auto focus on mount
if (props.autoFocus) {
  nextTick(() => {
    inputBoxRef.value?.focus()
  })
}
</script>