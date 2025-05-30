import { z } from "zod";

export const createTreatmentSchema = z.object({
  nombre: z.string().min(1, "El nombre del tratamiento es requerido"),
  descripcion: z.string().min(1, "La descripción es requerida"),
  fechaInicio: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Fecha de inicio inválida",
  }),
  duracion: z.string().min(1, "La duración es requerida"),
  observaciones: z.string().optional(),
  activo: z.boolean().default(true),
  patientId: z.number().int().positive("ID del paciente debe ser válido"),
});

export const updateTreatmentSchema = createTreatmentSchema.partial().extend({
  id: z.number().int().positive(),
});

// 🔥 SCHEMA DE QUERY SIMPLIFICADO Y MÁS PERMISIVO
export const treatmentQuerySchema = z
  .object({
    patientId: z
      .string()
      .optional()
      .transform((val) => {
        if (!val) return undefined;
        const parsed = parseInt(val);
        return isNaN(parsed) ? undefined : parsed;
      }),
    activo: z
      .string()
      .optional()
      .transform((val) => {
        if (!val || val === "") return undefined;
        if (val === "true") return true;
        if (val === "false") return false;
        return undefined;
      }),
    page: z
      .string()
      .optional()
      .transform((val) => {
        if (!val) return 1;
        const parsed = parseInt(val);
        return isNaN(parsed) ? 1 : Math.max(1, parsed);
      }),
    limit: z
      .string()
      .optional()
      .transform((val) => {
        if (!val) return 50; // 🔥 LÍMITE MÁS ALTO POR DEFECTO
        const parsed = parseInt(val);
        return isNaN(parsed) ? 50 : Math.min(100, Math.max(1, parsed));
      }),
  })
  .transform((data) => {
    console.log("🔥 treatmentQuerySchema input:", data);
    console.log("🔥 treatmentQuerySchema output:", {
      patientId: data.patientId,
      activo: data.activo,
      page: data.page,
      limit: data.limit,
    });
    return data;
  });

export type CreateTreatmentData = z.infer<typeof createTreatmentSchema>;
export type UpdateTreatmentData = z.infer<typeof updateTreatmentSchema>;
export type TreatmentQueryData = z.infer<typeof treatmentQuerySchema>;
