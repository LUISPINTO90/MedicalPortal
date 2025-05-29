import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../utils/prisma";
import { loginSchema, registerSchema } from "../schemas/authSchemas";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = registerSchema.parse(req.body);

    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      res.status(400).json({ error: "El usuario ya existe" });
      return;
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    // Crear el usuario
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
      },
    });

    // Generar token JWT
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "24h" }
    );

    res.status(201).json({
      message: "Usuario registrado exitosamente",
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error: any) {
    if (error.name === "ZodError") {
      res.status(400).json({ error: error.errors });
      return;
    }
    console.error("Error en registro:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = loginSchema.parse(req.body);

    // Buscar el usuario
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (!user) {
      res.status(400).json({ error: "Credenciales inválidas" });
      return;
    }

    // Verificar la contraseña
    const isValidPassword = await bcrypt.compare(
      validatedData.password,
      user.password
    );

    if (!isValidPassword) {
      res.status(400).json({ error: "Credenciales inválidas" });
      return;
    }

    // Generar token JWT
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "24h" }
    );

    res.json({
      message: "Login exitoso",
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error: any) {
    if (error.name === "ZodError") {
      res.status(400).json({ error: error.errors });
      return;
    }
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
