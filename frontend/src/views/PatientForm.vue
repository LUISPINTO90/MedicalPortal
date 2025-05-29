<template>
  <Sidebar>
    <div class="max-w-4xl mx-auto">
      <div class="mb-6">
        <nav class="flex" aria-label="Breadcrumb">
          <ol class="inline-flex items-center space-x-1 md:space-x-3">
            <li class="inline-flex items-center">
              <router-link
                to="/patients"
                class="text-gray-700 hover:text-gray-900 inline-flex items-center"
              >
                <svg
                  class="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
                  ></path>
                </svg>
                Pacientes
              </router-link>
            </li>
            <li>
              <div class="flex items-center">
                <svg
                  class="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class="ml-1 text-gray-500 md:ml-2">{{
                  isEditing ? "Editar" : "Nuevo"
                }}</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <div class="card">
        <div class="card-header">
          <h2 class="text-xl font-semibold text-gray-900">
            {{ isEditing ? "Editar Paciente" : "Nuevo Paciente" }}
          </h2>
          <p class="text-gray-600 mt-1">
            {{
              isEditing
                ? "Actualiza la información del paciente"
                : "Completa todos los campos requeridos"
            }}
          </p>
        </div>

        <div class="card-body">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Error Display -->
            <div
              v-if="error"
              class="bg-red-50 border border-red-200 rounded-lg p-4"
            >
              <div class="flex">
                <svg
                  class="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clip-rule="evenodd"
                  />
                </svg>
                <div class="ml-3">
                  <p class="text-sm text-red-800">{{ error }}</p>
                </div>
              </div>
            </div>

            <!-- Información Personal -->
            <div class="bg-gray-50 rounded-lg p-6">
              <h3 class="text-lg font-medium text-gray-900 mb-4">
                Información Personal
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="nombre" class="form-label required"
                    >Nombre(s)</label
                  >
                  <input
                    id="nombre"
                    v-model="form.nombre"
                    type="text"
                    required
                    class="form-input"
                    placeholder="Juan Carlos"
                  />
                </div>
                <div>
                  <label for="apellidos" class="form-label required"
                    >Apellidos</label
                  >
                  <input
                    id="apellidos"
                    v-model="form.apellidos"
                    type="text"
                    required
                    class="form-input"
                    placeholder="Pérez García"
                  />
                </div>
                <div>
                  <label for="edad" class="form-label required">Edad</label>
                  <input
                    id="edad"
                    v-model.number="form.edad"
                    type="number"
                    required
                    min="0"
                    max="120"
                    class="form-input"
                    placeholder="25"
                  />
                </div>
                <div>
                  <label for="sexo" class="form-label required">Sexo</label>
                  <select
                    id="sexo"
                    v-model="form.sexo"
                    required
                    class="form-input"
                  >
                    <option value="">Seleccionar</option>
                    <option value="M">Masculino</option>
                    <option value="F">Femenino</option>
                  </select>
                </div>
                <div class="md:col-span-2">
                  <label for="curp" class="form-label required">CURP</label>
                  <input
                    id="curp"
                    v-model="form.curp"
                    type="text"
                    required
                    maxlength="18"
                    class="form-input uppercase"
                    placeholder="ABCD123456HDFRRL09"
                    @input="form.curp = form.curp.toUpperCase()"
                  />
                  <p class="text-xs text-gray-500 mt-1">
                    Clave Única de Registro de Población (18 caracteres)
                  </p>
                </div>
              </div>
            </div>

            <!-- Información de Contacto -->
            <div class="bg-gray-50 rounded-lg p-6">
              <h3 class="text-lg font-medium text-gray-900 mb-4">
                Información de Contacto
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="telefono" class="form-label required"
                    >Teléfono</label
                  >
                  <input
                    id="telefono"
                    v-model="form.telefono"
                    type="tel"
                    required
                    class="form-input"
                    placeholder="5551234567"
                  />
                </div>
                <div>
                  <label for="email" class="form-label">Email (opcional)</label>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    class="form-input"
                    placeholder="juan@example.com"
                  />
                </div>
                <div class="md:col-span-2">
                  <label for="direccion" class="form-label required"
                    >Dirección</label
                  >
                  <textarea
                    id="direccion"
                    v-model="form.direccion"
                    required
                    rows="3"
                    class="form-input"
                    placeholder="Calle, número, colonia, ciudad, estado"
                  ></textarea>
                </div>
              </div>
            </div>

            <!-- Información Médica -->
            <div class="bg-gray-50 rounded-lg p-6">
              <h3 class="text-lg font-medium text-gray-900 mb-4">
                Información Médica
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="tipoSangre" class="form-label required"
                    >Tipo de Sangre</label
                  >
                  <select
                    id="tipoSangre"
                    v-model="form.tipoSangre"
                    required
                    class="form-input"
                  >
                    <option value="">Seleccionar</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
                <div>
                  <label for="pdf" class="form-label"
                    >Documento PDF (opcional)</label
                  >
                  <input
                    id="pdf"
                    ref="pdfInput"
                    type="file"
                    accept=".pdf"
                    @change="handleFileChange"
                    class="form-input"
                  />
                  <p class="text-xs text-gray-500 mt-1">
                    Máximo 5MB - Solo archivos PDF
                  </p>
                </div>
                <div class="md:col-span-2">
                  <label for="observaciones" class="form-label"
                    >Observaciones</label
                  >
                  <textarea
                    id="observaciones"
                    v-model="form.observaciones"
                    rows="4"
                    class="form-input"
                    placeholder="Notas adicionales, alergias, enfermedades previas, etc."
                  ></textarea>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div
              class="flex items-center justify-between pt-6 border-t border-gray-200"
            >
              <router-link to="/patients" class="btn btn-secondary">
                <svg
                  class="w-4 h-4 mr-2"
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
                class="btn btn-primary btn-lg"
              >
                <svg
                  v-if="loading"
                  class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                {{
                  loading
                    ? isEditing
                      ? "Actualizando..."
                      : "Guardando..."
                    : isEditing
                    ? "Actualizar Paciente"
                    : "Guardar Paciente"
                }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </Sidebar>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Sidebar from "@/components/ui/Sidebar.vue";
import { PatientForm } from "@/types";
import apiService from "@/services/api";

@Component({
  components: {
    Sidebar,
  },
})
export default class Patient extends Vue {
  @Prop({ default: null }) id!: string | null;

  form: PatientForm = {
    nombre: "",
    apellidos: "",
    edad: 0,
    curp: "",
    telefono: "",
    direccion: "",
    email: "",
    tipoSangre: "O+",
    sexo: "M",
    observaciones: "",
  };

  selectedFile: File | null = null;

  get isEditing(): boolean {
    return !!this.id;
  }

  get loading(): boolean {
    return this.$store.getters.isLoading;
  }

  get error(): string | null {
    return this.$store.getters.error;
  }

  async mounted(): Promise<void> {
    if (this.isEditing) {
      await this.loadPatient();
    }
  }

  async loadPatient(): Promise<void> {
    try {
      const patient = await apiService.getPatient(parseInt(this.id!));
      this.form = {
        nombre: patient.nombre,
        apellidos: patient.apellidos,
        edad: patient.edad,
        curp: patient.curp,
        telefono: patient.telefono,
        direccion: patient.direccion,
        email: patient.email || "",
        tipoSangre: patient.tipoSangre as any,
        sexo: patient.sexo as any,
        observaciones: patient.observaciones || "",
      };
    } catch (error) {
      console.error("Error loading patient:", error);
      this.$router.push("/patients");
    }
  }

  handleFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
      if (file.type !== "application/pdf") {
        alert("Solo se permiten archivos PDF");
        target.value = "";
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        // 5MB
        alert("El archivo no puede ser mayor a 5MB");
        target.value = "";
        return;
      }

      this.selectedFile = file;
    }
  }

  async handleSubmit(): Promise<void> {
    try {
      // Crear FormData para enviar archivo junto con datos
      const formData = new FormData();

      // Agregar todos los campos del formulario
      Object.keys(this.form).forEach((key) => {
        const value = (this.form as any)[key];
        if (value !== undefined && value !== null && value !== "") {
          formData.append(key, value.toString());
        }
      });

      // Agregar archivo PDF si existe
      if (this.selectedFile) {
        formData.append("pdf", this.selectedFile);
      }

      if (this.isEditing) {
        await this.$store.dispatch("updatePatient", {
          id: parseInt(this.id!),
          patientData: formData,
        });
      } else {
        await this.$store.dispatch("createPatient", formData);
      }

      // Redirigir a la lista de pacientes
      this.$router.push("/patients");
    } catch (error) {
      console.error("Error saving patient:", error);
    }
  }
}
</script>

<style scoped>
.form-label.required::after {
  content: " *";
  color: #ef4444;
}
</style>
