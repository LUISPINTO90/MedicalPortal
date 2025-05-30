<template>
  <Sidebar>
    <div class="flex flex-col gap-8">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div class="space-y-1">
          <p class="text-gray-600">Administra todos los tratamientos médicos</p>
        </div>
        <Button
          @click="$router.push('/treatments/new')"
          class="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-lg transition-all duration-300 hover:shadow-xl"
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
          Nuevo Tratamiento
        </Button>
      </div>

      <!-- Filters -->
      <Card class="border-0 shadow-sm bg-white/90 backdrop-blur-sm">
        <CardContent class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label class="text-sm font-medium text-gray-700 mb-2 block">
                Buscar paciente
              </label>
              <div class="relative">
                <svg
                  class="absolute left-3 top-3 h-4 w-4 text-gray-400"
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
                  placeholder="Nombre del paciente..."
                  class="pl-10"
                />
              </div>
            </div>
            <div>
              <label class="text-sm font-medium text-gray-700 mb-2 block">
                Estado
              </label>
              <select
                v-model="selectedStatus"
                class="w-full h-10 px-3 border border-gray-200 rounded-md bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="">Todos los estados</option>
                <option value="true">Activo</option>
                <option value="false">Inactivo</option>
              </select>
            </div>
            <div>
              <label class="text-sm font-medium text-gray-700 mb-2 block">
                Tratamiento
              </label>
              <Input
                v-model="treatmentSearch"
                placeholder="Nombre del tratamiento..."
              />
            </div>
            <div class="flex items-end">
              <Button @click="clearFilters" variant="outline" class="w-full">
                Limpiar filtros
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center py-16">
        <div class="flex flex-col items-center gap-4">
          <div
            class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"
          ></div>
          <p class="text-gray-600">Cargando tratamientos...</p>
        </div>
      </div>

      <!-- Error State -->
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
            Error al cargar tratamientos
          </h3>
          <p class="text-sm text-red-700 mb-4 text-center max-w-md">
            {{ error }}
          </p>
          <Button
            @click="fetchTreatments"
            variant="outline"
            class="border-red-300 text-red-700 hover:bg-red-50"
          >
            Reintentar
          </Button>
        </CardContent>
      </Card>

      <!-- Empty State -->
      <Card
        v-else-if="filteredTreatments.length === 0 && !loading"
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
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">
            {{
              hasFilters
                ? "No se encontraron tratamientos"
                : "No hay tratamientos registrados"
            }}
          </h3>
          <p class="text-gray-600 mb-6 text-center max-w-md">
            {{
              hasFilters
                ? "Intenta con otros criterios de búsqueda."
                : "Comienza creando tu primer tratamiento médico."
            }}
          </p>
          <Button
            v-if="!hasFilters"
            @click="$router.push('/treatments/new')"
            class="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
          >
            Crear Primer Tratamiento
          </Button>
        </CardContent>
      </Card>

      <!-- Treatments Table -->
      <Card
        v-else
        class="border-0 shadow-sm bg-white/90 backdrop-blur-sm overflow-hidden"
      >
        <CardContent class="p-0">
          <div class="bg-gray-50/80 border-b border-gray-200 px-6 py-4">
            <div class="flex items-center justify-between">
              <h3 class="font-semibold text-gray-900">Lista de Tratamientos</h3>
              <div class="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  class="bg-purple-100 text-purple-800"
                >
                  {{ filteredTreatments.length }} tratamiento{{
                    filteredTreatments.length !== 1 ? "s" : ""
                  }}
                </Badge>
                <Button
                  @click="refreshTreatments"
                  variant="outline"
                  size="sm"
                  title="Actualizar lista"
                  class="h-8 w-8 p-0"
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
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    ></path>
                  </svg>
                </Button>
              </div>
            </div>
          </div>

          <DataTable
            :columns="columns"
            :data="filteredTreatments"
            class="[&_tr]:hover:bg-gray-50/50 [&_tr]:transition-colors"
          >
            <template #cell-patient="{ item }">
              <div class="flex items-center gap-3 py-3">
                <div
                  class="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-semibold"
                >
                  {{
                    getInitials(item.patient?.nombre, item.patient?.apellidos)
                  }}
                </div>
                <div>
                  <div class="font-semibold text-gray-900">
                    {{ item.patient?.nombre }} {{ item.patient?.apellidos }}
                  </div>
                  <div
                    class="text-sm text-gray-500"
                    v-if="item.patient?.telefono"
                  >
                    📞 {{ item.patient.telefono }}
                  </div>
                </div>
              </div>
            </template>

            <template #cell-treatment="{ item }">
              <div class="space-y-1">
                <div class="font-medium text-gray-900">
                  {{ item.nombre }}
                </div>
                <div
                  class="text-sm text-gray-500 max-w-xs truncate"
                  :title="item.descripcion"
                >
                  {{ item.descripcion }}
                </div>
              </div>
            </template>

            <template #cell-dates="{ item }">
              <div class="space-y-1">
                <div class="text-sm font-medium text-gray-900">
                  Inicio: {{ formatDate(item.fechaInicio) }}
                </div>
                <div class="text-sm text-gray-500 flex items-center gap-1">
                  ⏱️ {{ item.duracion }}
                </div>
              </div>
            </template>

            <template #cell-status="{ item }">
              <div class="flex items-center gap-2">
                <Badge
                  :class="getStatusClasses(item.activo)"
                  class="border transition-colors duration-200 cursor-default"
                >
                  {{ item.activo ? "ACTIVO" : "INACTIVO" }}
                </Badge>
              </div>
            </template>

            <template #cell-observaciones="{ value }">
              <div class="max-w-xs">
                <p class="text-sm text-gray-600 truncate" :title="value">
                  {{ value || "Sin observaciones" }}
                </p>
              </div>
            </template>

            <template #actions="{ item }">
              <div class="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  @click="$router.push(`/treatments/${item.id}/edit`)"
                  title="Editar tratamiento"
                  class="h-10 w-10 p-0 hover:bg-purple-50 hover:text-purple-600"
                >
                  <svg
                    class="h-5 w-5"
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
                  title="Eliminar tratamiento"
                  class="h-10 w-10 p-0 hover:bg-red-50 hover:text-red-600"
                >
                  <svg
                    class="h-5 w-5"
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

    <!-- Delete Confirmation Modal -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div
        class="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden"
      >
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
            <h2 class="text-lg font-semibold text-white">
              Eliminar Tratamiento
            </h2>
          </div>
        </div>

        <div class="p-6">
          <p class="text-gray-700 leading-relaxed">
            ¿Estás seguro de que deseas eliminar el tratamiento
            <strong class="text-gray-900">{{
              treatmentToDelete?.nombre
            }}</strong>
            del paciente
            <strong class="text-gray-900">
              {{ treatmentToDelete?.patient?.nombre }}
              {{ treatmentToDelete?.patient?.apellidos }} </strong
            >?
          </p>
          <div class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p class="text-sm text-red-700 font-medium">
              ⚠️ Esta acción no se puede deshacer
            </p>
          </div>
        </div>

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
            @click="deleteTreatment"
            :disabled="loading"
            class="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
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
            {{ loading ? "Eliminando..." : "Eliminar Tratamiento" }}
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
import { Treatment } from "@/types";
import { formatDate } from "@/utils/timeFormatter";

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
export default class Treatments extends Vue {
  searchTerm = "";
  selectedStatus = "";
  treatmentSearch = "";
  showDeleteModal = false;
  treatmentToDelete: Treatment | null = null;

