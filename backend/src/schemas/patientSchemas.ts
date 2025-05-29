import { z } from "zod";

export const createPatientSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  apellidos: z.string().min(1, "Los apellidos son requeridos"),
  edad: z
    .number()
    .min(0, "La edad debe ser mayor a 0")
    .max(120, "Edad inválida"),
  curp: z.string().length(18, "El CURP debe tener 18 caracteres"),
  telefono: z.string().min(10, "El teléfono debe tener al menos 10 caracteres"),
  direccion: z.string().min(1, "La dirección es requerida"),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  tipoSangre: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
  sexo: z.enum(["M", "F"]),
  observaciones: z.string().optional(),
});

export const updatePatientSchema = createPatientSchema.partial().extend({
  id: z.number(),
});

export type CreatePatientData = z.infer<typeof createPatientSchema>;
export type UpdatePatientData = z.infer<typeof updatePatientSchema>;
