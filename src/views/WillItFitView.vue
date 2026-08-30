<template>
  <main class="min-h-full bg-slate-100 px-4 py-5 text-slate-900">
    <div class="mx-auto max-w-5xl space-y-5">
      <header class="rounded-2xl bg-slate-950 p-5 text-white shadow-lg">
        <p class="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">Machinery Genius</p>
        <h1 class="mt-1 text-3xl font-black">Will It Fit?™</h1>
        <p class="mt-2 max-w-3xl text-sm leading-6 text-slate-200">
          Place a life-size machine envelope in your facility with your phone. Exact 3D models are used when available;
          otherwise Machinery Genius creates an accurate gray size representation from the overall dimensions.
        </p>
      </header>

      <div class="grid gap-5 lg:grid-cols-[360px_minmax(0,1fr)]">
        <section class="space-y-4">
          <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 class="text-lg font-black">1. Choose a machine</h2>

            <label class="mt-3 block text-sm font-bold" for="machine-select">Machine source</label>
            <select
              id="machine-select"
              v-model="selectedMachineId"
              class="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-base outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              @change="selectMachine"
            >
              <option value="custom">Enter custom dimensions</option>
              <optgroup v-if="machines.length" label="My Machine Garage">
                <option v-for="machine in machines" :key="machine.id" :value="String(machine.id)">
                  {{ machine.brand }} • {{ machine.model }}{{ machine.nickname ? ` • ${machine.nickname}` : '' }}
                </option>
              </optgroup>
            </select>

            <p v-if="machinesLoading" class="mt-2 text-xs font-bold text-blue-700">Loading your Garage…</p>
            <p v-else-if="machinesError" class="mt-2 text-xs leading-5 text-amber-700">
              Your Garage could not be loaded. Custom dimensions still work.
            </p>
          </div>

          <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 class="text-lg font-black">2. Enter the overall envelope</h2>
            <p class="mt-1 text-sm leading-6 text-slate-600">
              Include controls, tables, arms, guards, conveyors, and anything else that sticks out.
            </p>

            <div class="mt-4 grid grid-cols-2 gap-3">
              <label class="block">
                <span class="text-sm font-bold">Width</span>
                <div class="mt-1 flex overflow-hidden rounded-xl border border-slate-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200">
                  <input
                    v-model="form.widthIn"
                    inputmode="decimal"
                    type="number"
                    min="1"
                    max="1000"
                    step="0.1"
                    class="min-w-0 flex-1 px-3 py-3 text-base outline-none"
                    @input="markStale"
                  />
                  <span class="flex items-center bg-slate-100 px-3 text-sm font-bold text-slate-500">in</span>
                </div>
              </label>

              <label class="block">
                <span class="text-sm font-bold">Depth</span>
                <div class="mt-1 flex overflow-hidden rounded-xl border border-slate-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200">
                  <input
                    v-model="form.depthIn"
                    inputmode="decimal"
                    type="number"
                    min="1"
                    max="1000"
                    step="0.1"
                    class="min-w-0 flex-1 px-3 py-3 text-base outline-none"
                    @input="markStale"
                  />
                  <span class="flex items-center bg-slate-100 px-3 text-sm font-bold text-slate-500">in</span>
                </div>
              </label>

              <label class="block">
                <span class="text-sm font-bold">Height</span>
                <div class="mt-1 flex overflow-hidden rounded-xl border border-slate-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200">
                  <input
                    v-model="form.heightIn"
                    inputmode="decimal"
                    type="number"
                    min="1"
                    max="1000"
                    step="0.1"
                    class="min-w-0 flex-1 px-3 py-3 text-base outline-none"
                    @input="markStale"
                  />
                  <span class="flex items-center bg-slate-100 px-3 text-sm font-bold text-slate-500">in</span>
                </div>
              </label>

              <label class="block">
                <span class="text-sm font-bold">Weight <span class="font-normal text-slate-500">optional</span></span>
                <div class="mt-1 flex overflow-hidden rounded-xl border border-slate-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200">
                  <input
                    v-model="form.weightLb"
                    inputmode="decimal"
                    type="number"
                    min="0"
                    max="1000000"
                    step="1"
                    class="min-w-0 flex-1 px-3 py-3 text-base outline-none"
                    @input="markStale"
                  />
                  <span class="flex items-center bg-slate-100 px-3 text-sm font-bold text-slate-500">lb</span>
                </div>
              </label>
            </div>

            <div v-if="validationErrors.length" class="mt-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
              <p v-for="error in validationErrors" :key="error">• {{ error }}</p>
            </div>

            <label class="mt-4 flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
              <input v-model="confirmed" type="checkbox" class="mt-1 h-5 w-5 rounded border-slate-300 text-blue-600" />
              <span class="text-sm leading-6 text-slate-700">
                I checked that these are the machine’s maximum overall dimensions—not only the base or work area.
              </span>
            </label>

            <button
              type="button"
              class="mt-4 w-full rounded-xl bg-blue-700 px-4 py-3 font-black text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-slate-300"
              :disabled="!canPrepare || preparing"
              @click="prepareRepresentation"
            >
              {{ preparing ? 'Preparing life-size model…' : 'Prepare Life-Size AR Model' }}
            </button>
          </div>

          <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <button type="button" class="flex w-full items-center justify-between text-left" @click="doorOpen = !doorOpen">
              <span>
                <strong class="block text-base">Optional doorway check</strong>
                <span class="text-xs text-slate-500">Fast upright envelope comparison</span>
              </span>
              <span class="text-xl">{{ doorOpen ? '−' : '+' }}</span>
            </button>

            <div v-if="doorOpen" class="mt-4">
              <div class="grid grid-cols-2 gap-3">
                <label>
                  <span class="text-sm font-bold">Door width</span>
                  <input
                    v-model="door.widthIn"
                    inputmode="decimal"
                    type="number"
                    min="1"
                    class="mt-1 w-full rounded-xl border border-slate-300 px-3 py-3 text-base outline-none"
                  />
                </label>
                <label>
                  <span class="text-sm font-bold">Door height</span>
                  <input
                    v-model="door.heightIn"
                    inputmode="decimal"
                    type="number"
                    min="1"
                    class="mt-1 w-full rounded-xl border border-slate-300 px-3 py-3 text-base outline-none"
                  />
                </label>
              </div>

              <div
                v-if="doorResult"
                class="mt-3 rounded-xl border p-3 text-sm leading-6"
                :class="doorResult.fits
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
                  : 'border-red-200 bg-red-50 text-red-900'"
              >
                <strong>{{ doorResult.fits ? 'Possible by upright envelope size' : 'Does not fit upright' }}</strong>
                <p>{{ doorResult.message }}</p>
                <p class="mt-1 text-xs">
                  This does not approve tipping, disassembly, rigging equipment, turning radius, or safe clearance.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section class="min-w-0">
          <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:sticky lg:top-5">
            <div class="flex items-start gap-3 border-b border-slate-200 p-4">
              <img
                v-if="selectedPhoto"
                :src="selectedPhoto"
                alt="Selected machine"
                class="h-20 w-24 rounded-lg border border-slate-200 bg-slate-100 object-contain"
              />
              <div class="min-w-0">
                <p class="text-xs font-black uppercase tracking-wider text-blue-700">{{ machineLabel }}</p>
                <h2 class="truncate text-xl font-black">{{ machineName }}</h2>
                <p class="mt-1 text-sm text-slate-600">{{ representationLabel }}</p>
              </div>
            </div>

            <div v-if="representation" class="relative bg-gradient-to-b from-slate-100 to-slate-200">
              <component
                :is="'model-viewer'"
                id="will-it-fit-viewer"
                class="will-it-fit-viewer"
                :src="representation.model_url"
                :ios-src="representation.ios_model_url || undefined"
                :poster="selectedPhoto || undefined"
                :alt="`${machineName} life-size AR representation`"
                ar
                ar-modes="webxr scene-viewer quick-look"
                ar-scale="fixed"
                ar-placement="floor"
                camera-controls
                touch-action="pan-y"
                shadow-intensity="1"
                shadow-softness="0.8"
                exposure="1"
                environment-image="neutral"
                interaction-prompt="auto"
                @ar-status="handleArStatus"
              >
                <button slot="ar-button" type="button" class="ar-slot-button">
                  View This Machine in Your Shop
                </button>
              </component>
            </div>

            <div v-else class="flex min-h-[420px] items-center justify-center bg-slate-100 p-6 text-center">
              <div>
                <div class="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-dashed border-slate-400 bg-slate-200 text-4xl">▣</div>
                <h3 class="mt-4 text-lg font-black">Enter and confirm the dimensions</h3>
                <p class="mt-2 max-w-md text-sm leading-6 text-slate-600">
                  Machinery Genius will create a correctly sized gray model. The exact machine shape is optional; the footprint and height are the important part.
                </p>
              </div>
            </div>

            <div class="p-4">
              <div class="grid grid-cols-2 gap-2 sm:grid-cols-4">
                <div class="rounded-xl bg-slate-100 p-3">
                  <span class="block text-xs font-bold uppercase text-slate-500">Width</span>
                  <strong>{{ display(form.widthIn) }}″</strong>
                </div>
                <div class="rounded-xl bg-slate-100 p-3">
                  <span class="block text-xs font-bold uppercase text-slate-500">Depth</span>
                  <strong>{{ display(form.depthIn) }}″</strong>
                </div>
                <div class="rounded-xl bg-slate-100 p-3">
                  <span class="block text-xs font-bold uppercase text-slate-500">Height</span>
                  <strong>{{ display(form.heightIn) }}″</strong>
                </div>
                <div class="rounded-xl bg-slate-100 p-3">
                  <span class="block text-xs font-bold uppercase text-slate-500">Weight</span>
                  <strong>{{ hasWeight ? `${display(form.weightLb)} lb` : 'Unknown' }}</strong>
                </div>
              </div>

              <button
                type="button"
                class="mt-4 w-full rounded-xl bg-yellow-400 px-4 py-4 text-lg font-black text-slate-950 shadow-sm transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
                :disabled="!representation || representationStale || launching"
                @click="launchAr"
              >
                {{ launching
                  ? 'Opening camera…'
                  : representationStale
                    ? 'Prepare the updated model first'
                    : 'View This Machine in Your Shop' }}
              </button>

              <p class="mt-2 text-center text-xs font-semibold text-slate-500">
                Android: current Chrome and Google Play Services for AR. iPhone: Safari Quick Look.
              </p>

              <div v-if="message" class="mt-3 rounded-xl border border-blue-200 bg-blue-50 p-3 text-sm leading-6 text-blue-900">
                {{ message }}
              </div>

              <div v-if="!secureContext" class="mt-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
                AR requires HTTPS. Use the Machinery Genius staging or live address—not a downloaded HTML file.
              </div>

              <div class="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-900">
                <strong>Planning aid only.</strong> Verify the actual machine, shipping dimensions, clearances, floor loading,
                access route, turning radius, lifting points, utilities, and rigging plan with qualified personnel before moving or installing equipment.
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import MachineService, { type Machine } from '@/services/MachineService'
import WillItFitService, { type WillItFitRepresentation } from '@/services/WillItFitService'

