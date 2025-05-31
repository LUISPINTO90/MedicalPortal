import { Router } from "express";
import multer from "multer";
import path from "path";
import { authenticateToken } from "../middleware/auth";
import {
  getAllPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
} from "../controllers/patientController";

const router = Router();

// ✅ CONFIGURAR MULTER PARA USAR MEMORIA (no archivos)
const storage = multer.memoryStorage(); // ←← CAMBIO IMPORTANTE

const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Solo se permiten archivos PDF"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB máximo
  },
});

// Aplicar middleware de autenticación a todas las rutas
router.use(authenticateToken);

// Rutas
router.get("/", getAllPatients);
router.get("/:id", getPatientById);
router.post("/", upload.single("pdf"), createPatient);
router.put("/:id", upload.single("pdf"), updatePatient);
router.delete("/:id", deletePatient);

export default router;
