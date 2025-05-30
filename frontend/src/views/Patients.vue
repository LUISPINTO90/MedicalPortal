<template>
  <Sidebar>
    <div class="flex flex-col gap-8">
      <!-- Header Mejorado -->
      <div class="flex items-center justify-between">
        <div class="space-y-1">
          <p class="text-gray-600">
            Administra la información de todos los pacientes
          </p>
        </div>
        <Button
          @click="$router.push('/patients/new')"
          class="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg transition-all duration-300 hover:shadow-xl"
        >
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
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
          Nuevo Paciente
        </Button>
      </div>

      <!-- Search and Filters Mejorados -->
      <Card class="border-0 shadow-sm bg-white/90 backdrop-blur-sm">
        <CardContent class="p-6">
          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex-1">
              <div class="relative">
                <svg
                  class="absolute left-3 top-3 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
                <Input
                  v-model="searchTerm"
                  placeholder="Buscar por nombre, CURP o email..."
                  class="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
                />
              </div>
            </div>
            <div class="w-full md:w-56">
              <select
                v-model="selectedFilter"
                class="w-full h-12 px-4 border border-gray-200 rounded-md bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              >
                <option value="">Todos los sexos</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Loading State Mejorado -->
      <div v-if="loading" class="flex justify-center py-16">
        <div class="flex flex-col items-center gap-4">
          <div
            class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
          ></div>
          <p class="text-gray-600">Cargando pacientes...</p>
        </div>
      </div>

      <!-- Error State Mejorado -->
      <Card v-else-if="error" class="border-red-200 bg-red-50/50">
        <CardContent class="flex flex-col items-center justify-center py-12">
          <div class="rounded-full bg-red-100 p-3 mb-4">
            <svg
              class="h-8 w-8 text-red-600"
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
          <h3 class="text-lg font-semibold text-red-900 mb-2">
            Error al cargar pacientes
          </h3>
          <p class="text-sm text-red-700 mb-4 text-center max-w-md">
            {{ error }}
          </p>
          <Button
            @click="fetchPatients"
            variant="outline"
            class="border-red-300 text-red-700 hover:bg-red-50"
          >
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
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              ></path>
            </svg>
            Reintentar
          </Button>
        </CardContent>
      </Card>

      <!-- Empty State Mejorado -->
      <Card
        v-else-if="filteredPatients.length === 0"
        class="border-0 shadow-sm bg-gradient-to-br from-gray-50 to-gray-100/50"
      >
        <CardContent class="flex flex-col items-center justify-center py-16">
          <div class="rounded-full bg-gray-100 p-4 mb-6">
            <svg
              class="h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">
            {{
              searchTerm || selectedFilter
                ? "No se encontraron pacientes"
                : "No hay pacientes registrados"
            }}
          </h3>
          <p class="text-gray-600 mb-6 text-center max-w-md">
            {{
              searchTerm || selectedFilter
                ? "Intenta con otros criterios de búsqueda o revisa los filtros aplicados."
                : "Comienza agregando tu primer paciente para empezar a gestionar tu consulta médica."
            }}
          </p>
          <Button
            v-if="!searchTerm && !selectedFilter"
            @click="$router.push('/patients/new')"
            class="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg transition-all duration-300 hover:shadow-xl"
          >
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
                d="M12 4v16m8-8H4"
              ></path>
            </svg>
            Agregar Primer Paciente
          </Button>
        </CardContent>
      </Card>

      <!-- Patients DataTable Mejorado -->
      <Card
        v-else
        class="border-0 shadow-sm bg-white/90 backdrop-blur-sm overflow-hidden"
      >
        <CardContent class="p-0">
          <!-- Table Header -->
          <div class="bg-gray-50/80 border-b border-gray-200 px-6 py-4">
            <div class="flex items-center justify-between">
              <h3 class="font-semibold text-gray-900">Lista de Pacientes</h3>
              <Badge variant="secondary" class="bg-blue-100 text-blue-800">
                {{ filteredPatients.length }} paciente{{
                  filteredPatients.length !== 1 ? "s" : ""
                }}
              </Badge>
            </div>
          </div>

          <DataTable
            :columns="columns"
            :data="filteredPatients"
            class="[&_tr]:hover:bg-gray-50/50 [&_tr]:transition-colors"
          >
            <template #cell-patient="{ item }">
              <div class="flex items-center gap-4 py-3">
                <div
                  class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold shadow-lg"
                >
                  {{ getInitials(item.nombre, item.apellidos) }}
                </div>
                <div>
                  <div class="font-semibold text-gray-900">
                    {{ item.nombre }} {{ item.apellidos }}
                  </div>
                  <div class="text-sm text-gray-500 flex items-center gap-2">
                    <span>{{ item.edad }} años</span>
                    <span class="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span>{{
                      item.sexo === "M" ? "Masculino" : "Femenino"
                    }}</span>
                  </div>
                </div>
              </div>
            </template>

            <template #cell-curp="{ value }">
              <code
                class="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm font-mono border"
              >
                {{ value }}
              </code>
            </template>

            <template #cell-contact="{ item }">
              <div class="space-y-1">
                <div class="font-medium text-gray-900 flex items-center gap-2">
                  <svg
                    class="w-4 h-4 text-gray-400"
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
                  {{ item.telefono }}
                </div>
                <div
                  class="text-sm text-gray-500 flex items-center gap-2"
                  v-if="item.email"
                >
                  <svg
                    class="w-4 h-4 text-gray-400"
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
                  {{ item.email }}
                </div>
                <div class="text-sm text-gray-400" v-else>Sin email</div>
              </div>
            </template>

            <template #cell-medical="{ item }">
              <div class="space-y-2">
                <Badge
                  :class="{
                    'bg-red-100 text-red-800': item.tipoSangre?.includes('A'),
                    'bg-blue-100 text-blue-800': item.tipoSangre?.includes('B'),
                    'bg-purple-100 text-purple-800':
                      item.tipoSangre?.includes('AB'),
                    'bg-green-100 text-green-800':
                      item.tipoSangre?.includes('O'),
                  }"
                >
                  {{ item.tipoSangre }}
                </Badge>
                <div class="text-sm text-gray-600" :title="item.observaciones">
                  {{ truncateText(item.observaciones, 40) }}
                </div>
              </div>
            </template>

            <!-- ⭐ ESTE ES EL SLOT CRÍTICO QUE NECESITAS AGREGAR/VERIFICAR -->
            <template #cell-createdAt="{ value }">
              <div class="text-sm text-gray-600">{{ formatDate(value) }}</div>
            </template>

            <template #actions="{ item }">
              <div class="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  @click="$router.push(`/patients/${item.id}/edit`)"
                  title="Editar paciente"
                  class="h-9 w-9 p-0 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  <svg
                    class="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    ></path>
                  </svg>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  @click="confirmDelete(item)"
                  title="Eliminar paciente"
                  class="h-9 w-9 p-0 hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  <svg
                    class="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    ></path>
                  </svg>
                </Button>
              </div>
            </template>
          </DataTable>
        </CardContent>
      </Card>
    </div>

    <!-- Delete Confirmation Dialog Mejorado -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div
        class="bg-white rounded-xl shadow-2xl max-w-md w-full border-0 overflow-hidden"
      >
        <!-- Header del Modal -->
        <div class="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4">
          <div class="flex items-center gap-3">
            <div class="rounded-full bg-white/20 p-2">
              <svg
                class="h-6 w-6 text-white"
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
            <h2 class="text-lg font-semibold text-white">Eliminar Paciente</h2>
          </div>
        </div>

        <!-- Contenido del Modal -->
        <div class="p-6">
          <p class="text-gray-700 leading-relaxed">
            ¿Estás seguro de que deseas eliminar el paciente
            <strong class="text-gray-900"
              >{{ patientToDelete?.nombre }}
              {{ patientToDelete?.apellidos }}</strong
            >?
          </p>
          <div class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p class="text-sm text-red-700 font-medium">
              ⚠️ Esta acción no se puede deshacer
            </p>
            <p class="text-sm text-red-600 mt-1">
              Se eliminará toda la información asociada con este paciente.
            </p>
          </div>
        </div>

        <!-- Footer del Modal -->
        <div
          class="bg-gray-50 px-6 py-4 flex flex-col-reverse sm:flex-row sm:justify-end gap-3"
        >
          <Button
            variant="outline"
            @click="showDeleteModal = false"
            class="border-gray-300 hover:bg-gray-50"
          >
            Cancelar
          </Button>
          <Button
            @click="deletePatient"
            :disabled="loading"
            class="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              v-if="loading"
              class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
            {{ loading ? "Eliminando..." : "Eliminar Paciente" }}
          </Button>
        </div>
      </div>
    </div>
  </Sidebar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Sidebar from "@/components/ui/Sidebar.vue";
