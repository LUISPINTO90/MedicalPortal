<template>
  <Sidebar>
    <div class="flex flex-col gap-8">
      <!-- Stats Cards -->
      <div class="grid gap-6 md:grid-cols-3">
        <!-- Total Pacientes -->
        <Card
          class="overflow-hidden transition-all duration-300 hover:shadow-lg border-0 bg-gradient-to-br from-blue-50 to-blue-100/50"
        >
          <CardContent class="p-0">
            <div class="flex flex-row items-center justify-between p-6">
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-2">
                  <div class="w-2 h-2 rounded-full bg-blue-500"></div>
                  <p
                    class="text-sm font-medium text-blue-700/80 uppercase tracking-wide"
                  >
                    Total Pacientes
                  </p>
                </div>
                <div class="text-3xl font-bold text-blue-900 mb-1">
                  {{ totalPatients }}
                </div>
                <p class="text-xs text-blue-600/70">Pacientes registrados</p>
              </div>
              <div class="relative">
                <div
                  class="absolute inset-0 rounded-full bg-blue-200/50 blur-lg"
                ></div>
                <div
                  class="relative rounded-full bg-gradient-to-br from-blue-500 to-blue-600 p-4 shadow-lg"
                >
                  <svg
                    class="h-7 w-7 text-white"
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
                </div>
              </div>
            </div>
            <div class="h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
          </CardContent>
        </Card>

        <!-- Citas Hoy -->
        <Card
          class="overflow-hidden transition-all duration-300 hover:shadow-lg border-0 bg-gradient-to-br from-emerald-50 to-emerald-100/50"
        >
          <CardContent class="p-0">
            <div class="flex flex-row items-center justify-between p-6">
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-2">
                  <div class="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <p
                    class="text-sm font-medium text-emerald-700/80 uppercase tracking-wide"
                  >
                    Citas Hoy
                  </p>
                </div>
                <div class="text-3xl font-bold text-emerald-900 mb-1">
                  {{ todayAppointments }}
                </div>
                <p class="text-xs text-emerald-600/70">Agenda del día</p>
              </div>
              <div class="relative">
                <div
                  class="absolute inset-0 rounded-full bg-emerald-200/50 blur-lg"
                ></div>
                <div
                  class="relative rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 p-4 shadow-lg"
                >
                  <svg
                    class="h-7 w-7 text-white"
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
              </div>
            </div>
            <div
              class="h-1 bg-gradient-to-r from-emerald-500 to-emerald-600"
            ></div>
          </CardContent>
        </Card>

        <!-- Tratamientos Activos -->
        <Card
          class="overflow-hidden transition-all duration-300 hover:shadow-lg border-0 bg-gradient-to-br from-violet-50 to-violet-100/50"
        >
          <CardContent class="p-0">
            <div class="flex flex-row items-center justify-between p-6">
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-2">
                  <div class="w-2 h-2 rounded-full bg-violet-500"></div>
                  <p
                    class="text-sm font-medium text-violet-700/80 uppercase tracking-wide"
                  >
                    Tratamientos Activos
                  </p>
                </div>
                <div class="text-3xl font-bold text-violet-900 mb-1">
                  {{ activeTreatments }}
                </div>
                <p class="text-xs text-violet-600/70">En progreso</p>
              </div>
              <div class="relative">
                <div
                  class="absolute inset-0 rounded-full bg-violet-200/50 blur-lg"
                ></div>
                <div
                  class="relative rounded-full bg-gradient-to-br from-violet-500 to-violet-600 p-4 shadow-lg"
                >
                  <svg
                    class="h-7 w-7 text-white"
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
              </div>
            </div>
            <div
              class="h-1 bg-gradient-to-r from-violet-500 to-violet-600"
            ></div>
          </CardContent>
        </Card>
      </div>

      <!-- Quick Actions -->
      <div class="grid gap-6 md:grid-cols-2">
        <!-- Próximas Citas -->
        <Card class="border-0 shadow-sm">
          <CardHeader>
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold">Próximas Citas</h3>
              <Button
                variant="outline"
                size="sm"
                @click="$router.push('/appointments')"
              >
                Ver todas
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div
              v-if="recentAppointments.length === 0"
              class="text-center py-8"
            >
              <svg
                class="h-12 w-12 text-gray-400 mx-auto mb-4"
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
              <p class="text-gray-500">No hay citas programadas</p>
              <Button
                @click="$router.push('/appointments/new')"
                variant="outline"
                size="sm"
                class="mt-2"
              >
                Programar cita
              </Button>
            </div>
            <div v-else class="space-y-3">
              <div
                v-for="appointment in recentAppointments"
                :key="appointment.id"
                class="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors"
              >
                <div class="flex-shrink-0">
                  <div
                    class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center"
                  >
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
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-medium text-gray-900 truncate">
                    {{ appointment.patient?.nombre }}
                    {{ appointment.patient?.apellidos }}
                  </p>
                  <p class="text-sm text-gray-500">
                    {{ formatDate(appointment.fecha) }} - {{ appointment.hora }}
                  </p>
                  <p class="text-sm text-gray-400">{{ appointment.motivo }}</p>
                </div>
                <Badge
                  :class="{
                    'bg-yellow-100 text-yellow-800':
                      appointment.estatus === 'PENDIENTE',
                    'bg-green-100 text-green-800':
                      appointment.estatus === 'REALIZADA',
                    'bg-red-100 text-red-800':
                      appointment.estatus === 'CANCELADA',
                  }"
                >
                  {{ appointment.estatus }}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Tratamientos Recientes -->
        <Card class="border-0 shadow-sm">
          <CardHeader>
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold">Tratamientos Recientes</h3>
              <Button
                variant="outline"
                size="sm"
                @click="$router.push('/treatments')"
              >
                Ver todos
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div v-if="recentTreatments.length === 0" class="text-center py-8">
              <svg
                class="h-12 w-12 text-gray-400 mx-auto mb-4"
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
              <p class="text-gray-500">No hay tratamientos registrados</p>
              <Button
                @click="$router.push('/treatments/new')"
                variant="outline"
                size="sm"
                class="mt-2"
              >
                Crear tratamiento
              </Button>
            </div>
            <div v-else class="space-y-3">
              <div
                v-for="treatment in recentTreatments"
                :key="treatment.id"
                class="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors"
              >
                <div class="flex-shrink-0">
                  <div
                    :class="{
                      'w-10 h-10 rounded-full flex items-center justify-center': true,
                      'bg-green-100': treatment.activo,
                      'bg-gray-100': !treatment.activo,
                    }"
                  >
                    <svg
                      :class="{
                        'w-5 h-5': true,
                        'text-green-600': treatment.activo,
                        'text-gray-400': !treatment.activo,
                      }"
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
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-medium text-gray-900 truncate">
                    {{ treatment.nombre }}
                  </p>
                  <p class="text-sm text-gray-500">
                    {{ treatment.patient?.nombre }}
                    {{ treatment.patient?.apellidos }}
                  </p>
                  <p class="text-sm text-gray-400">
                    Inicio: {{ formatDate(treatment.fechaInicio) }}
                  </p>
                </div>
                <Badge
                  :class="{
                    'bg-green-100 text-green-800': treatment.activo,
                    'bg-gray-100 text-gray-800': !treatment.activo,
                  }"
                >
                  {{ treatment.activo ? "Activo" : "Inactivo" }}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </Sidebar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Sidebar from "@/components/ui/Sidebar.vue";
