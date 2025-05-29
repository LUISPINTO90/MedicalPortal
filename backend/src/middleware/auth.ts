import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  userId?: number;
}

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Token de acceso requerido" });
    return;
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    (err: any, decoded: any) => {
      if (err) {
        res.status(403).json({ error: "Token inválido" });
        return;
      }
      req.userId = decoded.userId;
      next();
    }
  );
};
