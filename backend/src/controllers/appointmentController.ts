import { Response } from "express";
import prisma from "../utils/prisma";
import {
  createAppointmentSchema,
  updateAppointmentSchema,
  appointmentQuerySchema,
} from "../schemas/appointmentSchemas";
import { AuthRequest } from "../middleware/auth";

export const getAllAppointments = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.userId!;
    const query = appointmentQuerySchema.parse(req.query);

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

    if (query.estatus) {
      where.estatus = query.estatus;
    }

    if (query.fecha) {
      const startDate = new Date(query.fecha);
      const endDate = new Date(query.fecha);
      endDate.setDate(endDate.getDate() + 1);

      where.fecha = {
        gte: startDate,
        lt: endDate,
      };
    }

    const appointments = await prisma.appointment.findMany({
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
      orderBy: [{ fecha: "asc" }, { hora: "asc" }],
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    });

    const total = await prisma.appointment.count({ where });

    console.log(`📊 User ${userId} has ${total} appointments`);

    res.json({
      data: appointments,
      pagination: {
        page: query.page,
        limit: query.limit,
        total,
        totalPages: Math.ceil(total / query.limit),
      },
    });
  } catch (error: any) {
    if (error.name === "ZodError") {
      res.status(400).json({ error: error.errors });
      return;
    }
    console.error("Error al obtener citas:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getAppointmentById = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.userId!;

    const appointment = await prisma.appointment.findFirst({
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
          },
        },
      },
    });

    if (!appointment) {
      res.status(404).json({ error: "Cita no encontrada" });
      return;
    }

    res.json(appointment);
  } catch (error) {
    console.error("Error al obtener cita:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const createAppointment = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.userId!;

    const validatedData = createAppointmentSchema.parse({
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

    // Verificar que no haya conflicto de horario PARA ESTE USUARIO
    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        userId, // Solo verificar conflictos para este usuario
        fecha: new Date(validatedData.fecha),
        hora: validatedData.hora,
        estatus: {
          not: "CANCELADA",
        },
      },
    });

    if (existingAppointment) {
      res.status(400).json({
        error: "Ya tienes una cita programada para esta fecha y hora",
      });
      return;
    }

    const appointment = await prisma.appointment.create({
      data: {
        ...validatedData,
        fecha: new Date(validatedData.fecha),
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

    console.log(`✅ Appointment created for user ${userId}:`, appointment.id);

    res.status(201).json({
      message: "Cita creada exitosamente",
      appointment,
    });
  } catch (error: any) {
    if (error.name === "ZodError") {
      res.status(400).json({ error: error.errors });
      return;
    }
    console.error("Error al crear cita:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const updateAppointment = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.userId!;

    const validatedData = updateAppointmentSchema.parse({
      ...req.body,
      id: parseInt(id),
      patientId: req.body.patientId ? parseInt(req.body.patientId) : undefined,
    });

    // Verificar que la cita existe Y pertenece al usuario
    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        id: parseInt(id),
        userId,
      },
    });

    if (!existingAppointment) {
      res.status(404).json({ error: "Cita no encontrada" });
      return;
    }

    // Si se está actualizando fecha/hora, verificar conflictos PARA ESTE USUARIO
    if (validatedData.fecha || validatedData.hora) {
      const checkDate = validatedData.fecha
        ? new Date(validatedData.fecha)
        : existingAppointment.fecha;
      const checkHora = validatedData.hora || existingAppointment.hora;

      const conflictingAppointment = await prisma.appointment.findFirst({
        where: {
          userId, // Solo verificar conflictos para este usuario
          id: { not: parseInt(id) },
          fecha: checkDate,
          hora: checkHora,
          estatus: { not: "CANCELADA" },
        },
      });

      if (conflictingAppointment) {
        res.status(400).json({
          error: "Ya tienes una cita programada para esta fecha y hora",
        });
        return;
      }
    }

    const { id: appointmentId, ...updateData } = validatedData;

    const updatedAppointment = await prisma.appointment.update({
      where: { id: parseInt(id) },
      data: {
        ...updateData,
        fecha: updateData.fecha ? new Date(updateData.fecha) : undefined,
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
      `✅ Appointment updated for user ${userId}:`,
      updatedAppointment.id
    );

    res.json({
      message: "Cita actualizada exitosamente",
      appointment: updatedAppointment,
    });
  } catch (error: any) {
    if (error.name === "ZodError") {
      res.status(400).json({ error: error.errors });
      return;
    }
    console.error("Error al actualizar cita:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const deleteAppointment = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.userId!;

    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        id: parseInt(id),
        userId,
      },
    });

    if (!existingAppointment) {
      res.status(404).json({ error: "Cita no encontrada" });
      return;
    }

    await prisma.appointment.delete({
      where: { id: parseInt(id) },
    });

    console.log(`✅ Appointment deleted for user ${userId}:`, id);

    res.json({ message: "Cita eliminada exitosamente" });
  } catch (error) {
    console.error("Error al eliminar cita:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getAppointmentsByPatient = async (
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

    const appointments = await prisma.appointment.findMany({
      where: {
        patientId: parseInt(patientId),
        userId,
      },
      orderBy: [{ fecha: "desc" }, { hora: "desc" }],
    });

    res.json(appointments);
  } catch (error) {
    console.error("Error al obtener citas del paciente:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