import Button from "@/components/ui/Button.vue";
import Card from "@/components/ui/Card.vue";
import CardHeader from "@/components/ui/CardHeader.vue";
import CardContent from "@/components/ui/CardContent.vue";
import Badge from "@/components/ui/Badge.vue";
import { Appointment, Treatment } from "@/types";

@Component({
  components: {
    Sidebar,
    Button,
    Card,
    CardHeader,
    CardContent,
    Badge,
  },
})
export default class Dashboard extends Vue {
  async mounted(): Promise<void> {
    await Promise.all([
      this.$store.dispatch("fetchPatients"),
      this.$store.dispatch("fetchAppointments"),
      this.$store.dispatch("fetchTreatments"),
    ]);
  }

  get totalPatients(): number {
    return this.$store.getters.allPatients.length;
  }

  get todayAppointments(): number {
    return this.$store.getters.todayAppointments.length;
  }

  get activeTreatments(): number {
    return this.$store.getters.activeTreatments.length;
  }

  get recentAppointments(): Appointment[] {
    return this.$store.getters.allAppointments
      .filter((apt: Appointment) => apt.estatus === "PENDIENTE")
      .slice(0, 5);
  }

  get recentTreatments(): Treatment[] {
    return this.$store.getters.allTreatments.slice(0, 5);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
}
</script>
