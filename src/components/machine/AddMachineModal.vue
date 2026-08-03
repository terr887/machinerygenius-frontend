<template>
  <transition name="fade">
    <div v-if="open" class="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-slate-950/65 backdrop-blur-sm" @click="handleClose"></div>

      <div
        class="relative z-[121] w-full max-w-lg overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label="Add a machine"
      >
        <div class="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
              My Machine Garage™
            </p>
            <h3 class="mt-2 text-xl font-semibold text-slate-950">Add a machine</h3>
            <p class="mt-1 text-sm leading-6 text-slate-600">
              Required fields are brand and model. Serial and year can be added when available.
            </p>
          </div>
          <button
            type="button"
            class="inline-flex h-9 w-9 flex-none items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
            aria-label="Close"
            @click="handleClose"
          >
            X
          </button>
        </div>

        <form class="grid gap-3 px-6 py-5 sm:grid-cols-2" @submit.prevent="handleSubmit">
          <div>
            <label class="mb-1.5 block text-xs font-bold text-slate-900">Brand *</label>
            <input
              v-model.trim="form.brand"
              type="text"
              placeholder="Haas"
              class="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="mb-1.5 block text-xs font-bold text-slate-900">Model *</label>
            <input
              v-model.trim="form.model"
              type="text"
              placeholder="VF-2"
              class="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="mb-1.5 block text-xs font-bold text-slate-900">Serial</label>
            <input
              v-model.trim="form.serial"
              type="text"
              placeholder="Serial number"
              class="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="mb-1.5 block text-xs font-bold text-slate-900">Year</label>
            <input
              v-model.trim="form.year"
              type="number"
              min="1900"
              max="2100"
              placeholder="2024"
              class="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <p v-if="errorMessage" class="sm:col-span-2 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-600">
            {{ errorMessage }}
          </p>

          <div class="sm:col-span-2 mt-1 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              :disabled="submitting"
              class="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
              @click="handleClose"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="submitting"
              class="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {{ submitting ? "Adding machine..." : "Save Machine" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive, ref, watch } from "vue";
import { useServices } from "@/services/container";
import type { Machine } from "@/services/MachineService";
import { useToastStore } from "@/stores/toast";

const props = defineProps<{ open: boolean }>();
const emit = defineEmits<{
  close: [];
  created: [machine: Machine];
}>();

const { machine } = useServices();
const toastStore = useToastStore();

const form = reactive({
  brand: "",
  model: "",
  serial: "",
  year: "",
});

const submitting = ref(false);
const errorMessage = ref("");

const resetForm = () => {
  form.brand = "";
  form.model = "";
  form.serial = "";
  form.year = "";
  errorMessage.value = "";
};

const resolveErrorMessage = (error: any, fallback: string): string => {
  const validationErrors = error?.response?.data?.errors;
  if (validationErrors && typeof validationErrors === "object") {
    const firstKey = Object.keys(validationErrors)[0];
    if (firstKey) {
      const value = validationErrors[firstKey];
      if (Array.isArray(value) && value.length) return value[0];
      if (typeof value === "string") return value;
    }
  }

  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    fallback
  );
};

const handleClose = () => {
  if (submitting.value) return;
  emit("close");
};

const handleSubmit = async () => {
  errorMessage.value = "";

  if (!form.brand || !form.model) {
    errorMessage.value = "Brand and model are required.";
    return;
  }

  const normalizedYear = form.year ? Number(form.year) : undefined;
  if (form.year && Number.isNaN(normalizedYear)) {
    errorMessage.value = "Year must be a valid number.";
    return;
  }

  submitting.value = true;
  try {
    const { data } = await machine.create({
      brand: form.brand,
      model: form.model,
      serial: form.serial || undefined,
      year: normalizedYear,
    });

    toastStore.success(data?.message || "Machine added successfully.");
    if (data?.machine) {
      emit("created", data.machine);
    }
    resetForm();
    emit("close");
  } catch (error) {
    errorMessage.value = resolveErrorMessage(error, "Unable to add machine.");
  } finally {
    submitting.value = false;
  }
};

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === "Escape" && props.open) {
    handleClose();
  }
};

watch(
  () => props.open,
  (isOpen) => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    if (isOpen) {
      resetForm();
    }
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
