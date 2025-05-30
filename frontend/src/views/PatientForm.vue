<template>
  <Sidebar>
    <div class="max-w-5xl mx-auto space-y-8">
      <!-- Breadcrumb Mejorado -->
      <div class="flex items-center justify-between">
        <nav class="flex" aria-label="Breadcrumb">
          <ol class="inline-flex items-center space-x-2">
            <li class="inline-flex items-center">
              <router-link
                to="/patients"
                class="text-gray-500 hover:text-blue-600 inline-flex items-center gap-2 transition-colors duration-200 font-medium"
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
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  ></path>
                </svg>
                Pacientes
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

        <!-- Progress Indicator -->
        <div class="hidden md:flex items-center gap-2 text-sm text-gray-500">
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
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          Formulario {{ isEditing ? "de edición" : "de registro" }}
        </div>
      </div>

      <!-- Header Card -->
      <div
        class="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-xl overflow-hidden"
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                ></path>
              </svg>
            </div>
            <div>
              <h1 class="text-2xl font-bold">
                {{ isEditing ? "Editar Paciente" : "Nuevo Paciente" }}
              </h1>
              <p class="text-blue-100 mt-1">
                {{
                  isEditing
                    ? "Actualiza la información del paciente seleccionado"
                    : "Completa todos los campos requeridos para registrar un nuevo paciente"
                }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Error Dialog -->
      <Dialog :open="showErrorDialog" @update:open="showErrorDialog = $event">
        <DialogHeader>
          <div class="flex items-center gap-3 mb-4">
            <div class="rounded-full bg-red-100 p-3">
              <svg
                class="h-6 w-6 text-red-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <DialogTitle>Error en el formulario</DialogTitle>
          </div>
          <DialogDescription>
            {{ currentError }}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            @click="showErrorDialog = false"
            class="bg-red-600 hover:bg-red-700 text-white"
          >
            Entendido
          </Button>
        </DialogFooter>
      </Dialog>

      <!-- File Error Dialog -->
      <Dialog
        :open="showFileErrorDialog"
        @update:open="showFileErrorDialog = $event"
      >
        <DialogHeader>
          <div class="flex items-center gap-3 mb-4">
            <div class="rounded-full bg-amber-100 p-3">
              <svg
                class="h-6 w-6 text-amber-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                ></path>
              </svg>
            </div>
            <DialogTitle>Error con el archivo</DialogTitle>
          </div>
          <DialogDescription>
            {{ fileErrorMessage }}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            @click="showFileErrorDialog = false"
            class="bg-amber-600 hover:bg-amber-700 text-white"
          >
            Entendido
          </Button>
        </DialogFooter>
      </Dialog>

      <!-- Formulario -->
      <form @submit.prevent="handleSubmit" class="space-y-8">
        <!-- Información Personal -->
        <div class="bg-white rounded-2xl shadow-lg border-0 overflow-hidden">
          <div
            class="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200"
          >
            <div class="flex items-center gap-3">
              <div class="rounded-lg bg-blue-100 p-2">
                <svg
                  class="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  ></path>
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900">
                  Información Personal
                </h3>
                <p class="text-sm text-gray-600">Datos básicos del paciente</p>
              </div>
            </div>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label
                  for="nombre"
                  class="block text-sm font-medium text-gray-700"
                >
                  Nombre(s) <span class="text-red-500">*</span>
                </label>
                <input
                  id="nombre"
                  v-model="form.nombre"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Ej: Juan Carlos"
                />
              </div>
              <div class="space-y-2">
                <label
                  for="apellidos"
                  class="block text-sm font-medium text-gray-700"
                >
                  Apellidos <span class="text-red-500">*</span>
                </label>
                <input
                  id="apellidos"
                  v-model="form.apellidos"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Ej: Pérez García"
                />
              </div>
              <div class="space-y-2">
                <label
                  for="edad"
                  class="block text-sm font-medium text-gray-700"
                >
                  Edad <span class="text-red-500">*</span>
                </label>
                <input
                  id="edad"
                  v-model.number="form.edad"
                  type="number"
                  required
                  min="0"
                  max="120"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="25"
                />
              </div>
              <div class="space-y-2">
                <label
                  for="sexo"
                  class="block text-sm font-medium text-gray-700"
                >
                  Sexo <span class="text-red-500">*</span>
                </label>
                <select
                  id="sexo"
                  v-model="form.sexo"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                >
                  <option value="">Seleccionar sexo</option>
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
                </select>
              </div>
              <div class="md:col-span-2 space-y-2">
                <label
                  for="curp"
                  class="block text-sm font-medium text-gray-700"
                >
                  CURP <span class="text-red-500">*</span>
                </label>
                <input
                  id="curp"
                  v-model="form.curp"
                  type="text"
                  required
                  maxlength="18"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white uppercase font-mono"
                  placeholder="ABCD123456HDFRRL09"
                  @input="form.curp = form.curp.toUpperCase()"
                />
                <p class="text-xs text-gray-500 flex items-center gap-1">
                  <svg
                    class="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  Clave Única de Registro de Población (18 caracteres)
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Información de Contacto -->
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
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900">
                  Información de Contacto
                </h3>
                <p class="text-sm text-gray-600">
                  Datos para comunicarse con el paciente
                </p>
              </div>
            </div>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label
                  for="telefono"
                  class="block text-sm font-medium text-gray-700"
                >
                  Teléfono <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <div
                    class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  >
                    <svg
                      class="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      ></path>
                    </svg>
                  </div>
                  <input
                    id="telefono"
                    v-model="form.telefono"
                    type="tel"
                    required
                    class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                    placeholder="5551234567"
                  />
                </div>
              </div>
              <div class="space-y-2">
                <label
                  for="email"
                  class="block text-sm font-medium text-gray-700"
                >
                  Email <span class="text-gray-400 text-xs">(opcional)</span>
                </label>
                <div class="relative">
                  <div
                    class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  >
                    <svg
                      class="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      ></path>
                    </svg>
                  </div>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                    placeholder="juan@ejemplo.com"
                  />
                </div>
              </div>
              <div class="md:col-span-2 space-y-2">
                <label
                  for="direccion"
                  class="block text-sm font-medium text-gray-700"
                >
                  Dirección <span class="text-red-500">*</span>
                </label>
                <textarea
                  id="direccion"
                  v-model="form.direccion"
                  required
                  rows="3"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                  placeholder="Calle, número, colonia, ciudad, estado..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <!-- Información Médica -->
        <div class="bg-white rounded-2xl shadow-lg border-0 overflow-hidden">
          <div
            class="bg-gradient-to-r from-red-50 to-red-100 px-6 py-4 border-b border-gray-200"
          >
            <div class="flex items-center gap-3">
              <div class="rounded-lg bg-red-100 p-2">
                <svg
                  class="w-5 h-5 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900">
                  Información Médica
                </h3>
                <p class="text-sm text-gray-600">
                  Datos clínicos y documentos del paciente
                </p>
              </div>
            </div>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label
                  for="tipoSangre"
                  class="block text-sm font-medium text-gray-700"
                >
                  Tipo de Sangre <span class="text-red-500">*</span>
                </label>
                <select
                  id="tipoSangre"
                  v-model="form.tipoSangre"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                >
                  <option value="">Seleccionar tipo</option>
                  <option value="A+">🔴 A+</option>
                  <option value="A-">🔴 A-</option>
                  <option value="B+">🔵 B+</option>
                  <option value="B-">🔵 B-</option>
                  <option value="AB+">🟣 AB+</option>
                  <option value="AB-">🟣 AB-</option>
                  <option value="O+">🟢 O+</option>
                  <option value="O-">🟢 O-</option>
                </select>
              </div>
              <div class="space-y-2">
                <label
                  for="pdf"
                  class="block text-sm font-medium text-gray-700"
                >
                  Documento PDF
                  <span class="text-gray-400 text-xs">(opcional)</span>
                </label>
                <div class="relative">
                  <input
                    id="pdf"
                    ref="pdfInput"
                    type="file"
                    accept=".pdf"
                    @change="handleFileChange"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
                <p class="text-xs text-gray-500 flex items-center gap-1">
                  <svg
                    class="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  Máximo 5MB - Solo archivos PDF
                </p>
              </div>
              <div class="md:col-span-2 space-y-2">
                <label
                  for="observaciones"
                  class="block text-sm font-medium text-gray-700"
                >
                  Observaciones
                  <span class="text-gray-400 text-xs">(opcional)</span>
                </label>
                <textarea
                  id="observaciones"
                  v-model="form.observaciones"
                  rows="4"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                  placeholder="Notas adicionales, alergias, enfermedades previas, medicamentos actuales..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions Mejoradas -->
        <div class="bg-white rounded-2xl shadow-lg border-0 overflow-hidden">
          <div class="p-6">
            <div
              class="flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <router-link
                to="/patients"
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
                class="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
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
                    ? "Actualizar Paciente"
                    : "Guardar Paciente"
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
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import Sidebar from "@/components/ui/Sidebar.vue";
import Button from "@/components/ui/Button.vue";
import Dialog from "@/components/ui/Dialog.vue";
import DialogHeader from "@/components/ui/DialogHeader.vue";
import DialogTitle from "@/components/ui/DialogTitle.vue";
import DialogDescription from "@/components/ui/DialogDescription.vue";
import DialogFooter from "@/components/ui/DialogFooter.vue";
import { PatientForm } from "@/types";
import apiService from "@/services/api";

@Component({
  components: {
    Sidebar,
    Button,
    Dialog,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
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
  showErrorDialog = false;
  showFileErrorDialog = false;
  currentError = "";
  fileErrorMessage = "";

  @Watch("error")
  onErrorChanged(newError: string | null) {
    if (newError) {
      this.currentError = newError;
      this.showErrorDialog = true;
    }
  }

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
        this.fileErrorMessage =
          "Solo se permiten archivos PDF. Por favor selecciona un archivo con extensión .pdf";
        this.showFileErrorDialog = true;
        target.value = "";
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        // 5MB
        this.fileErrorMessage =
          "El archivo es demasiado grande. El tamaño máximo permitido es de 5MB. Por favor selecciona un archivo más pequeño.";
        this.showFileErrorDialog = true;
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
