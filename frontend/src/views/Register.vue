<template>
  <div
    class="min-h-screen flex items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8"
  >
    <div class="mx-auto grid w-[400px] gap-6">
      <Card>
        <CardContent class="space-y-4">
          <div class="grid gap-2 text-center pt-4">
            <div
              class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary"
            >
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
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                ></path>
              </svg>
            </div>
            <h1 class="text-3xl font-bold">Crear Cuenta</h1>
            <p class="text-balance text-muted-foreground">
              Regístrate para acceder al Portal Médico
            </p>
          </div>
          <form @submit.prevent="handleRegister" class="space-y-4">
            <!-- Error Display -->
            <div
              v-if="error"
              class="rounded-lg border border-destructive/50 bg-destructive/10 p-3"
            >
              <div class="flex items-center gap-2">
                <svg
                  class="h-4 w-4 text-destructive"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clip-rule="evenodd"
                  />
                </svg>
                <p class="text-sm text-destructive">{{ error }}</p>
              </div>
            </div>

            <!-- Success Display -->
            <div
              v-if="success"
              class="rounded-lg border border-green-300 bg-green-50 p-3"
            >
              <div class="flex items-center gap-2">
                <svg
                  class="h-4 w-4 text-green-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
                <p class="text-sm text-green-700">{{ success }}</p>
              </div>
            </div>

            <div class="space-y-2">
              <label
                for="email"
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Correo electrónico
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
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  ></path>
                </svg>
                <Input
                  id="email"
                  v-model="form.email"
                  type="email"
                  placeholder="doctor@hospital.com"
                  required
                  class="pl-10"
                />
              </div>
            </div>

            <div class="space-y-2">
              <label
                for="password"
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Contraseña
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
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  ></path>
                </svg>
                <Input
                  id="password"
                  v-model="form.password"
                  type="password"
                  placeholder="••••••••"
                  required
                  class="pl-10"
                />
              </div>
              <p class="text-xs text-gray-500">Mínimo 6 caracteres</p>
            </div>

            <div class="space-y-2">
              <label
                for="confirmPassword"
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Confirmar contraseña
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <Input
                  id="confirmPassword"
                  v-model="form.confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  required
                  class="pl-10"
                />
              </div>
            </div>

            <Button type="submit" :disabled="loading" class="w-full">
              <svg
                v-if="loading"
                class="mr-2 h-4 w-4 animate-spin"
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
              {{ loading ? "Creando cuenta..." : "Crear Cuenta" }}
            </Button>
          </form>
        </CardContent>
      </Card>

      <!-- Login Link -->
      <Card class="bg-muted/50">
        <CardContent class="pt-6">
          <div class="text-center space-y-2">
            <p class="text-sm text-muted-foreground">¿Ya tienes una cuenta?</p>
            <router-link
              to="/login"
              class="text-sm font-medium text-primary hover:text-primary/80 underline-offset-4 hover:underline transition-colors"
            >
              Iniciar sesión aquí
            </router-link>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Button from "@/components/ui/Button.vue";
import Input from "@/components/ui/Input.vue";
import Card from "@/components/ui/Card.vue";
import CardContent from "@/components/ui/CardContent.vue";

interface RegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
}

@Component({
  components: {
    Button,
    Input,
    Card,
    CardContent,
  },
})
export default class Register extends Vue {
  form: RegisterForm = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  success = "";

  get loading(): boolean {
    return this.$store.getters.isLoading;
  }

  get error(): string | null {
    return this.$store.getters.error;
  }

  validateForm(): string | null {
    if (!this.form.email) {
      return "El correo electrónico es requerido";
    }

    if (!this.form.email.includes("@")) {
      return "Por favor ingresa un correo electrónico válido";
    }

    if (!this.form.password) {
      return "La contraseña es requerida";
    }

    if (this.form.password.length < 6) {
      return "La contraseña debe tener al menos 6 caracteres";
    }

    if (!this.form.confirmPassword) {
      return "Debes confirmar tu contraseña";
    }

    if (this.form.password !== this.form.confirmPassword) {
      return "Las contraseñas no coinciden";
    }

    return null;
  }

  async handleRegister(): Promise<void> {
    try {
      // Limpiar mensajes previos
      this.success = "";
      this.$store.commit("SET_ERROR", null);

      // Validar formulario
      const validationError = this.validateForm();
      if (validationError) {
        this.$store.commit("SET_ERROR", validationError);
        return;
      }

      // Intentar registrar
      await this.$store.dispatch("register", {
        email: this.form.email,
        password: this.form.password,
      });

      // Si llega aquí, el registro fue exitoso
      this.success = "¡Cuenta creada exitosamente! Redirigiendo...";

      // Redirigir al dashboard después de un breve delay
      setTimeout(() => {
        this.$router.push("/dashboard");
      }, 1500);
    } catch (error) {
      // El error ya se maneja en el store
      console.error("Register error:", error);
    }
  }
}
</script>
