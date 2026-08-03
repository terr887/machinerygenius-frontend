<template>
  <div class="w-full bg-gradient-to-br from-slate-50 via-white to-blue-50">
    <div class="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <button
        type="button"
        @click="router.push({ name: 'account', hash: '#machines' })"
        class="mb-4 inline-flex items-center gap-1 text-sm font-semibold text-slate-600 hover:text-slate-900"
      >
        ← Back to Machine Garage
      </button>

      <div v-if="loading" class="rounded-[28px] border border-slate-200 bg-white p-8 text-center text-slate-500">
        Loading machine profile...
      </div>

      <div v-else-if="!machine" class="rounded-[28px] border border-slate-200 bg-white p-8 text-center text-slate-500">
        Machine not found.
      </div>

      <template v-else>
        <section class="relative overflow-hidden rounded-[28px] bg-slate-900 px-6 py-7 text-white shadow-2xl sm:px-8 sm:py-8">
          <div class="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">Machine Garage</p>
              <h1 class="mt-2 text-2xl font-semibold sm:text-3xl">
                {{ machine.nickname || `${machine.brand} ${machine.model}` }}
              </h1>
              <p class="mt-1 text-sm text-slate-300">
                {{ machine.brand }} {{ machine.model }}
                <span v-if="machine.serial"> · Serial {{ machine.serial }}</span>
                <span v-if="machine.year"> · {{ machine.year }}</span>
              </p>
            </div>
            <button
              type="button"
              @click="handleAskAboutMachine"
              class="inline-flex items-center justify-center rounded-xl bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-400"
            >
              Ask about this machine
            </button>
          </div>
        </section>

        <nav class="mt-6 flex flex-wrap gap-2">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            type="button"
            @click="activeTab = tab.key"
            class="rounded-full px-4 py-2 text-sm font-semibold transition"
            :class="activeTab === tab.key
              ? 'bg-blue-600 text-white'
              : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'"
          >
            {{ tab.label }}
          </button>
        </nav>

        <div class="mt-6 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <!-- Overview -->
          <div v-if="activeTab === 'overview'">
            <h2 class="text-lg font-semibold text-slate-950">Overview</h2>
            <form class="mt-4 grid gap-3 sm:grid-cols-2" @submit.prevent="handleUpdateMachine">
              <div>
                <label class="mb-1.5 block text-xs font-bold text-slate-900">Nickname</label>
                <input v-model.trim="editForm.nickname" type="text" placeholder="Shop nickname"
                  class="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label class="mb-1.5 block text-xs font-bold text-slate-900">Location</label>
                <input v-model.trim="editForm.location" type="text" placeholder="Bay 3"
                  class="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label class="mb-1.5 block text-xs font-bold text-slate-900">Serial</label>
                <input v-model.trim="editForm.serial" type="text"
                  class="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label class="mb-1.5 block text-xs font-bold text-slate-900">Year</label>
                <input v-model.trim="editForm.year" type="number" min="1900" max="2100"
                  class="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div class="sm:col-span-2">
                <button type="submit" :disabled="savingOverview"
                  class="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
                  {{ savingOverview ? 'Saving...' : 'Save Changes' }}
                </button>
              </div>
            </form>

            <div class="mt-8 border-t border-slate-200 pt-6">
              <h3 class="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">QR Code</h3>
              <p class="mt-1 text-sm text-slate-600">
                Print this and stick it on the machine to jump straight back into its Garage profile.
              </p>
              <button type="button" @click="handleLoadQrCode" :disabled="qrLoading"
                class="mt-3 inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60">
                {{ qrLoading ? 'Generating...' : (qrSvg ? 'Refresh QR Code' : 'Generate QR Code') }}
              </button>
              <div v-if="qrSvg" class="mt-4 inline-block rounded-2xl border border-slate-200 bg-slate-50 p-4" v-html="qrSvg"></div>
            </div>
          </div>

          <!-- Manuals -->
          <div v-else-if="activeTab === 'manuals'">
            <h2 class="text-lg font-semibold text-slate-950">Manuals</h2>
            <div class="mt-4 flex flex-wrap gap-2">
              <input v-model.trim="manualQuery" type="text" placeholder="Search manuals by title, brand, or model"
                class="w-full max-w-md rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                @keyup.enter="handleSearchManuals" />
              <button type="button" @click="handleSearchManuals" :disabled="manualSearchLoading"
                class="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                {{ manualSearchLoading ? 'Searching...' : 'Search' }}
              </button>
            </div>

            <div v-if="manualResults.length" class="mt-4 space-y-2">
              <div v-for="result in manualResults" :key="result.id"
                class="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div>
                  <p class="text-sm font-semibold text-slate-900">{{ result.title || 'Untitled manual' }}</p>
                  <p class="text-xs text-slate-500">{{ result.machine_name }} {{ result.model_no }}</p>
                </div>
                <button type="button" @click="handleAttachManual(result.id)"
                  class="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700">
                  Attach
                </button>
              </div>
            </div>

            <div class="mt-6 border-t border-slate-200 pt-5">
              <h3 class="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Attached manuals</h3>
              <div v-if="!machine.manuals?.length" class="mt-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
                No manuals attached yet.
              </div>
              <div v-else class="mt-3 space-y-2">
                <div v-for="m in machine.manuals" :key="m.id"
                  class="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3">
                  <p class="text-sm font-semibold text-slate-900">{{ m.title || 'Untitled manual' }}</p>
                  <button type="button" @click="handleDetachManual(m.id)"
                    class="text-xs font-semibold text-red-600 hover:text-red-700">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Photos -->
          <div v-else-if="activeTab === 'photos'">
            <h2 class="text-lg font-semibold text-slate-950">Photos</h2>
            <form class="mt-4 flex flex-wrap items-center gap-3" @submit.prevent="handleUploadPhoto">
              <input ref="photoInput" type="file" accept="image/*" @change="handlePhotoSelected"
                class="text-sm text-slate-700" />
              <input v-model.trim="photoCaption" type="text" placeholder="Caption (optional)"
                class="rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <button type="submit" :disabled="!selectedPhoto || photoUploading"
                class="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
                {{ photoUploading ? 'Uploading...' : 'Upload Photo' }}
              </button>
            </form>

            <div v-if="!machine.photos?.length" class="mt-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
              No photos yet. Add one so you can recognize this machine at a glance.
            </div>
            <div v-else class="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              <div v-for="photo in machine.photos" :key="photo.id" class="group relative overflow-hidden rounded-2xl border border-slate-200">
                <img :src="photo.url" :alt="photo.caption || 'Machine photo'" class="h-32 w-full object-cover" />
                <button type="button" @click="handleDeletePhoto(photo.id)"
                  class="absolute right-1 top-1 rounded-full bg-black/60 px-2 py-0.5 text-xs text-white opacity-0 transition group-hover:opacity-100">
                  ×
                </button>
              </div>
            </div>
          </div>

          <!-- Maintenance -->
          <div v-else-if="activeTab === 'maintenance'">
            <h2 class="text-lg font-semibold text-slate-950">Maintenance Log</h2>
            <form class="mt-4 grid gap-3 sm:grid-cols-2" @submit.prevent="handleLogMaintenance">
              <div>
                <label class="mb-1.5 block text-xs font-bold text-slate-900">Type</label>
                <select v-model="maintenanceForm.type"
                  class="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="oil_change">Oil Change</option>
                  <option value="filter">Filter</option>
                  <option value="inspection">Inspection</option>
                  <option value="repair">Repair</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label class="mb-1.5 block text-xs font-bold text-slate-900">Performed On</label>
                <input v-model="maintenanceForm.performed_at" type="date"
                  class="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label class="mb-1.5 block text-xs font-bold text-slate-900">Next Due</label>
                <input v-model="maintenanceForm.next_due_at" type="date"
                  class="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div class="sm:col-span-2">
                <label class="mb-1.5 block text-xs font-bold text-slate-900">Notes</label>
                <textarea v-model.trim="maintenanceForm.notes" rows="2"
                  class="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
              </div>
              <div class="sm:col-span-2">
                <button type="submit" :disabled="maintenanceSaving"
                  class="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
                  {{ maintenanceSaving ? 'Saving...' : 'Log Maintenance' }}
                </button>
              </div>
            </form>

            <div class="mt-6 border-t border-slate-200 pt-5">
              <div v-if="!machine.maintenance_logs?.length" class="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
                No maintenance logged yet.
              </div>
              <div v-else class="space-y-2">
                <div v-for="log in machine.maintenance_logs" :key="log.id"
                  class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <p class="text-sm font-semibold capitalize text-slate-900">{{ log.type.replace('_', ' ') }}</p>
                  <p class="text-xs text-slate-500">
                    Performed {{ log.performed_at }}
                    <span v-if="log.next_due_at"> · Next due {{ log.next_due_at }}</span>
                  </p>
                  <p v-if="log.notes" class="mt-1 text-sm text-slate-600">{{ log.notes }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Notes -->
          <div v-else-if="activeTab === 'notes'">
            <h2 class="text-lg font-semibold text-slate-950">Notes</h2>
            <form class="mt-4 flex flex-col gap-3" @submit.prevent="handleAddNote">
              <textarea v-model.trim="noteBody" rows="3" placeholder="Add a note about this machine"
                class="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
              <button type="submit" :disabled="!noteBody || noteSaving"
                class="self-start rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
                {{ noteSaving ? 'Saving...' : 'Add Note' }}
              </button>
            </form>

            <div class="mt-6 space-y-2">
              <div v-if="!machine.notes?.length" class="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
                No notes yet.
              </div>
              <div v-for="note in machine.notes" :key="note.id"
                class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                {{ note.body }}
              </div>
            </div>
          </div>

          <!-- Chat History -->
          <div v-else-if="activeTab === 'chats'">
            <h2 class="text-lg font-semibold text-slate-950">Chat History</h2>
            <div v-if="chatsLoading" class="mt-4 text-sm text-slate-500">Loading chats...</div>
            <div v-else-if="!chats.length" class="mt-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
              No saved chats for this machine yet.
            </div>
            <div v-else class="mt-4 space-y-2">
              <RouterLink v-for="chat in chats" :key="chat.uuid" :to="{ name: 'chat-session', params: { session: chat.uuid } }"
                class="block rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition hover:border-blue-300 hover:bg-blue-50">
                <p class="text-sm font-semibold text-slate-900">{{ chat.title || 'Untitled chat' }}</p>
              </RouterLink>
            </div>
          </div>

          <p v-if="feedback" class="mt-4 rounded-xl border px-3 py-2 text-sm"
            :class="feedback.type === 'error' ? 'border-red-100 bg-red-50 text-red-600' : 'border-emerald-100 bg-emerald-50 text-emerald-700'">
            {{ feedback.message }}
          </p>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { useServices } from '@/services/container'
import type { Machine, ManualSummary, ChatSessionSummary } from '@/services/MachineService'

const route = useRoute()
const router = useRouter()
const { machine: machineService } = useServices()

const machine = ref<Machine | null>(null)

// The /machines/{id} API routes look up machines by qr_uuid, not the numeric
// primary key, so every scoped machine endpoint must be called with qr_uuid.
const machineKey = computed(() => machine.value?.qr_uuid || String(machine.value?.id ?? ''))
const loading = ref(true)
const activeTab = ref('overview')
const feedback = ref<{ type: 'success' | 'error'; message: string } | null>(null)

const tabs = [
  { key: 'overview', label: 'Overview' },
  { key: 'manuals', label: 'Manuals' },
  { key: 'photos', label: 'Photos' },
  { key: 'maintenance', label: 'Maintenance' },
  { key: 'notes', label: 'Notes' },
  { key: 'chats', label: 'Chat History' }
]

const editForm = reactive({ nickname: '', location: '', serial: '', year: '' })
const savingOverview = ref(false)

const qrSvg = ref('')
const qrLoading = ref(false)

const manualQuery = ref('')
const manualResults = ref<ManualSummary[]>([])
const manualSearchLoading = ref(false)

const photoInput = ref<HTMLInputElement | null>(null)
const selectedPhoto = ref<File | null>(null)
const photoCaption = ref('')
const photoUploading = ref(false)

const maintenanceForm = reactive({ type: 'oil_change', performed_at: '', next_due_at: '', notes: '' })
const maintenanceSaving = ref(false)

const noteBody = ref('')
const noteSaving = ref(false)

const chats = ref<ChatSessionSummary[]>([])
const chatsLoading = ref(false)

const showFeedback = (type: 'success' | 'error', message: string) => {
  feedback.value = { type, message }
  setTimeout(() => {
    if (feedback.value?.message === message) {
      feedback.value = null
    }
  }, 4000)
}

const resolveErrorMessage = (error: any, fallback: string) =>
  error?.response?.data?.paywall?.title || error?.response?.data?.message || fallback

const loadMachine = async () => {
  loading.value = true
  try {
    const { data } = await machineService.get(String(route.params.id))
    machine.value = data.machine
    editForm.nickname = data.machine.nickname || ''
    editForm.location = data.machine.location || ''
    editForm.serial = data.machine.serial || ''
    editForm.year = data.machine.year ? String(data.machine.year) : ''
  } catch (error) {
    showFeedback('error', resolveErrorMessage(error, 'Unable to load this machine.'))
  } finally {
    loading.value = false
  }
}

const handleUpdateMachine = async () => {
  if (!machine.value) return
  savingOverview.value = true
  try {
    const { data } = await machineService.update(machineKey.value, {
      nickname: editForm.nickname || undefined,
      location: editForm.location || undefined,
      serial: editForm.serial || undefined,
      year: editForm.year ? Number(editForm.year) : null
    })
    machine.value = { ...machine.value, ...data.machine }
    showFeedback('success', 'Machine updated.')
  } catch (error) {
    showFeedback('error', resolveErrorMessage(error, 'Unable to update this machine.'))
  } finally {
    savingOverview.value = false
  }
}

const handleAskAboutMachine = () => {
  if (!machine.value) return
  router.push({
    name: 'app',
    query: {
      machine_id: String(machine.value.id),
      machine_label: machine.value.nickname || `${machine.value.brand} ${machine.value.model}`
    }
  })
}

const handleLoadQrCode = async () => {
  if (!machine.value) return
  qrLoading.value = true
  try {
    const { data } = await machineService.qrCode(machineKey.value)
    qrSvg.value = data
  } catch (error) {
    showFeedback('error', resolveErrorMessage(error, 'Unable to generate QR code.'))
  } finally {
    qrLoading.value = false
  }
}

const handleSearchManuals = async () => {
  manualSearchLoading.value = true
  try {
    const { data } = await machineService.searchManuals(manualQuery.value)
    manualResults.value = data.manuals?.data || []
  } catch (error) {
    showFeedback('error', resolveErrorMessage(error, 'Unable to search manuals.'))
  } finally {
    manualSearchLoading.value = false
  }
}

const handleAttachManual = async (manualId: number) => {
  if (!machine.value) return
  try {
    const { data } = await machineService.attachManual(machineKey.value, manualId)
    machine.value.manuals = data.manuals
    showFeedback('success', 'Manual attached.')
  } catch (error) {
    showFeedback('error', resolveErrorMessage(error, 'Unable to attach this manual.'))
  }
}

const handleDetachManual = async (manualId: number) => {
  if (!machine.value) return
  try {
    const { data } = await machineService.detachManual(machineKey.value, manualId)
    machine.value.manuals = data.manuals
  } catch (error) {
    showFeedback('error', resolveErrorMessage(error, 'Unable to remove this manual.'))
  }
}

const handlePhotoSelected = (event: Event) => {
  const target = event.target as HTMLInputElement
  selectedPhoto.value = target.files?.[0] || null
}

const handleUploadPhoto = async () => {
  if (!machine.value || !selectedPhoto.value) return
  photoUploading.value = true
  try {
    const { data } = await machineService.uploadPhoto(machineKey.value, selectedPhoto.value, {
      caption: photoCaption.value || undefined
    })
    machine.value.photos = [...(machine.value.photos || []), data.photo]
    selectedPhoto.value = null
    photoCaption.value = ''
    if (photoInput.value) photoInput.value.value = ''
    showFeedback('success', 'Photo uploaded.')
  } catch (error) {
    showFeedback('error', resolveErrorMessage(error, 'Unable to upload this photo.'))
  } finally {
    photoUploading.value = false
  }
}

const handleDeletePhoto = async (photoId: number) => {
  if (!machine.value) return
  try {
    await machineService.deletePhoto(machineKey.value, photoId)
    machine.value.photos = (machine.value.photos || []).filter((p) => p.id !== photoId)
  } catch (error) {
    showFeedback('error', resolveErrorMessage(error, 'Unable to delete this photo.'))
  }
}

const handleLogMaintenance = async () => {
  if (!machine.value || !maintenanceForm.performed_at) return
  maintenanceSaving.value = true
  try {
    const { data } = await machineService.logMaintenance(machineKey.value, {
      type: maintenanceForm.type,
      performed_at: maintenanceForm.performed_at,
      next_due_at: maintenanceForm.next_due_at || undefined,
      notes: maintenanceForm.notes || undefined
    })
    machine.value.maintenance_logs = [data.maintenance_log, ...(machine.value.maintenance_logs || [])]
    maintenanceForm.notes = ''
    showFeedback('success', 'Maintenance logged.')
  } catch (error) {
    showFeedback('error', resolveErrorMessage(error, 'Unable to log maintenance.'))
  } finally {
    maintenanceSaving.value = false
  }
}

const handleAddNote = async () => {
  if (!machine.value || !noteBody.value) return
  noteSaving.value = true
  try {
    const { data } = await machineService.addNote(machineKey.value, noteBody.value)
    machine.value.notes = [data.note, ...(machine.value.notes || [])]
    noteBody.value = ''
  } catch (error) {
    showFeedback('error', resolveErrorMessage(error, 'Unable to add this note.'))
  } finally {
    noteSaving.value = false
  }
}

const loadChats = async () => {
  if (!machine.value) return
  chatsLoading.value = true
  try {
    const { data } = await machineService.chatSessions(machineKey.value)
    chats.value = data.chats || []
  } catch (error) {
    showFeedback('error', resolveErrorMessage(error, 'Unable to load chat history.'))
  } finally {
    chatsLoading.value = false
  }
}

onMounted(async () => {
  await loadMachine()
  await loadChats()
})
</script>
