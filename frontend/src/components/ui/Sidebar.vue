<template>
  <div class="flex h-screen">
    <!-- Mobile backdrop -->
    <div
      v-if="isOpen && isMobile"
      class="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
      @click="closeSidebar"
    ></div>

    <!-- Sidebar -->
    <div :class="sidebarClasses">
      <div class="flex h-full max-h-screen flex-col gap-2">
        <!-- Header -->
        <div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <div class="flex items-center gap-2 font-semibold">
            <div
              class="flex h-6 w-6 items-center justify-center rounded-lg bg-primary text-primary-foreground"
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                ></path>
              </svg>
            </div>
            <span class="font-semibold">Portal Médico</span>
          </div>
          <!-- Close button for mobile -->
          <button
            v-if="isMobile"
            @click="closeSidebar"
            class="ml-auto lg:hidden"
          >
            <svg
              class="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <!-- Navigation -->
        <div class="flex-1 px-3 py-2">
          <nav class="grid items-start gap-2 text-sm font-medium">
            <!-- Dashboard -->
            <router-link
              to="/dashboard"
              :class="getSidebarItemClass('Dashboard')"
              @click="handleNavClick"
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
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"
                ></path>
              </svg>
              Dashboard
            </router-link>

            <!-- Pacientes -->
            <router-link
              to="/patients"
              :class="getSidebarItemClass('Patients')"
              @click="handleNavClick"
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
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
              Pacientes
              <div class="ml-auto">
                <Badge
                  v-if="totalPatientsCount > 0"
                  variant="secondary"
                  class="text-xs bg-blue-100 text-blue-800 min-w-[20px] h-5 flex items-center justify-center rounded-full px-2"
                >
                  {{ totalPatientsCount }}
                </Badge>
              </div>
            </router-link>

            <!-- Citas -->
            <router-link
              to="/appointments"
              :class="getSidebarItemClass('Appointments')"
              @click="handleNavClick"
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
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
              Citas
              <div class="ml-auto">
                <Badge
                  v-if="totalAppointmentsCount > 0"
                  variant="secondary"
                  class="text-xs bg-green-100 text-green-800 min-w-[20px] h-5 flex items-center justify-center rounded-full px-2"
                >
                  {{ totalAppointmentsCount }}
                </Badge>
              </div>
            </router-link>

            <!-- Tratamientos -->
            <router-link
              to="/treatments"
              :class="getSidebarItemClass('Treatments')"
              @click="handleNavClick"
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                ></path>
              </svg>
              Tratamientos
              <div class="ml-auto">
                <Badge
                  v-if="totalTreatmentsCount > 0"
                  variant="secondary"
                  class="text-xs bg-purple-100 text-purple-800 min-w-[20px] h-5 flex items-center justify-center rounded-full px-2"
                >
                  {{ totalTreatmentsCount }}
                </Badge>
              </div>
            </router-link>
          </nav>
        </div>

        <!-- User Section -->
        <div class="mt-auto p-3">
          <Card class="p-3">
            <div class="flex items-center gap-3">
              <div
                class="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium"
              >
                {{ userInitials }}
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium truncate">
                  {{ currentUser?.email }}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                @click="handleLogout"
                title="Cerrar sesión"
                class="h-9 w-9 p-0"
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
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  ></path>
                </svg>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>

    <!-- Main content -->
    <div class="flex flex-1 flex-col overflow-hidden">
      <!-- Header with mobile menu button -->
      <header
        class="flex h-14 items-center gap-4 border-b bg-muted/10 px-4 lg:h-[60px] lg:px-6"
      >
        <!-- Mobile menu button -->
        <button @click="openSidebar" class="lg:hidden">
          <svg
            class="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>

        <div class="flex-1">
          <h1 class="text-lg font-semibold md:text-2xl">{{ pageTitle }}</h1>
        </div>
      </header>

      <!-- Page content -->
      <main
        class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 overflow-y-auto"
      >
        <slot />
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { User } from "@/types";
import Button from "@/components/ui/Button.vue";
import Card from "@/components/ui/Card.vue";
import Badge from "@/components/ui/Badge.vue";

@Component({
  components: {
    Button,
    Card,
    Badge,
  },
})
export default class Sidebar extends Vue {
  isOpen = false;
  isMobile = false;
  dataLoaded = false;

