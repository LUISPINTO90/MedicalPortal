<template>
  <Sidebar>
    <div class="flex flex-col gap-6">
      <!-- Stats Cards -->
      <div class="grid gap-4 md:grid-cols-3">
        <!-- Total Pacientes -->
        <Card>
          <CardContent
            class="flex flex-row items-center justify-between space-y-0 p-6"
          >
            <div>
              <p class="text-sm font-medium text-muted-foreground pt-4">
                Total Pacientes
              </p>
              <div class="text-3xl font-bold">{{ totalPatients }}</div>
              <p class="text-xs text-muted-foreground">
                +0% desde el mes pasado
              </p>
            </div>
            <div class="rounded-full bg-blue-100 p-3">
              <svg
                class="h-6 w-6 text-blue-600"
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
          </CardContent>
        </Card>

        <!-- Citas Hoy -->
        <Card>
          <CardContent
            class="flex flex-row items-center justify-between space-y-0 p-6"
          >
            <div>
              <p class="text-sm font-medium text-muted-foreground pt-4">Citas Hoy</p>
              <div class="text-3xl font-bold">0</div>
              <p class="text-xs text-muted-foreground">Próximamente</p>
            </div>
            <div class="rounded-full bg-green-100 p-3">
              <svg
                class="h-6 w-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3a4 4 0 118 0v4m-4 11V10"
                ></path>
              </svg>
            </div>
          </CardContent>
        </Card>

        <!-- Tratamientos Activos -->
        <Card>
          <CardContent
            class="flex flex-row items-center justify-between space-y-0 p-6"
          >
            <div>
              <p class="text-sm font-medium text-muted-foreground pt-4">
                Tratamientos Activos
              </p>
              <div class="text-3xl font-bold">0</div>
              <p class="text-xs text-muted-foreground">Próximamente</p>
            </div>
            <div class="rounded-full bg-purple-100 p-3">
              <svg
                class="h-6 w-6 text-purple-600"
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
          </CardContent>
        </Card>
      </div>

      <!-- Quick Access Section -->
      <Card>
        <CardHeader>
          <h3 class="text-lg font-semibold">Acciones Rápidas</h3>
          <p class="text-sm text-muted-foreground">
            Gestiona tu sistema médico eficientemente
          </p>
        </CardHeader>
        <CardContent>
          <div class="grid gap-4 md:grid-cols-2">
            <!-- Nuevo Paciente -->
            <Button
              variant="outline"
              class="h-24 flex-col gap-3 justify-center"
              @click="$router.push('/patients/new')"
            >
              <div class="rounded-full bg-primary p-3">
                <svg
                  class="h-6 w-6 text-primary-foreground"
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
              </div>
              <div class="text-center">
                <div class="font-semibold">Nuevo Paciente</div>
                <div class="text-xs text-muted-foreground">
                  Registrar nuevo paciente
                </div>
              </div>
            </Button>

            <!-- Ver Pacientes -->
            <Button
              variant="outline"
              class="h-24 flex-col gap-3 justify-center"
              @click="$router.push('/patients')"
            >
              <div class="rounded-full bg-green-500 p-3">
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
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                  ></path>
                </svg>
              </div>
              <div class="text-center">
                <div class="font-semibold">Ver Pacientes</div>
                <div class="text-xs text-muted-foreground">Lista completa</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      <!-- Recent Activity (only show if there are patients) -->
      <Card v-if="recentPatients.length > 0">
        <CardHeader>
          <h3 class="text-lg font-semibold">Actividad Reciente</h3>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div
              v-for="patient in recentPatients"
              :key="patient.id"
              class="flex items-center space-x-4 p-3 rounded-lg bg-muted/30"
            >
              <div
                class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10"
              >
                <span class="text-sm font-medium text-primary">
                  {{ getInitials(patient.nombre, patient.apellidos) }}
                </span>
              </div>
              <div class="flex-1 space-y-1">
                <p class="text-sm font-medium leading-none">
                  {{ patient.nombre }} {{ patient.apellidos }}
                </p>
                <p class="text-xs text-muted-foreground">
                  Registrado {{ formatDate(patient.createdAt) }}
                </p>
              </div>
              <Badge variant="outline" class="text-xs">
                {{ patient.tipoSangre }}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
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
import { Patient } from "@/types";

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
    await this.$store.dispatch("fetchPatients");
  }

  get totalPatients(): number {
    return this.$store.getters.allPatients.length;
  }

  get recentPatients(): Patient[] {
    return this.$store.getters.allPatients.slice(0, 3);
  }

  getInitials(nombre: string, apellidos: string): string {
    return (nombre.charAt(0) + apellidos.charAt(0)).toUpperCase();
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "hace 1 día";
    if (diffDays < 7) return `hace ${diffDays} días`;

    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
}
</script>
