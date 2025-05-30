import { Router } from "express";
import { authenticateToken } from "../middleware/auth";
import {
  getAllTreatments,
  getTreatmentById,
  createTreatment,
  updateTreatment,
  deleteTreatment,
  getTreatmentsByPatient,
  toggleTreatmentStatus,
} from "../controllers/treatmentController";

const router = Router();

// Aplicar middleware de autenticación a todas las rutas
router.use(authenticateToken);

router.get("/", getAllTreatments);
router.get("/:id", getTreatmentById);
router.post("/", createTreatment);
router.put("/:id", updateTreatment);
router.delete("/:id", deleteTreatment);
router.get("/patient/:patientId", getTreatmentsByPatient);
router.patch("/:id/toggle-status", toggleTreatmentStatus);

export default router;
