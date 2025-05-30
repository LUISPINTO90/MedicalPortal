import Vue from "vue";
import Vuex from "vuex";
import apiService from "@/services/api";
import { User, Patient, Appointment, Treatment } from "@/types";

Vue.use(Vuex);

interface State {
  user: User | null;
  token: string | null;
  patients: Patient[];
  appointments: Appointment[];
  treatments: Treatment[];
  loading: boolean;
  error: string | null;
}

export default new Vuex.Store<State>({
  state: {
    user: JSON.parse(localStorage.getItem("user") || "null"),
    token: localStorage.getItem("token"),
    patients: [],
    appointments: [],
    treatments: [],
    loading: false,
    error: null,
  },

  mutations: {
    SET_USER(state, user: User) {
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },

    SET_TOKEN(state, token: string) {
      state.token = token;
      localStorage.setItem("token", token);
    },

    CLEAR_AUTH(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },

    SET_PATIENTS(state, patients: Patient[]) {
      state.patients = patients;
    },

    ADD_PATIENT(state, patient: Patient) {
      state.patients.unshift(patient);
    },

    UPDATE_PATIENT(state, updatedPatient: Patient) {
      const index = state.patients.findIndex((p) => p.id === updatedPatient.id);
      if (index !== -1) {
        Vue.set(state.patients, index, updatedPatient);
      }
    },

    DELETE_PATIENT(state, patientId: number) {
      state.patients = state.patients.filter((p) => p.id !== patientId);
    },

    SET_APPOINTMENTS(state, appointments: Appointment[]) {
      state.appointments = appointments;
    },

    ADD_APPOINTMENT(state, appointment: Appointment) {
      state.appointments.unshift(appointment);
    },

    UPDATE_APPOINTMENT(state, updatedAppointment: Appointment) {
      const index = state.appointments.findIndex(
        (a) => a.id === updatedAppointment.id
      );
      if (index !== -1) {
        Vue.set(state.appointments, index, updatedAppointment);
      }
    },

    DELETE_APPOINTMENT(state, appointmentId: number) {
      state.appointments = state.appointments.filter(
        (a) => a.id !== appointmentId
      );
    },

    // 🔥 TRATAMIENTOS - MUTACIONES CORREGIDAS
    SET_TREATMENTS(state, treatments: Treatment[]) {
      console.log(
        "🔥 SET_TREATMENTS mutation - Before:",
        state.treatments.length
      );
      console.log("🔥 SET_TREATMENTS mutation - New data:", treatments.length);
      console.log(
        "🔥 Treatment data:",
        treatments.map((t) => ({ id: t.id, name: t.nombre, active: t.activo }))
      );
      state.treatments = treatments;
      console.log(
        "🔥 SET_TREATMENTS mutation - After:",
        state.treatments.length
      );
    },

    ADD_TREATMENT(state, treatment: Treatment) {
      console.log("🔥 ADD_TREATMENT mutation:", treatment);
      state.treatments.unshift(treatment);
      console.log("🔥 Treatments after ADD:", state.treatments.length);
    },

    UPDATE_TREATMENT(state, updatedTreatment: Treatment) {
      console.log("🔥 UPDATE_TREATMENT mutation:", updatedTreatment);
      const index = state.treatments.findIndex(
        (t) => t.id === updatedTreatment.id
      );
      if (index !== -1) {
        Vue.set(state.treatments, index, updatedTreatment);
        console.log("🔥 Treatment updated at index:", index);
      } else {
        console.warn("🔥 Treatment not found for update:", updatedTreatment.id);
      }
    },

    DELETE_TREATMENT(state, treatmentId: number) {
      console.log("🔥 DELETE_TREATMENT mutation:", treatmentId);
      const beforeLength = state.treatments.length;
      state.treatments = state.treatments.filter((t) => t.id !== treatmentId);
      console.log(
        "🔥 Treatments after delete:",
        state.treatments.length,
        "was:",
        beforeLength
      );
    },

    SET_LOADING(state, loading: boolean) {
      state.loading = loading;
    },

    SET_ERROR(state, error: string | null) {
      state.error = error;
    },
  },

  actions: {
    async login(
      { commit },
      { email, password }: { email: string; password: string }
    ) {
      try {
        commit("SET_LOADING", true);
        commit("SET_ERROR", null);

        const response = await apiService.login(email, password);

        commit("SET_TOKEN", response.token);
        commit("SET_USER", response.user);

        return response;
      } catch (error: any) {
        const errorMessage = error.response?.data?.error || "Error en el login";
        commit(
          "SET_ERROR",
          Array.isArray(errorMessage) ? errorMessage[0].message : errorMessage
        );
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async register(
      { commit },
      { email, password }: { email: string; password: string }
    ) {
      try {
        commit("SET_LOADING", true);
        commit("SET_ERROR", null);

        const response = await apiService.register(email, password);

        commit("SET_TOKEN", response.token);
        commit("SET_USER", response.user);

        return response;
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.error || "Error en el registro";
        commit(
          "SET_ERROR",
          Array.isArray(errorMessage) ? errorMessage[0].message : errorMessage
        );
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    logout({ commit }) {
      commit("CLEAR_AUTH");
    },

    // Acciones de pacientes
    async fetchPatients({ commit }) {
      try {
        commit("SET_LOADING", true);
        commit("SET_ERROR", null);
        const patients = await apiService.getPatients();
        commit("SET_PATIENTS", patients);
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.error || "Error al cargar pacientes";
        commit("SET_ERROR", errorMessage);
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async createPatient({ commit }, patientData: FormData) {
      try {
        commit("SET_LOADING", true);
        commit("SET_ERROR", null);
        const response = await apiService.createPatient(patientData);
        commit("ADD_PATIENT", response.patient);
        return response;
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.error || "Error al crear paciente";
        commit(
          "SET_ERROR",
          Array.isArray(errorMessage) ? errorMessage[0].message : errorMessage
        );
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async updatePatient(
      { commit },
      { id, patientData }: { id: number; patientData: FormData }
    ) {
      try {
        commit("SET_LOADING", true);
        commit("SET_ERROR", null);
        const response = await apiService.updatePatient(id, patientData);
        commit("UPDATE_PATIENT", response.patient);
        return response;
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.error || "Error al actualizar paciente";
        commit(
          "SET_ERROR",
          Array.isArray(errorMessage) ? errorMessage[0].message : errorMessage
        );
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async deletePatient({ commit }, patientId: number) {
      try {
        commit("SET_ERROR", null);
        await apiService.deletePatient(patientId);
        commit("DELETE_PATIENT", patientId);
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.error || "Error al eliminar paciente";
        commit("SET_ERROR", errorMessage);
        throw error;
      }
    },

    // Acciones de citas
    async fetchAppointments({ commit }, params?: any) {
      try {
        commit("SET_LOADING", true);
        commit("SET_ERROR", null);
        const response = await apiService.getAppointments(params);
        commit("SET_APPOINTMENTS", response.data || response);
        return response;
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.error || "Error al cargar citas";
        commit("SET_ERROR", errorMessage);
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async createAppointment({ commit }, appointmentData: any) {
      try {
        commit("SET_LOADING", true);
        commit("SET_ERROR", null);
        const response = await apiService.createAppointment(appointmentData);
        commit("ADD_APPOINTMENT", response.appointment);
        return response;
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.error || "Error al crear cita";
        commit(
          "SET_ERROR",
          Array.isArray(errorMessage) ? errorMessage[0].message : errorMessage
        );
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async updateAppointment(
      { commit },
      { id, appointmentData }: { id: number; appointmentData: any }
    ) {
      try {
        commit("SET_LOADING", true);
        commit("SET_ERROR", null);
        const response = await apiService.updateAppointment(
          id,
          appointmentData
        );
        commit("UPDATE_APPOINTMENT", response.appointment);
        return response;
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.error || "Error al actualizar cita";
        commit(
          "SET_ERROR",
          Array.isArray(errorMessage) ? errorMessage[0].message : errorMessage
        );
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async deleteAppointment({ commit }, appointmentId: number) {
      try {
        commit("SET_ERROR", null);
        await apiService.deleteAppointment(appointmentId);
        commit("DELETE_APPOINTMENT", appointmentId);
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.error || "Error al eliminar cita";
        commit("SET_ERROR", errorMessage);
        throw error;
      }
    },

    // 🔥 ACCIONES DE TRATAMIENTOS - CORREGIDAS
    async fetchTreatments({ commit }, params?: any) {
      try {
        commit("SET_LOADING", true);
        commit("SET_ERROR", null);
        console.log("🔥 fetchTreatments action called");

        const response = await apiService.getTreatments(params);
        console.log("🔥 API response raw:", response);

        // Manejar diferentes formatos de respuesta
        let treatments;
        if (response.data && Array.isArray(response.data)) {
          treatments = response.data;
          console.log("🔥 Using response.data");
        } else if (Array.isArray(response)) {
          treatments = response;
          console.log("🔥 Using response directly");
        } else {
          console.error("🔥 Unexpected response format:", response);
          treatments = [];
        }

        console.log("🔥 Treatments to commit:", treatments.length);
        commit("SET_TREATMENTS", treatments);
        return response;
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.error || "Error al cargar tratamientos";
        console.error("🔥 fetchTreatments error:", errorMessage);
        commit("SET_ERROR", errorMessage);
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async createTreatment({ commit }, treatmentData: any) {
      try {
        commit("SET_LOADING", true);
        commit("SET_ERROR", null);
        console.log("🔥 createTreatment action:", treatmentData);

        const response = await apiService.createTreatment(treatmentData);
        console.log("🔥 Treatment created response:", response);

        commit("ADD_TREATMENT", response.treatment);
        return response;
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.error || "Error al crear tratamiento";
        console.error("🔥 createTreatment error:", errorMessage);
        commit(
          "SET_ERROR",
          Array.isArray(errorMessage) ? errorMessage[0].message : errorMessage
        );
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async updateTreatment(
      { commit },
      { id, treatmentData }: { id: number; treatmentData: any }
    ) {
      try {
        commit("SET_LOADING", true);
        commit("SET_ERROR", null);
        console.log("🔥 updateTreatment action:", id, treatmentData);

        const response = await apiService.updateTreatment(id, treatmentData);
        console.log("🔥 Treatment updated response:", response);

        commit("UPDATE_TREATMENT", response.treatment);
        return response;
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.error || "Error al actualizar tratamiento";
        console.error("🔥 updateTreatment error:", errorMessage);
        commit(
          "SET_ERROR",
          Array.isArray(errorMessage) ? errorMessage[0].message : errorMessage
        );
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async deleteTreatment({ commit }, treatmentId: number) {
      try {
        commit("SET_ERROR", null);
        console.log("🔥 deleteTreatment action:", treatmentId);

        await apiService.deleteTreatment(treatmentId);
        console.log("🔥 Treatment deleted from API");

        commit("DELETE_TREATMENT", treatmentId);
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.error || "Error al eliminar tratamiento";
        console.error("🔥 deleteTreatment error:", errorMessage);
        commit("SET_ERROR", errorMessage);
        throw error;
      }
    },

    async toggleTreatmentStatus({ commit }, treatmentId: number) {
      try {
        commit("SET_ERROR", null);
        console.log("🔥 toggleTreatmentStatus action:", treatmentId);

        const response = await apiService.toggleTreatmentStatus(treatmentId);
        console.log("🔥 Treatment status toggled response:", response);

        commit("UPDATE_TREATMENT", response.treatment);
        return response;
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.error ||
          "Error al cambiar estado del tratamiento";
        console.error("🔥 toggleTreatmentStatus error:", errorMessage);
        commit("SET_ERROR", errorMessage);
        throw error;
      }
    },
  },

  getters: {
    isAuthenticated: (state) => !!state.token,
    currentUser: (state) => state.user,
    allPatients: (state) => state.patients,
    allAppointments: (state) => state.appointments,

    // 🔥 GETTERS DE TRATAMIENTOS - CORREGIDOS
    allTreatments: (state) => {
      console.log(
        "🔥 allTreatments getter called, state has:",
        state.treatments.length
      );
      return state.treatments;
    },

    isLoading: (state) => state.loading,
    error: (state) => state.error,

    // Getters específicos
    getPatientById: (state) => (id: number) =>
      state.patients.find((patient) => patient.id === id),

    getAppointmentsByPatient: (state) => (patientId: number) =>
      state.appointments.filter(
        (appointment) => appointment.patientId === patientId
      ),

    getTreatmentsByPatient: (state) => (patientId: number) =>
      state.treatments.filter((treatment) => treatment.patientId === patientId),

    activeTreatments: (state) => {
      const active = state.treatments.filter((treatment) => treatment.activo);
      console.log(
        "🔥 activeTreatments getter:",
        active.length,
        "of",
        state.treatments.length
      );
      return active;
    },

    todayAppointments: (state) => {
      const today = new Date().toISOString().split("T")[0];
      return state.appointments.filter(
        (appointment) =>
          appointment.fecha.startsWith(today) &&
          appointment.estatus === "PENDIENTE"
      );
    },
  },
});
