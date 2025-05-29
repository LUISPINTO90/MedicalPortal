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

// Configuración de Multer para subida de archivos PDF
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "patient-" + uniqueSuffix + path.extname(file.originalname));
  },
});

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
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB límite
});

// Aplicar middleware de autenticación a todas las rutas
router.use(authenticateToken);

router.get("/", getAllPatients);
router.get("/:id", getPatientById);
router.post("/", upload.single("pdf"), createPatient);
router.put("/:id", upload.single("pdf"), updatePatient);
router.delete("/:id", deletePatient);

export default router;