  async mounted() {
    this.checkIsMobile();
    window.addEventListener("resize", this.checkIsMobile);

    // 🔥 CARGAR DATOS AUTOMÁTICAMENTE AL MONTAR EL COMPONENTE
    await this.loadAllData();
  }

  beforeDestroy() {
    window.removeEventListener("resize", this.checkIsMobile);
  }

  // 🚀 Método para cargar todos los datos necesarios
  async loadAllData() {
    try {
      // Solo cargar si el usuario está autenticado y los datos no están cargados
      if (this.currentUser && !this.dataLoaded) {
        console.log("🔄 Cargando datos del sidebar...");

        await Promise.all([
          this.loadPatientsIfNeeded(),
          this.loadAppointmentsIfNeeded(),
          this.loadTreatmentsIfNeeded(),
        ]);

        this.dataLoaded = true;
        console.log("✅ Datos del sidebar cargados");
      }
    } catch (error) {
      console.error("❌ Error cargando datos del sidebar:", error);
    }
  }

  // Cargar pacientes solo si no están cargados
  async loadPatientsIfNeeded() {
    if (this.$store.getters.allPatients.length === 0) {
      await this.$store.dispatch("fetchPatients");
    }
  }

  // Cargar citas solo si no están cargadas
  async loadAppointmentsIfNeeded() {
    if (this.$store.getters.allAppointments.length === 0) {
      await this.$store.dispatch("fetchAppointments");
    }
  }

  // Cargar tratamientos solo si no están cargados
  async loadTreatmentsIfNeeded() {
    if (this.$store.getters.allTreatments.length === 0) {
      await this.$store.dispatch("fetchTreatments");
    }
  }

  checkIsMobile() {
    this.isMobile = window.innerWidth < 1024;
    if (!this.isMobile) {
      this.isOpen = false;
    }
  }

  get currentUser(): User | null {
    return this.$store.getters.currentUser;
  }

  get userInitials(): string {
    if (!this.currentUser?.email) return "U";
    return this.currentUser.email.charAt(0).toUpperCase();
  }

  // 📊 CONTADORES SIMPLIFICADOS PARA LOS BADGES
  get totalPatientsCount(): number {
    return this.$store.getters.allPatients.length;
  }

  get totalAppointmentsCount(): number {
    return this.$store.getters.allAppointments.length;
  }

  get totalTreatmentsCount(): number {
    return this.$store.getters.allTreatments.length;
  }

  get pageTitle(): string {
    const routeNames: { [key: string]: string } = {
      Dashboard: "Dashboard",
      Patients: "Gestión de Pacientes",
      NewPatient: "Nuevo Paciente",
      EditPatient: "Editar Paciente",
      Appointments: "Gestión de Citas",
      NewAppointment: "Nueva Cita",
      EditAppointment: "Editar Cita",
      Treatments: "Gestión de Tratamientos",
      NewTreatment: "Nuevo Tratamiento",
      EditTreatment: "Editar Tratamiento",
    };

    return routeNames[this.$route.name as string] || "Portal Médico";
  }

  get sidebarClasses(): string {
    const baseClasses =
      "fixed left-0 top-0 z-50 h-full w-64 border-r bg-background transition-transform duration-300 ease-in-out lg:static lg:translate-x-0";
    const mobileClasses = this.isOpen ? "translate-x-0" : "-translate-x-full";

    return this.isMobile ? `${baseClasses} ${mobileClasses}` : baseClasses;
  }

  getSidebarItemClass(routeName: string): string {
    const isActive =
      this.$route.name === routeName ||
      (routeName === "Patients" &&
        this.$route.name?.toString().includes("Patient")) ||
      (routeName === "Appointments" &&
        this.$route.name?.toString().includes("Appointment")) ||
      (routeName === "Treatments" &&
        this.$route.name?.toString().includes("Treatment"));

    return isActive
      ? "flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary overflow-hidden"
      : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted/50 overflow-hidden";
  }

  openSidebar() {
    this.isOpen = true;
  }

  closeSidebar() {
    this.isOpen = false;
  }

  handleNavClick() {
    if (this.isMobile) {
      this.closeSidebar();
    }
  }

  handleLogout(): void {
    this.$store.dispatch("logout");
    this.$router.push("/login");
  }
}
</script>
