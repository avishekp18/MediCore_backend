import express from "express";
import {
  deleteAppointment,
  getAllAppointments,
  postAppointment,
  updateAppointmentStatus,
  getUserAppointments,
  dltAppointment,
} from "../controller/appointmentController.js";
import { authenticate, isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

// Create appointment (Patient only)
router.post("/", authenticate("Patient", "patientToken"), postAppointment);

// Get all appointments (Admin only)
router.get("/", authenticate("Admin", "adminToken"), getAllAppointments);

// Update appointment status (Admin only)
router.put(
  "/:id",
  authenticate("Admin", "adminToken"),
  updateAppointmentStatus
);

router.get(
  "/user/:id",
  authenticate("Patient", "patientToken"),
  getUserAppointments
);
router.delete(
  "/user/:id",
  authenticate("Patient", "patientToken"),
  dltAppointment
);

// Delete appointment (Admin only)
router.delete("/:id", authenticate("Admin", "adminToken"), deleteAppointment);

export default router;
