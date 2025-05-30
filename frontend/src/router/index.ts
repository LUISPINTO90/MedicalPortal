import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "/dashboard",
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
    meta: { requiresGuest: true },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/Register.vue"),
    meta: { requiresGuest: true },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("@/views/Dashboard.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/patients",
    name: "Patients",
    component: () => import("@/views/Patients.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/patients/new",
    name: "NewPatient",
    component: () => import("@/views/PatientForm.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/patients/:id/edit",
    name: "EditPatient",
    component: () => import("@/views/PatientForm.vue"),
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: "/appointments",
    name: "Appointments",
    component: () => import("@/views/Appointments.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/appointments/new",
    name: "NewAppointment",
    component: () => import("@/views/AppointmentForm.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/appointments/:id/edit",
    name: "EditAppointment",
    component: () => import("@/views/AppointmentForm.vue"),
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: "/treatments",
    name: "Treatments",
    component: () => import("@/views/Treatments.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/treatments/new",
    name: "NewTreatment",
    component: () => import("@/views/TreatmentForm.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/treatments/:id/edit",
    name: "EditTreatment",
    component: () => import("@/views/TreatmentForm.vue"),
    meta: { requiresAuth: true },
    props: true,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// Guard para rutas protegidas
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next("/login");
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresGuest)) {
    if (isAuthenticated) {
      next("/dashboard");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
