<template>
  <Sidebar>
    <div class="max-w-4xl mx-auto space-y-8">
      <!-- Breadcrumb -->
      <div class="flex items-center justify-between">
        <nav class="flex" aria-label="Breadcrumb">
          <ol class="inline-flex items-center space-x-2">
            <li class="inline-flex items-center">
              <router-link
                to="/treatments"
                class="text-gray-500 hover:text-purple-600 inline-flex items-center gap-2 transition-colors duration-200 font-medium"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
                Tratamientos
              </router-link>
            </li>
            <li>
              <div class="flex items-center">
                <svg
                  class="w-5 h-5 text-gray-400 mx-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class="text-gray-700 font-medium">{{
                  isEditing ? "Editar" : "Nuevo"
                }}</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <!-- Header Card -->
      <div
        class="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl shadow-xl overflow-hidden"
      >
        <div class="px-8 py-6 text-white">
          <div class="flex items-center gap-4">
            <div class="rounded-full bg-white/20 p-3">
              <svg
                class="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                ></path>
              </svg>
            </div>
            <div>
              <h1 class="text-2xl font-bold">
                {{ isEditing ? "Editar Tratamiento" : "Nuevo Tratamiento" }}
              </h1>
              <p class="text-purple-100 mt-1">
                {{
                  isEditing
                    ? "Actualiza la información del tratamiento seleccionado"
                    : "Crea un nuevo plan de tratamiento para un paciente"
                }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Error Display -->
      <div v-if="error" class="rounded-lg border border-red-300 bg-red-50 p-4">
        <div class="flex items-center gap-3">
          <svg
            class="h-5 w-5 text-red-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd"
            />
          </svg>
          <p class="text-sm text-red-700 font-medium">{{ error }}</p>
        </div>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="space-y-8">
        <!-- Información del Tratamiento -->
        <div class="bg-white rounded-2xl shadow-lg border-0 overflow-hidden">
          <div
            class="bg-gradient-to-r from-purple-50 to-purple-100 px-6 py-4 border-b border-gray-200"
          >
            <div class="flex items-center gap-3">
              <div class="rounded-lg bg-purple-100 p-2">
                <svg
                  class="w-5 h-5 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900">
                  Información del Tratamiento
                </h3>
                <p class="text-sm text-gray-600">
                  Datos básicos del plan de tratamiento
                </p>
              </div>
            </div>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label
                  for="patientId"
                  class="block text-sm font-medium text-gray-700"
                >
                  Paciente <span class="text-red-500">*</span>
                </label>
                <select
                  id="patientId"
                  v-model="form.patientId"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                >
                  <option value="">Seleccionar paciente</option>
                  <option
                    v-for="patient in patients"
                    :key="patient.id"
                    :value="patient.id"
                  >
                    {{ patient.nombre }} {{ patient.apellidos }} -
                    {{ patient.curp }}
                  </option>
                </select>
              </div>
              <div class="space-y-2">
                <label
                  for="activo"
                  class="block text-sm font-medium text-gray-700"
                >
                  Estado <span class="text-red-500">*</span>
                </label>
                <select
                  id="activo"
                  v-model="form.activo"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                >
                  <option :value="true">🟢 Activo</option>
                  <option :value="false">⚪ Inactivo</option>
                </select>
              </div>
              <div class="space-y-2">
                <label
                  for="nombre"
                  class="block text-sm font-medium text-gray-700"
                >
                  Nombre del tratamiento <span class="text-red-500">*</span>
                </label>
                <input
                  id="nombre"
                  v-model="form.nombre"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Ej: Fisioterapia para lumbalgia"
                />
              </div>
              <div class="space-y-2">
                <label
                  for="duracion"
                  class="block text-sm font-medium text-gray-700"
                >
                  Duración <span class="text-red-500">*</span>
                </label>
                <input
                  id="duracion"
                  v-model="form.duracion"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Ej: 4 semanas, 2 meses, 30 días"
                />
              </div>
              <div class="space-y-2">
                <label
                  for="fechaInicio"
                  class="block text-sm font-medium text-gray-700"
                >
                  Fecha de inicio <span class="text-red-500">*</span>
                </label>
                <input
                  id="fechaInicio"
                  v-model="form.fechaInicio"
                  type="date"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                />
              </div>
              <div class="md:col-span-2 space-y-2">
                <label
                  for="descripcion"
                  class="block text-sm font-medium text-gray-700"
                >
                  Descripción del tratamiento
                  <span class="text-red-500">*</span>
                </label>
                <textarea
                  id="descripcion"
                  v-model="form.descripcion"
                  required
                  rows="4"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                  placeholder="Describe el tratamiento, procedimientos, medicamentos, terapias, etc."
                ></textarea>
              </div>
              <div class="md:col-span-2 space-y-2">
                <label
                  for="observaciones"
                  class="block text-sm font-medium text-gray-700"
                >
                  Observaciones adicionales
                  <span class="text-gray-400 text-xs">(opcional)</span>
                </label>
                <textarea
                  id="observaciones"
                  v-model="form.observaciones"
                  rows="3"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                  placeholder="Notas especiales, seguimiento, recomendaciones..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="bg-white rounded-2xl shadow-lg border-0 overflow-hidden">
          <div class="p-6">
            <div
              class="flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <router-link
                to="/treatments"
                class="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 font-medium"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  ></path>
                </svg>
                Cancelar
              </router-link>

              <button
                type="submit"
                :disabled="loading"
                class="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg
                  v-if="loading"
                  class="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <svg
                  v-else
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                {{
                  loading
                    ? isEditing
                      ? "Actualizando..."
                      : "Guardando..."
                    : isEditing
                    ? "Actualizar Tratamiento"
                    : "Crear Tratamiento"
                }}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </Sidebar>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Sidebar from "@/components/ui/Sidebar.vue";
import { TreatmentForm, Patient } from "@/types";
import apiService from "@/services/api";

@Component({
  components: {
    Sidebar,
  },
})
export default class TreatmentFormView extends Vue {
  @Prop({ default: null }) id!: string | null;

  form: TreatmentForm = {
    nombre: "",
    descripcion: "",
    fechaInicio: "",
    duracion: "",
    observaciones: "",
    activo: true,
    patientId: 0,
  };

  get isEditing(): boolean {
    return !!this.id;
  }

  get loading(): boolean {
    return this.$store.getters.isLoading;
  }

  get error(): string | null {
    return this.$store.getters.error;
  }

  get patients(): Patient[] {
    return this.$store.getters.allPatients;
  }

  async mounted(): Promise<void> {
    console.log("🔄 TreatmentForm mounted");

    // Cargar pacientes si no están cargados
    if (this.patients.length === 0) {
      console.log("📡 Loading patients...");
      await this.$store.dispatch("fetchPatients");
    }

    if (this.isEditing) {
      console.log("✏️ Loading treatment for edit:", this.id);
      await this.loadTreatment();
    } else {
      // Configurar fecha por defecto a hoy
      this.form.fechaInicio = new Date().toISOString().split("T")[0];
      console.log("🆕 New treatment form initialized");
    }
  }

  async loadTreatment(): Promise<void> {
    try {
      console.log("📡 Loading treatment:", this.id);
      const treatment = await apiService.getTreatment(parseInt(this.id!));
      console.log("✅ Treatment loaded:", treatment);

      this.form = {
        nombre: treatment.nombre,
        descripcion: treatment.descripcion,
        fechaInicio: treatment.fechaInicio.split("T")[0], // Extraer solo la fecha
        duracion: treatment.duracion,
        observaciones: treatment.observaciones || "",
        activo: treatment.activo,
        patientId: treatment.patientId,
      };
    } catch (error) {
      console.error("❌ Error loading treatment:", error);
      this.$router.push("/treatments");
    }
  }

  async handleSubmit(): Promise<void> {
    try {
      console.log("💾 Submitting treatment form:", this.form);

      // Limpiar errores previos
      this.$store.commit("SET_ERROR", null);

      if (this.isEditing) {
        console.log("✏️ Updating treatment:", this.id);
        await this.$store.dispatch("updateTreatment", {
          id: parseInt(this.id!),
          treatmentData: this.form,
        });
        console.log("✅ Treatment updated successfully");
      } else {
        console.log("🆕 Creating new treatment");
        const response = await this.$store.dispatch(
          "createTreatment",
          this.form
        );
        console.log("✅ Treatment created successfully:", response);
      }

      // Redirigir a la lista de tratamientos
      console.log("🔄 Redirecting to treatments list...");
      this.$router.push("/treatments");
    } catch (error) {
      console.error("❌ Error saving treatment:", error);
      // El error ya se maneja en el store, simplemente lo logueamos aquí
    }
  }
}
</script>
