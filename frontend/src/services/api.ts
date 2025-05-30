import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.VUE_APP_API_URL || "http://localhost:3001/api",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Interceptor para agregar token automáticamente
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem("token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Interceptor para manejar errores de autenticación
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    );
  }

  // Métodos de autenticación
  async login(email: string, password: string) {
    const response = await this.api.post("/auth/login", { email, password });
    return response.data;
  }

  async register(email: string, password: string) {
    const response = await this.api.post("/auth/register", { email, password });
    return response.data;
  }

  // Métodos de pacientes
  async getPatients() {
    const response = await this.api.get("/patients");
    return response.data;
  }

  async getPatient(id: number) {
    const response = await this.api.get(`/patients/${id}`);
    return response.data;
  }

  async createPatient(patientData: FormData) {
    const response = await this.api.post("/patients", patientData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }

  async updatePatient(id: number, patientData: FormData) {
    const response = await this.api.put(`/patients/${id}`, patientData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }

  async deletePatient(id: number) {
    const response = await this.api.delete(`/patients/${id}`);
    return response.data;
  }

  // Métodos de citas
  async getAppointments(params?: any) {
    const response = await this.api.get("/appointments", { params });
    return response.data;
  }

  async getAppointment(id: number) {
    const response = await this.api.get(`/appointments/${id}`);
    return response.data;
  }

  async createAppointment(appointmentData: any) {
    const response = await this.api.post("/appointments", appointmentData);
    return response.data;
  }

  async updateAppointment(id: number, appointmentData: any) {
    const response = await this.api.put(`/appointments/${id}`, appointmentData);
    return response.data;
  }

  async deleteAppointment(id: number) {
    const response = await this.api.delete(`/appointments/${id}`);
    return response.data;
  }

  async getAppointmentsByPatient(patientId: number) {
    const response = await this.api.get(`/appointments/patient/${patientId}`);
    return response.data;
  }

  // Métodos de tratamientos
  async getTreatments(params?: any) {
    const response = await this.api.get("/treatments", { params });
    return response.data;
  }

  async getTreatment(id: number) {
    const response = await this.api.get(`/treatments/${id}`);
    return response.data;
  }

  async createTreatment(treatmentData: any) {
    const response = await this.api.post("/treatments", treatmentData);
    return response.data;
  }

  async updateTreatment(id: number, treatmentData: any) {
    const response = await this.api.put(`/treatments/${id}`, treatmentData);
    return response.data;
  }

  async deleteTreatment(id: number) {
    const response = await this.api.delete(`/treatments/${id}`);
    return response.data;
  }

  async getTreatmentsByPatient(patientId: number) {
    const response = await this.api.get(`/treatments/patient/${patientId}`);
    return response.data;
  }

  async toggleTreatmentStatus(id: number) {
    const response = await this.api.patch(`/treatments/${id}/toggle-status`);
    return response.data;
  }

  // Método genérico
  async request(config: AxiosRequestConfig) {
    const response = await this.api.request(config);
    return response.data;
  }
}

export default new ApiService();
