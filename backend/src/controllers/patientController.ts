import { Response } from "express";
import prisma from "../utils/prisma";
import {
  createPatientSchema,
  updatePatientSchema,
} from "../schemas/patientSchemas";
import { AuthRequest } from "../middleware/auth";
import fs from "fs";

export const getAllPatients = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    // 🔥 FILTRAR POR USUARIO AUTENTICADO
    const userId = req.userId!;

    const patients = await prisma.patient.findMany({
      where: { userId }, // Solo pacientes del usuario autenticado
      orderBy: { createdAt: "desc" },
    });

    console.log(`📊 User ${userId} has ${patients.length} patients`);
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
    const userId = req.userId!;

    const patient = await prisma.patient.findFirst({
      where: {
        id: parseInt(id),
        userId, // Solo si pertenece al usuario autenticado
      },
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
    const userId = req.userId!;

    const validatedData = createPatientSchema.parse({
      ...req.body,
      edad: parseInt(req.body.edad),
    });

    // Verificar si el CURP ya existe PARA ESTE USUARIO
    const existingPatient = await prisma.patient.findFirst({
      where: {
        curp: validatedData.curp,
        userId, // Solo verificar duplicados dentro del mismo usuario
      },
    });

    if (existingPatient) {
      res
        .status(400)
        .json({ error: "Ya tienes un paciente registrado con este CURP" });
      return;
    }

    // Procesar archivo PDF si existe
    let pdfData = null;
    let pdfName = null;
    if (req.file) {
      // Leer el archivo y convertirlo a base64
      const fileBuffer = fs.readFileSync(req.file.path);
      pdfData = fileBuffer.toString("base64");
      pdfName = req.file.originalname;

      // Eliminar el archivo temporal del disco
      fs.unlinkSync(req.file.path);
    }

    const patient = await prisma.patient.create({
      data: {
        ...validatedData,
        email: validatedData.email || null,
        pdfData,
        pdfName,
        userId, // 🔥 ASOCIAR AL USUARIO AUTENTICADO
      },
    });

    console.log(`✅ Patient created for user ${userId}:`, patient.id);

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
    const userId = req.userId!;

    const validatedData = updatePatientSchema.parse({
      ...req.body,
      id: parseInt(id),
      edad: req.body.edad ? parseInt(req.body.edad) : undefined,
    });

    // Verificar si el paciente existe Y pertenece al usuario
    const existingPatient = await prisma.patient.findFirst({
      where: {
        id: parseInt(id),
        userId,
      },
    });

    if (!existingPatient) {
      res.status(404).json({ error: "Paciente no encontrado" });
      return;
    }

    // Verificar CURP duplicado si se está actualizando (solo para este usuario)
    if (validatedData.curp && validatedData.curp !== existingPatient.curp) {
      const duplicateCurp = await prisma.patient.findFirst({
        where: {
          curp: validatedData.curp,
          userId,
          id: { not: parseInt(id) }, // Excluir el paciente actual
        },
      });

      if (duplicateCurp) {
        res
          .status(400)
          .json({ error: "Ya tienes un paciente registrado con este CURP" });
        return;
      }
    }

    // Procesar archivo PDF si existe
    let pdfData = existingPatient.pdfData;
    let pdfName = existingPatient.pdfName;
    if (req.file) {
      // Leer el archivo y convertirlo a base64
      const fileBuffer = fs.readFileSync(req.file.path);
      pdfData = fileBuffer.toString("base64");
      pdfName = req.file.originalname;

      // Eliminar el archivo temporal del disco
      fs.unlinkSync(req.file.path);
    }

    const { id: patientId, ...updateData } = validatedData;

    const updatedPatient = await prisma.patient.update({
      where: { id: parseInt(id) },
      data: {
        ...updateData,
        email: updateData.email || null,
        pdfData,
        pdfName,
        // No actualizar userId - debe mantenerse el original
      },
    });

    console.log(`✅ Patient updated for user ${userId}:`, updatedPatient.id);

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
    const userId = req.userId!;

    const existingPatient = await prisma.patient.findFirst({
      where: {
        id: parseInt(id),
        userId,
      },
    });

    if (!existingPatient) {
      res.status(404).json({ error: "Paciente no encontrado" });
      return;
    }

    await prisma.patient.delete({
      where: { id: parseInt(id) },
    });

    console.log(`✅ Patient deleted for user ${userId}:`, id);

    res.json({ message: "Paciente eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar paciente:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
