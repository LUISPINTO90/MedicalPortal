<template>
  <Sidebar>
    <div class="max-w-4xl mx-auto space-y-8">
      <!-- Breadcrumb -->
      <div class="flex items-center justify-between">
        <nav class="flex" aria-label="Breadcrumb">
          <ol class="inline-flex items-center space-x-2">
            <li class="inline-flex items-center">
              <router-link
                to="/appointments"
                class="text-gray-500 hover:text-green-600 inline-flex items-center gap-2 transition-colors duration-200 font-medium"
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
                Citas
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
                  isEditing ? "Editar" : "Nueva"
                }}</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <!-- Header Card -->
      <div
        class="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl shadow-xl overflow-hidden"
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
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
            </div>
            <div>
              <h1 class="text-2xl font-bold">
                {{ isEditing ? "Editar Cita" : "Nueva Cita" }}
              </h1>
              <p class="text-green-100 mt-1">
                {{
                  isEditing
                    ? "Actualiza la información de la cita seleccionada"
                    : "Programa una nueva cita médica para un paciente"
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
        <!-- Información de la Cita -->
        <div class="bg-white rounded-2xl shadow-lg border-0 overflow-hidden">
          <div
            class="bg-gradient-to-r from-green-50 to-green-100 px-6 py-4 border-b border-gray-200"
          >
            <div class="flex items-center gap-3">
              <div class="rounded-lg bg-green-100 p-2">
                <svg
                  class="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900">
                  Información de la Cita
                </h3>
                <p class="text-sm text-gray-600">
                  Datos básicos de la cita médica
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
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-gray-50 focus:bg-white"
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
                  for="estatus"
                  class="block text-sm font-medium text-gray-700"
                >
                  Estado <span class="text-red-500">*</span>
                </label>
                <select
                  id="estatus"
                  v-model="form.estatus"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                >
                  <option value="PENDIENTE">🟡 Pendiente</option>
                  <option value="REALIZADA">🟢 Realizada</option>
                  <option value="CANCELADA">🔴 Cancelada</option>
                </select>
              </div>
              <div class="space-y-2">
                <label
                  for="fecha"
                  class="block text-sm font-medium text-gray-700"
                >
                  Fecha <span class="text-red-500">*</span>
                </label>
                <input
                  id="fecha"
                  v-model="form.fecha"
                  type="date"
                  required
                  :min="minDate"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                />
              </div>
              <div class="space-y-2">
                <label
                  for="hora"
                  class="block text-sm font-medium text-gray-700"
                >
                  Hora <span class="text-red-500">*</span>
                </label>
                <input
                  id="hora"
                  v-model="form.hora"
                  type="time"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                />
              </div>
              <div class="md:col-span-2 space-y-2">
                <label
                  for="motivo"
                  class="block text-sm font-medium text-gray-700"
                >
                  Motivo de la consulta <span class="text-red-500">*</span>
                </label>
                <input
                  id="motivo"
                  v-model="form.motivo"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Ej: Consulta general, dolor de cabeza, revisión..."
                />
              </div>
              <div class="md:col-span-2 space-y-2">
                <label
                  for="notas"
                  class="block text-sm font-medium text-gray-700"
                >
                  Notas adicionales
                  <span class="text-gray-400 text-xs">(opcional)</span>
                </label>
                <textarea
                  id="notas"
                  v-model="form.notas"
                  rows="4"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                  placeholder="Síntomas específicos, observaciones, instrucciones especiales..."
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
                to="/appointments"
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
                class="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
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
                    ? "Actualizar Cita"
                    : "Programar Cita"
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
import { AppointmentForm, Patient } from "@/types";
import apiService from "@/services/api";

@Component({
  components: {
    Sidebar,
  },
})
export default class AppointmentFormView extends Vue {
  @Prop({ default: null }) id!: string | null;

  form: AppointmentForm = {
    fecha: "",
    hora: "",
    motivo: "",
    notas: "",
    estatus: "PENDIENTE",
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

  get minDate(): string {
    return new Date().toISOString().split("T")[0];
  }

  async mounted(): Promise<void> {
    // Cargar pacientes si no están cargados
    if (this.patients.length === 0) {
      await this.$store.dispatch("fetchPatients");
    }

    if (this.isEditing) {
      await this.loadAppointment();
    } else {
      // Configurar fecha por defecto a hoy
      this.form.fecha = this.minDate;
    }
  }

  async loadAppointment(): Promise<void> {
    try {
      const appointment = await apiService.getAppointment(parseInt(this.id!));
      this.form = {
        fecha: appointment.fecha.split("T")[0], // Extraer solo la fecha
        hora: appointment.hora,
        motivo: appointment.motivo,
        notas: appointment.notas || "",
        estatus: appointment.estatus,
        patientId: appointment.patientId,
      };
    } catch (error) {
      console.error("Error loading appointment:", error);
      this.$router.push("/appointments");
    }
  }

  async handleSubmit(): Promise<void> {
    try {
      if (this.isEditing) {
        await this.$store.dispatch("updateAppointment", {
          id: parseInt(this.id!),
          appointmentData: this.form,
        });
      } else {
        await this.$store.dispatch("createAppointment", this.form);
      }

      this.$router.push("/appointments");
    } catch (error) {
      console.error("Error saving appointment:", error);
    }
  }
}
</script>
