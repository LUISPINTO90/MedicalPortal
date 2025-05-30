import { Router } from "express";
import { authenticateToken } from "../middleware/auth";
import {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentsByPatient,
} from "../controllers/appointmentController";

const router = Router();

// Aplicar middleware de autenticación a todas las rutas
router.use(authenticateToken);

router.get("/", getAllAppointments);
router.get("/:id", getAppointmentById);
router.post("/", createAppointment);
router.put("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);
router.get("/patient/:patientId", getAppointmentsByPatient);

export default router;