type InputValue = string | number | null

type ModelViewerElement = HTMLElement & {
  activateAR?: () => Promise<void>
}

const machines = ref<Machine[]>([])
const machinesLoading = ref(false)
const machinesError = ref(false)
const selectedMachineId = ref('custom')
const selectedMachine = ref<Machine | null>(null)
const confirmed = ref(false)
const preparing = ref(false)
const launching = ref(false)
const representation = ref<WillItFitRepresentation | null>(null)
const representationStale = ref(true)
const message = ref('')
const doorOpen = ref(false)

const form = reactive({
  widthIn: 96 as InputValue,
  depthIn: 55 as InputValue,
  heightIn: 48 as InputValue,
  weightLb: '' as InputValue,
})

const door = reactive({
  widthIn: '' as InputValue,
  heightIn: '' as InputValue,
})

const positiveNumber = (value: InputValue) => Number.isFinite(Number(value)) && Number(value) > 0
const hasWeight = computed(() => form.weightLb !== '' && form.weightLb !== null && Number.isFinite(Number(form.weightLb)))

const display = (value: InputValue) => {
  const number = Number(value)
  return Number.isFinite(number)
    ? new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }).format(number)
    : '—'
}

const validationErrors = computed(() => {
  const errors: string[] = []
  const dimensions = [
    ['Width', form.widthIn],
    ['Depth', form.depthIn],
    ['Height', form.heightIn],
  ] as const

  for (const [label, raw] of dimensions) {
    const value = Number(raw)
    if (!Number.isFinite(value) || value <= 0) errors.push(`${label} must be greater than zero.`)
    else if (value > 1000) errors.push(`${label} is over 1,000 inches. Recheck the units.`)
  }

  const weight = Number(form.weightLb)
  if (form.weightLb !== '' && form.weightLb !== null && (!Number.isFinite(weight) || weight < 0 || weight > 1000000)) {
    errors.push('Weight must be between 0 and 1,000,000 pounds.')
  }

  return errors
})

