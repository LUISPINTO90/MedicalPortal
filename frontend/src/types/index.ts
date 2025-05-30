export interface User {
  id: number;
  email: string;
}

export interface Patient {
  id: number;
  nombre: string;
  apellidos: string;
  edad: number;
  curp: string;
  telefono: string;
  direccion: string;
  email?: string;
  tipoSangre: string;
  sexo: string;
  observaciones?: string;
  pdfPath?: string; // Mantener por compatibilidad
  pdfData?: string; // PDF en base64
  pdfName?: string; // Nombre original del archivo
  createdAt: string;
  updatedAt: string;
}

export interface Appointment {
  id: number;
  fecha: string;
  hora: string;
  motivo: string;
  notas?: string;
  estatus: "PENDIENTE" | "REALIZADA" | "CANCELADA";
  patientId: number;
  patient?: {
    id: number;
    nombre: string;
    apellidos: string;
    telefono: string;
    email?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Treatment {
  id: number;
  nombre: string;
  descripcion: string;
  fechaInicio: string;
  duracion: string;
  observaciones?: string;
  activo: boolean;
  patientId: number;
  patient?: {
    id: number;
    nombre: string;
    apellidos: string;
    telefono: string;
    email?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface PatientForm {
  nombre: string;
  apellidos: string;
  edad: number;
  curp: string;
  telefono: string;
  direccion: string;
  email?: string;
  tipoSangre: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  sexo: "M" | "F";
  observaciones?: string;
  pdf?: File;
}

export interface AppointmentForm {
  fecha: string;
  hora: string;
  motivo: string;
  notas?: string;
  estatus: "PENDIENTE" | "REALIZADA" | "CANCELADA";
  patientId: number;
}

export interface TreatmentForm {
  nombre: string;
  descripcion: string;
  fechaInicio: string;
  duracion: string;
  observaciones?: string;
  activo: boolean;
  patientId: number;
}

export interface ApiResponse<T = any> {
  message: string;
  data?: T;
  error?: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
