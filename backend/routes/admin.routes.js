// routes/admin.routes.js
const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const { requireClinicRole } = require("../middlewares/clinicRole.middleware");
const admin = require("../controllers/admin.controller");

// Clinic analytics (admin/owner)
router.get("/clinics/:clinicId/analytics", auth, requireClinicRole(["admin"]), admin.clinicAnalytics);

// Clinic appointments
router.get("/clinics/:clinicId/appointments", auth, requireClinicRole(["admin","staff"]), admin.clinicAppointments);

// Clinic staff list
router.get("/clinics/:clinicId/staff", auth, requireClinicRole(["admin","owner"]), admin.clinicStaff);

module.exports = router;
