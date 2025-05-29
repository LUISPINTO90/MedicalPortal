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
  pdfPath?: string;
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
