import { Response } from "express";
import prisma from "../utils/prisma";
import {
  createPatientSchema,
  updatePatientSchema,
} from "../schemas/patientSchemas";
import { AuthRequest } from "../middleware/auth";

export const getAllPatients = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const patients = await prisma.patient.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(patients);
  } catch (error) {
    console.error("Error al obtener pacientes:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getPatientById = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const patient = await prisma.patient.findUnique({
      where: { id: parseInt(id) },
    });

    if (!patient) {
      res.status(404).json({ error: "Paciente no encontrado" });
      return;
    }

    res.json(patient);
  } catch (error) {
    console.error("Error al obtener paciente:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const createPatient = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const validatedData = createPatientSchema.parse({
      ...req.body,
      edad: parseInt(req.body.edad),
    });

    // Verificar si el CURP ya existe
    const existingPatient = await prisma.patient.findUnique({
      where: { curp: validatedData.curp },
    });

    if (existingPatient) {
      res.status(400).json({ error: "Ya existe un paciente con este CURP" });
      return;
    }

    // Procesar archivo PDF si existe
    let pdfPath = null;
    if (req.file) {
      pdfPath = req.file.path;
    }

    const patient = await prisma.patient.create({
      data: {
        ...validatedData,
        email: validatedData.email || null,
        pdfPath,
      },
    });

    res.status(201).json({
      message: "Paciente creado exitosamente",
      patient,
    });
  } catch (error: any) {
    if (error.name === "ZodError") {
      res.status(400).json({ error: error.errors });
      return;
    }
    console.error("Error al crear paciente:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const updatePatient = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const validatedData = updatePatientSchema.parse({
      ...req.body,
      id: parseInt(id),
      edad: req.body.edad ? parseInt(req.body.edad) : undefined,
    });

    // Verificar si el paciente existe
    const existingPatient = await prisma.patient.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingPatient) {
      res.status(404).json({ error: "Paciente no encontrado" });
      return;
    }

    // Verificar CURP duplicado si se está actualizando
    if (validatedData.curp && validatedData.curp !== existingPatient.curp) {
      const duplicateCurp = await prisma.patient.findUnique({
        where: { curp: validatedData.curp },
      });

      if (duplicateCurp) {
        res.status(400).json({ error: "Ya existe un paciente con este CURP" });
        return;
      }
    }

    // Procesar archivo PDF si existe
    let pdfPath = existingPatient.pdfPath;
    if (req.file) {
      pdfPath = req.file.path;
    }

    const { id: patientId, ...updateData } = validatedData;

    const updatedPatient = await prisma.patient.update({
      where: { id: parseInt(id) },
      data: {
        ...updateData,
        email: updateData.email || null,
        pdfPath,
      },
    });

    res.json({
      message: "Paciente actualizado exitosamente",
      patient: updatedPatient,
    });
  } catch (error: any) {
    if (error.name === "ZodError") {
      res.status(400).json({ error: error.errors });
      return;
    }
    console.error("Error al actualizar paciente:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const deletePatient = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const existingPatient = await prisma.patient.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingPatient) {
      res.status(404).json({ error: "Paciente no encontrado" });
      return;
    }

    await prisma.patient.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Paciente eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar paciente:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
