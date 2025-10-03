import express from "express";
import { authenticate } from "../middlewares/auth.js";
import {
  addNewAdmin,
  addNewDoctor,
  getAllDoctors,
  getUserDetails,
  logout,
  login,
  patientRegister,
  deleteDoc,
  editDoc,
} from "../controller/userController.js";

const router = express.Router();

/**
 * =========================
 * LOGIN & REGISTRATION
 * =========================
 */
router.post("/login", login);
router.post("/patient/register", patientRegister);

/**
 * =========================
 * USER INFO
 * =========================
 */
// Admin info
router.get("/admin/me", authenticate("Admin", "adminToken"), getUserDetails);

// Patient info
router.get(
  "/patient/me",
  authenticate("Patient", "patientToken"),
  getUserDetails
);

/**
 * =========================
 * ADMIN ROUTES
 * =========================
 */
router.post("/admin/addnew", authenticate("Admin", "adminToken"), addNewAdmin);
router.post(
  "/doctor/addnew",
  authenticate("Admin", "adminToken"),
  addNewDoctor
);
router.get("/doctors", authenticate("Admin", "adminToken"), getAllDoctors);

router.delete("/admin/:id", authenticate("Admin", "adminToken", deleteDoc));
router.put("/admin/:id", authenticate("Admin", "adminToken", editDoc));

/**
 * =========================
 * PATIENT ROUTES
 * =========================
 */
router.get("/doctor", authenticate("Patient", "patientToken"), getAllDoctors);

/**
 * =========================
 * LOGOUT ROUTES
 * =========================
 */
router.get("/admin/logout", authenticate("Admin", "adminToken"), logout);
router.get("/patient/logout", authenticate("Patient", "patientToken"), logout);

export default router;
