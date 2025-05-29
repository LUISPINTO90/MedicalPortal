<template>
  <Sidebar>
    <div class="flex flex-col gap-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <p class="text-muted-foreground">
            Administra la información de todos los pacientes
          </p>
        </div>
        <Button @click="$router.push('/patients/new')">
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

      <!-- Search and Filters -->
      <Card>
        <CardContent>
          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex-1">
              <div class="relative">
                <svg
                  class="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"
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
                  class="pl-8"
                />
              </div>
            </div>
            <div class="w-full md:w-48">
              <select v-model="selectedFilter" class="form-input">
                <option value="">Todos los sexos</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center py-10">
        <div class="loading-spinner h-8 w-8"></div>
      </div>

      <!-- Error State -->
      <Card v-else-if="error" class="border-destructive/50">
        <CardContent class="flex flex-col items-center justify-center py-10">
          <svg
            class="h-10 w-10 text-destructive"
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
          <h3 class="mt-2 text-lg font-semibold">Error al cargar pacientes</h3>
          <p class="mt-1 text-sm text-muted-foreground">{{ error }}</p>
          <Button @click="fetchPatients" class="mt-4" variant="outline">
            Reintentar
          </Button>
        </CardContent>
      </Card>

      <!-- Empty State -->
      <Card v-else-if="filteredPatients.length === 0">
        <CardContent class="flex flex-col items-center justify-center py-10">
          <svg
            class="h-10 w-10 text-muted-foreground"
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
          <h3 class="mt-2 text-lg font-semibold">
            {{
              searchTerm || selectedFilter
                ? "No se encontraron pacientes"
                : "No hay pacientes registrados"
            }}
          </h3>
          <p class="mt-1 text-sm text-muted-foreground">
            {{
              searchTerm || selectedFilter
                ? "Intenta con otros criterios de búsqueda."
                : "Comienza agregando tu primer paciente."
            }}
          </p>
          <Button
            v-if="!searchTerm && !selectedFilter"
            @click="$router.push('/patients/new')"
            class="mt-4"
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

      <!-- Patients DataTable -->
      <Card v-else>
        <DataTable :columns="columns" :data="filteredPatients">
          <template #cell-patient="{ item }">
            <div class="flex items-center gap-3">
              <div class="avatar">
                <div class="avatar-fallback">
                  <span class="text-sm font-medium">
                    {{ getInitials(item.nombre, item.apellidos) }}
                  </span>
                </div>
              </div>
              <div>
                <div class="font-medium">
                  {{ item.nombre }} {{ item.apellidos }}
                </div>
                <div class="text-sm text-muted-foreground">
                  {{ item.edad }} años -
                  {{ item.sexo === "M" ? "Masculino" : "Femenino" }}
                </div>
              </div>
            </div>
          </template>

          <template #cell-curp="{ value }">
            <code
              class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm"
            >
              {{ value }}
            </code>
          </template>

          <template #cell-contact="{ item }">
            <div>
              <div class="font-medium">{{ item.telefono }}</div>
              <div class="text-sm text-muted-foreground">
                {{ item.email || "Sin email" }}
              </div>
            </div>
          </template>

          <template #cell-medical="{ item }">
            <div>
              <Badge variant="secondary" class="mb-1">{{
                item.tipoSangre
              }}</Badge>
              <div
                class="text-sm text-muted-foreground"
                :title="item.observaciones"
              >
                {{ truncateText(item.observaciones, 30) }}
              </div>
            </div>
          </template>

          <template #cell-date="{ value }">
            <div class="text-sm">{{ formatDate(value) }}</div>
          </template>

          <template #actions="{ item }">
            <div class="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                @click="$router.push(`/patients/${item.id}/edit`)"
                title="Editar"
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
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  ></path>
                </svg>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                @click="confirmDelete(item)"
                title="Eliminar"
                class="h-8 w-8 p-0 text-destructive hover:text-destructive"
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
      </Card>
    </div>

    <!-- Delete Confirmation Dialog -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
    >
      <div
        class="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg"
      >
        <div class="flex flex-col space-y-2 text-center sm:text-left">
          <div class="flex items-center gap-2">
            <svg
              class="h-6 w-6 text-destructive"
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
            <h2 class="text-lg font-semibold">Eliminar Paciente</h2>
          </div>
          <p class="text-sm text-muted-foreground">
            ¿Estás seguro de que deseas eliminar el paciente
            <strong
              >{{ patientToDelete?.nombre }}
              {{ patientToDelete?.apellidos }}</strong
            >? Esta acción no se puede deshacer.
          </p>
        </div>
        <div
          class="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2"
        >
          <Button variant="outline" @click="showDeleteModal = false">
            Cancelar
          </Button>
          <Button
            variant="destructive"
            @click="deletePatient"
            :disabled="loading"
          >
            {{ loading ? "Eliminando..." : "Eliminar" }}
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

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
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
