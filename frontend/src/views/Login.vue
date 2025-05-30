<template>
  <div
    class="min-h-screen flex items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8"
  >
    <div class="mx-auto grid w-[350px] gap-6">
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                ></path>
              </svg>
            </div>
            <h1 class="text-3xl font-bold">Portal Médico</h1>
            <p class="text-balance text-muted-foreground">
              Inicia sesión para acceder al sistema
            </p>
          </div>
          <form @submit.prevent="handleLogin" class="space-y-4">
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

            <div class="space-y-2">
              <label
                for="email"
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Correo electrónico
              </label>
              <Input
                id="email"
                v-model="form.email"
                type="email"
                placeholder="admin@test.com"
                required
              />
            </div>

            <div class="space-y-2">
              <label
                for="password"
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Contraseña
              </label>
              <Input
                id="password"
                v-model="form.password"
                type="password"
                placeholder="••••••••"
                required
              />
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
              {{ loading ? "Iniciando sesión..." : "Iniciar Sesión" }}
            </Button>
          </form>
        </CardContent>
      </Card>

      <!-- Register Link -->
      <Card class="bg-muted/50">
        <CardContent class="pt-6">
          <div class="text-center space-y-2">
            <p class="text-sm text-muted-foreground">¿No tienes cuenta?</p>
            <router-link
              to="/register"
              class="text-sm font-medium text-primary hover:text-primary/80 underline-offset-4 hover:underline transition-colors"
            >
              Regístrate aquí
            </router-link>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { LoginForm } from "@/types";
import Button from "@/components/ui/Button.vue";
import Input from "@/components/ui/Input.vue";
import Card from "@/components/ui/Card.vue";
import CardContent from "@/components/ui/CardContent.vue";

@Component({
  components: {
    Button,
    Input,
    Card,
    CardContent,
  },
})
export default class Login extends Vue {
  form: LoginForm = {
    email: "",
    password: "",
  };

  get loading(): boolean {
    return this.$store.getters.isLoading;
  }

  get error(): string | null {
    return this.$store.getters.error;
  }

  async handleLogin(): Promise<void> {
    try {
      await this.$store.dispatch("login", this.form);
      this.$router.push("/dashboard");
    } catch (error) {
      // Error handling is done in the store
      console.error("Login error:", error);
    }
  }
}
</script>
