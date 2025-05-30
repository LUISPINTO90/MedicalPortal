import { Response } from "express";
import prisma from "../utils/prisma";
import {
  createTreatmentSchema,
  updateTreatmentSchema,
  treatmentQuerySchema,
} from "../schemas/treatmentSchemas";
import { AuthRequest } from "../middleware/auth";

export const getAllTreatments = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.userId!;
    const query = treatmentQuerySchema.parse(req.query);

    const where: any = {
      userId, // 🔥 FILTRAR POR USUARIO AUTENTICADO
    };

    if (query.patientId) {
      // Verificar que el paciente pertenezca al usuario
      const patient = await prisma.patient.findFirst({
        where: { id: query.patientId, userId },
      });
      if (!patient) {
        res.status(404).json({ error: "Paciente no encontrado" });
        return;
      }
      where.patientId = query.patientId;
    }

    if (query.activo !== undefined) {
      where.activo = query.activo;
    }

    const treatments = await prisma.treatment.findMany({
      where,
      include: {
        patient: {
          select: {
            id: true,
            nombre: true,
            apellidos: true,
            telefono: true,
            email: true,
          },
        },
      },
      orderBy: [{ activo: "desc" }, { fechaInicio: "desc" }],
    });

    const total = treatments.length;

    console.log(`📊 User ${userId} has ${total} treatments`);

    res.json({
      data: treatments,
      total,
    });
  } catch (error: any) {
    if (error.name === "ZodError") {
      res.status(400).json({ error: error.errors });
      return;
    }
    console.error("Error al obtener tratamientos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getTreatmentById = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.userId!;

    const treatment = await prisma.treatment.findFirst({
      where: {
        id: parseInt(id),
        userId,
      },
      include: {
        patient: {
          select: {
            id: true,
            nombre: true,
            apellidos: true,
            telefono: true,
            email: true,
            edad: true,
            sexo: true,
            tipoSangre: true,
          },
        },
      },
    });

    if (!treatment) {
      res.status(404).json({ error: "Tratamiento no encontrado" });
      return;
    }

    res.json(treatment);
  } catch (error) {
    console.error("Error al obtener tratamiento:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const createTreatment = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.userId!;

    const validatedData = createTreatmentSchema.parse({
      ...req.body,
      patientId: parseInt(req.body.patientId),
    });

    // Verificar que el paciente existe Y pertenece al usuario
    const patient = await prisma.patient.findFirst({
      where: {
        id: validatedData.patientId,
        userId,
      },
    });

    if (!patient) {
      res.status(404).json({ error: "Paciente no encontrado" });
      return;
    }

    const treatment = await prisma.treatment.create({
      data: {
        ...validatedData,
        fechaInicio: new Date(validatedData.fechaInicio),
        userId, // 🔥 ASOCIAR AL USUARIO AUTENTICADO
      },
      include: {
        patient: {
          select: {
            id: true,
            nombre: true,
            apellidos: true,
            telefono: true,
            email: true,
          },
        },
      },
    });

    console.log(`✅ Treatment created for user ${userId}:`, treatment.id);

    res.status(201).json({
      message: "Tratamiento creado exitosamente",
      treatment,
    });
  } catch (error: any) {
    if (error.name === "ZodError") {
      res.status(400).json({ error: error.errors });
      return;
    }
    console.error("Error al crear tratamiento:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const updateTreatment = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.userId!;

    const validatedData = updateTreatmentSchema.parse({
      ...req.body,
      id: parseInt(id),
      patientId: req.body.patientId ? parseInt(req.body.patientId) : undefined,
    });

    // Verificar que el tratamiento existe Y pertenece al usuario
    const existingTreatment = await prisma.treatment.findFirst({
      where: {
        id: parseInt(id),
        userId,
      },
    });

    if (!existingTreatment) {
      res.status(404).json({ error: "Tratamiento no encontrado" });
      return;
    }

    // Verificar que el paciente existe y pertenece al usuario si se está actualizando
    if (
      validatedData.patientId &&
      validatedData.patientId !== existingTreatment.patientId
    ) {
      const patient = await prisma.patient.findFirst({
        where: {
          id: validatedData.patientId,
          userId,
        },
      });

      if (!patient) {
        res.status(404).json({ error: "Paciente no encontrado" });
        return;
      }
    }

    const { id: treatmentId, ...updateData } = validatedData;

    const updatedTreatment = await prisma.treatment.update({
      where: { id: parseInt(id) },
      data: {
        ...updateData,
        fechaInicio: updateData.fechaInicio
          ? new Date(updateData.fechaInicio)
          : undefined,
        // No actualizar userId - debe mantenerse el original
      },
      include: {
        patient: {
          select: {
            id: true,
            nombre: true,
            apellidos: true,
            telefono: true,
            email: true,
          },
        },
      },
    });

    console.log(
      `✅ Treatment updated for user ${userId}:`,
      updatedTreatment.id
    );

    res.json({
      message: "Tratamiento actualizado exitosamente",
      treatment: updatedTreatment,
    });
  } catch (error: any) {
    if (error.name === "ZodError") {
      res.status(400).json({ error: error.errors });
      return;
    }
    console.error("Error al actualizar tratamiento:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const deleteTreatment = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.userId!;

    const existingTreatment = await prisma.treatment.findFirst({
      where: {
        id: parseInt(id),
        userId,
      },
    });

    if (!existingTreatment) {
      res.status(404).json({ error: "Tratamiento no encontrado" });
      return;
    }

    await prisma.treatment.delete({
      where: { id: parseInt(id) },
    });

    console.log(`✅ Treatment deleted for user ${userId}:`, id);

    res.json({ message: "Tratamiento eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar tratamiento:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getTreatmentsByPatient = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { patientId } = req.params;
    const userId = req.userId!;

    // Verificar que el paciente pertenece al usuario
    const patient = await prisma.patient.findFirst({
      where: {
        id: parseInt(patientId),
        userId,
      },
    });

    if (!patient) {
      res.status(404).json({ error: "Paciente no encontrado" });
      return;
    }

    const treatments = await prisma.treatment.findMany({
      where: {
        patientId: parseInt(patientId),
        userId,
      },
      orderBy: [{ activo: "desc" }, { fechaInicio: "desc" }],
    });

    res.json(treatments);
  } catch (error) {
    console.error("Error al obtener tratamientos del paciente:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const toggleTreatmentStatus = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.userId!;

    const existingTreatment = await prisma.treatment.findFirst({
      where: {
        id: parseInt(id),
        userId,
      },
    });

    if (!existingTreatment) {
      res.status(404).json({ error: "Tratamiento no encontrado" });
      return;
    }

    const updatedTreatment = await prisma.treatment.update({
      where: { id: parseInt(id) },
      data: { activo: !existingTreatment.activo },
      include: {
        patient: {
          select: {
            id: true,
            nombre: true,
            apellidos: true,
            telefono: true,
            email: true,
          },
        },
      },
    });

    console.log(
      `✅ Treatment status toggled for user ${userId}:`,
      updatedTreatment.id,
      "now:",
      updatedTreatment.activo
    );

    res.json({
      message: `Tratamiento ${
        updatedTreatment.activo ? "activado" : "inactivado"
      } exitosamente`,
      treatment: updatedTreatment,
    });
  } catch (error) {
    console.error("Error al cambiar estado del tratamiento:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
