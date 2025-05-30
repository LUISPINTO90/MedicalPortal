<template>
  <div class="flex h-screen bg-background">
    <!-- Sidebar -->
    <div class="hidden border-r bg-muted/10 md:block w-64">
      <div class="flex h-full max-h-screen flex-col gap-2">
        <!-- Logo/Header -->
        <div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <div class="flex items-center gap-2 font-semibold">
            <div
              class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"
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
            <span class="text-lg">Portal Médico</span>
          </div>
        </div>

        <!-- Navigation -->
        <div class="flex-1 px-3 py-2">
          <nav class="grid items-start gap-2 text-sm font-medium">
            <router-link
              to="/dashboard"
              :class="getSidebarItemClass('Dashboard')"
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

            <router-link
              to="/patients"
              :class="getSidebarItemClass('Patients')"
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
            </router-link>

            <router-link
              to="/appointments"
              :class="getSidebarItemClass('Appointments')"
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
            </router-link>

            <router-link
              to="/treatments"
              :class="getSidebarItemClass('Treatments')"
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
            </router-link>
          </nav>
        </div>

        <!-- User Menu -->
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

    <!-- Main Content -->
    <div class="flex flex-1 flex-col overflow-hidden">
      <!-- Header -->
      <header
        class="flex h-14 items-center gap-4 border-b bg-muted/10 px-4 lg:h-[60px] lg:px-6"
      >
        <div class="flex-1">
          <h1 class="text-lg font-semibold md:text-2xl">{{ pageTitle }}</h1>
        </div>
      </header>

      <!-- Page Content -->
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

@Component({
  components: {
    Button,
    Card,
  },
})
export default class Layout extends Vue {
  get currentUser(): User | null {
    return this.$store.getters.currentUser;
  }

  get userInitials(): string {
    if (!this.currentUser?.email) return "U";
    return this.currentUser.email.charAt(0).toUpperCase();
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
      ? "flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
      : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary";
  }

  handleLogout(): void {
    this.$store.dispatch("logout");
    this.$router.push("/login");
  }
}
</script>