const secureContext = computed(() => typeof window === 'undefined' || window.isSecureContext)
const canPrepare = computed(() => validationErrors.value.length === 0 && confirmed.value && secureContext.value)

const machineName = computed(() => selectedMachine.value
  ? `${selectedMachine.value.brand} ${selectedMachine.value.model}`
  : 'Custom Machine Size')

const machineLabel = computed(() => selectedMachine.value?.nickname || 'User-supplied dimensions')

const selectedPhoto = computed(() => {
  const photos = selectedMachine.value?.photos || []
  return photos.find((photo) => photo.is_primary)?.url || photos[0]?.url || null
})

const representationLabel = computed(() => {
  if (!representation.value) return 'No AR representation prepared yet'
  return representation.value.representation_type === 'exact_model'
    ? 'Exact 3D model from Machinery Genius'
    : 'Gray size representation — not the exact machine shape'
})

const doorResult = computed(() => {
  if (!doorOpen.value || !positiveNumber(door.widthIn) || !positiveNumber(door.heightIn) || validationErrors.value.length) return null

  const machineWidth = Number(form.widthIn)
  const machineDepth = Number(form.depthIn)
  const machineHeight = Number(form.heightIn)
  const doorWidth = Number(door.widthIn)
  const doorHeight = Number(door.heightIn)
  const widthFirst = machineWidth <= doorWidth && machineHeight <= doorHeight
  const depthFirst = machineDepth <= doorWidth && machineHeight <= doorHeight
  const fits = widthFirst || depthFirst

  return {
    fits,
    message: fits
      ? `The upright envelope can face the opening with its ${widthFirst ? 'width' : 'depth'} through the doorway before adding clearance.`
      : `${display(machineWidth)}″ W × ${display(machineDepth)}″ D × ${display(machineHeight)}″ H exceeds the ${display(doorWidth)}″ W × ${display(doorHeight)}″ H opening while upright.`,
  }
})