import Button from "@/components/ui/Button.vue";
import Input from "@/components/ui/Input.vue";
import Card from "@/components/ui/Card.vue";
import CardContent from "@/components/ui/CardContent.vue";
import DataTable from "@/components/ui/DataTable.vue";
import Badge from "@/components/ui/Badge.vue";
import { Patient } from "@/types";
import { formatDateTime } from "@/utils/timeFormatter";

@Component({
  components: {
    Sidebar,
    Button,
    Input,
    Card,
    CardContent,
    DataTable,
    Badge,
  },
})
export default class Patients extends Vue {
  searchTerm = "";
  selectedFilter = "";
  showDeleteModal = false;
  patientToDelete: Patient | null = null;

  columns = [
    { key: "patient", title: "Paciente" },
    { key: "curp", title: "CURP" },
    { key: "contact", title: "Contacto" },
    { key: "medical", title: "Info. Médica" },
    { key: "createdAt", title: "Fecha Registro" },
  ];

  async mounted(): Promise<void> {
    await this.fetchPatients();

    // 🔍 Debug: Ver la estructura real de los datos
    if (this.patients.length > 0) {
      console.log("Primer paciente:", this.patients[0]);
      console.log("Campos disponibles:", Object.keys(this.patients[0]));
    }
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

  get filteredPatients(): Patient[] {
    let filtered = this.patients;

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (patient) =>
          patient.nombre.toLowerCase().includes(term) ||
          patient.apellidos.toLowerCase().includes(term) ||
          patient.curp.toLowerCase().includes(term) ||
          (patient.email && patient.email.toLowerCase().includes(term))
      );
    }

    if (this.selectedFilter) {
      filtered = filtered.filter(
        (patient) => patient.sexo === this.selectedFilter
      );
    }

    return filtered;
  }

  async fetchPatients(): Promise<void> {
    await this.$store.dispatch("fetchPatients");
  }

  getInitials(nombre: string, apellidos: string): string {
    return (nombre.charAt(0) + apellidos.charAt(0)).toUpperCase();
  }

  // ⭐ REEMPLAZAR ESTE MÉTODO
  formatDate(dateString: string): string {
    return formatDateTime(dateString);
  }

  truncateText(text: string | undefined, maxLength: number): string {
    if (!text) return "Sin observaciones";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  }

  confirmDelete(patient: Patient): void {
    this.patientToDelete = patient;
    this.showDeleteModal = true;
  }

  async deletePatient(): Promise<void> {
    if (!this.patientToDelete) return;

    try {
      await this.$store.dispatch("deletePatient", this.patientToDelete.id);
      this.showDeleteModal = false;
      this.patientToDelete = null;
    } catch (error) {
      console.error("Error deleting patient:", error);
    }
  }
}
</script>