  columns = [
    { key: "patient", title: "Paciente" },
    { key: "treatment", title: "Tratamiento" },
    { key: "dates", title: "Fechas" },
    { key: "status", title: "Estado" },
    { key: "observaciones", title: "Observaciones" },
  ];

  async mounted(): Promise<void> {
    await this.fetchTreatments();
  }

  get loading(): boolean {
    return this.$store.getters.isLoading;
  }

  get error(): string | null {
    return this.$store.getters.error;
  }

  get allTreatments(): Treatment[] {
    return this.$store.state.treatments || [];
  }

  get filteredTreatments(): Treatment[] {
    let filtered = this.allTreatments;

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (treatment) =>
          treatment.patient?.nombre?.toLowerCase().includes(term) ||
          treatment.patient?.apellidos?.toLowerCase().includes(term)
      );
    }

    if (this.selectedStatus !== "") {
      const isActive = this.selectedStatus === "true";
      filtered = filtered.filter((treatment) => treatment.activo === isActive);
    }

    if (this.treatmentSearch) {
      const term = this.treatmentSearch.toLowerCase();
      filtered = filtered.filter(
        (treatment) =>
          treatment.nombre.toLowerCase().includes(term) ||
          treatment.descripcion.toLowerCase().includes(term)
      );
    }

    return filtered.sort((a, b) => {
      if (a.activo !== b.activo) {
        return a.activo ? -1 : 1;
      }
      return (
        new Date(b.fechaInicio).getTime() - new Date(a.fechaInicio).getTime()
      );
    });
  }

  get hasFilters(): boolean {
    return !!(
      this.searchTerm ||
      this.selectedStatus !== "" ||
      this.treatmentSearch
    );
  }

  async fetchTreatments(): Promise<void> {
    await this.$store.dispatch("fetchTreatments");
  }

  async refreshTreatments(): Promise<void> {
    this.$store.commit("SET_TREATMENTS", []);
    await this.fetchTreatments();
  }

  getInitials(nombre?: string, apellidos?: string): string {
    if (!nombre || !apellidos) return "??";
    return (nombre.charAt(0) + apellidos.charAt(0)).toUpperCase();
  }

  formatDate(dateString: string): string {
    return formatDate(dateString);
  }

  // ⭐ MÉTODO PARA OBTENER LAS CLASES DE COLOR SEGÚN EL ESTADO
  getStatusClasses(isActive: boolean): string {
    if (isActive) {
      return "bg-green-600 text-green-800 border-green-200 hover:bg-green-500";
    } else {
      return "bg-purple-500 text-gray-800 border-gray-200 hover:bg-purple-400";
    }
  }

  clearFilters(): void {
    this.searchTerm = "";
    this.selectedStatus = "";
    this.treatmentSearch = "";
  }

  async toggleStatus(treatment: Treatment): Promise<void> {
    try {
      await this.$store.dispatch("toggleTreatmentStatus", treatment.id);
    } catch (error) {
      console.error("Error toggling treatment status:", error);
    }
  }

  confirmDelete(treatment: Treatment): void {
    this.treatmentToDelete = treatment;
    this.showDeleteModal = true;
  }

  async deleteTreatment(): Promise<void> {
    if (!this.treatmentToDelete) return;

    try {
      await this.$store.dispatch("deleteTreatment", this.treatmentToDelete.id);
      this.showDeleteModal = false;
      this.treatmentToDelete = null;
    } catch (error) {
      console.error("Error deleting treatment:", error);
    }
  }
}
</script>