const loadMachines = async () => {
  machinesLoading.value = true
  machinesError.value = false
  try {
    const response = await MachineService.list()
    machines.value = response.data.machines || []
  } catch (error) {
    console.error('Unable to load Machine Garage', error)
    machinesError.value = true
  } finally {
    machinesLoading.value = false
  }
}

const selectMachine = () => {
  representation.value = null
  representationStale.value = true
  message.value = ''
  confirmed.value = false

  if (selectedMachineId.value === 'custom') {
    selectedMachine.value = null
    return
  }

  const machine = machines.value.find((item) => String(item.id) === selectedMachineId.value) || null
  selectedMachine.value = machine
  if (!machine) return

  form.widthIn = machine.overall_width_in ?? ''
  form.depthIn = machine.overall_depth_in ?? ''
  form.heightIn = machine.overall_height_in ?? ''
  form.weightLb = machine.weight_lb ?? ''

  if (!positiveNumber(form.widthIn) || !positiveNumber(form.depthIn) || !positiveNumber(form.heightIn)) {
    message.value = 'Machinery Genius does not yet have all three overall dimensions for this machine. Enter and confirm them to continue.'
  }
}

const markStale = () => {
  representationStale.value = true
  confirmed.value = false
  message.value = ''
}

const prepareRepresentation = async () => {
  if (!canPrepare.value) return

  preparing.value = true
  message.value = ''
  try {
    const response = await WillItFitService.create({
      machine_id: selectedMachine.value?.id ?? null,
      width_in: Number(form.widthIn),
      depth_in: Number(form.depthIn),
      height_in: Number(form.heightIn),
      weight_lb: form.weightLb === '' || form.weightLb === null ? null : Number(form.weightLb),
    })
    representation.value = response.data
    representationStale.value = false
    message.value = representation.value.representation_type === 'exact_model'
      ? 'Exact model ready. Tap the yellow button to place it in your facility.'
      : 'Life-size gray envelope ready. Tap the yellow button, scan the floor slowly, and place it.'
  } catch (error: any) {
    console.error('Unable to prepare AR model', error)
    message.value = error?.response?.data?.message || 'The AR model could not be prepared. Recheck the dimensions and try again.'
  } finally {
    preparing.value = false
  }
}

const launchAr = async () => {
  const viewer = document.getElementById('will-it-fit-viewer') as ModelViewerElement | null
  if (!viewer?.activateAR) {
    message.value = 'The AR viewer is still loading. Wait a moment and try again.'
    return
  }

  launching.value = true
  message.value = ''
  try {
    await viewer.activateAR()
  } catch (error) {
    console.error('AR launch failed', error)
    message.value = 'AR could not start. On Android, use current Chrome, allow the camera, and update Google Play Services for AR.'
  } finally {
    launching.value = false
  }
}

const handleArStatus = (event: Event) => {
  const status = (event as CustomEvent<{ status?: string }>).detail?.status
  if (status === 'session-started') {
    message.value = 'Move the phone slowly across the floor, then position the machine where you want it.'
  } else if (status === 'failed') {
    message.value = 'AR failed to start. Confirm camera permission and Google Play Services for AR.'
  }
}

onMounted(loadMachines)
</script>

<style scoped>
.will-it-fit-viewer {
  display: block;
  width: 100%;
  height: min(62vh, 650px);
  min-height: 420px;
  --poster-color: transparent;
  --progress-bar-color: #2563eb;
}

.ar-slot-button {
  position: absolute;
  right: 16px;
  bottom: 16px;
  left: 16px;
  border: 0;
  border-radius: 14px;
  background: #facc15;
  padding: 14px 16px;
  color: #0f172a;
  font-size: 16px;
  font-weight: 900;
  box-shadow: 0 8px 24px rgb(15 23 42 / 25%);
}

@media (max-width: 640px) {
  .will-it-fit-viewer {
    height: 52vh;
    min-height: 360px;
  }
}
</style>
