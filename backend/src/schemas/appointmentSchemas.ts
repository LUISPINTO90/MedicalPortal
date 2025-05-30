import { z } from "zod";

export const createAppointmentSchema = z.object({
  fecha: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Fecha inválida",
  }),
  hora: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Hora debe estar en formato HH:MM",
  }),
  motivo: z.string().min(1, "El motivo es requerido"),
  notas: z.string().optional(),
  estatus: z.enum(["PENDIENTE", "REALIZADA", "CANCELADA"]).default("PENDIENTE"),
  patientId: z.number().int().positive("ID del paciente debe ser válido"),
});

export const updateAppointmentSchema = createAppointmentSchema
  .partial()
  .extend({
    id: z.number().int().positive(),
  });

export const appointmentQuerySchema = z.object({
  patientId: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : undefined)),
  estatus: z.enum(["PENDIENTE", "REALIZADA", "CANCELADA"]).optional(),
  fecha: z.string().optional(),
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : 1)),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : 10)),
});

export type CreateAppointmentData = z.infer<typeof createAppointmentSchema>;
export type UpdateAppointmentData = z.infer<typeof updateAppointmentSchema>;
export type AppointmentQueryData = z.infer<typeof appointmentQuerySchema>;
