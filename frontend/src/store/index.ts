import Vue from "vue";
import Vuex from "vuex";
import apiService from "@/services/api";
import { User, Patient } from "@/types";

Vue.use(Vuex);

interface State {
  user: User | null;
  token: string | null;
  patients: Patient[];
  loading: boolean;
  error: string | null;
}

export default new Vuex.Store<State>({
  state: {
    user: JSON.parse(localStorage.getItem("user") || "null"),
    token: localStorage.getItem("token"),
    patients: [],
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
  },

  getters: {
    isAuthenticated: (state) => !!state.token,
    currentUser: (state) => state.user,
    allPatients: (state) => state.patients,
    isLoading: (state) => state.loading,
    error: (state) => state.error,
  },
});
