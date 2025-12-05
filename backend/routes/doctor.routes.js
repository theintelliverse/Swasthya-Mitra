// routes/doctor.routes.js
const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const { requireClinicRole } = require("../middlewares/clinicRole.middleware");
const doctor = require("../controllers/doctor.controller");

// Today's appointments (doctor must be member of clinic to view clinic-specific)
router.get("/today-appointments", auth, doctor.todayAppointments);

// Today's queue for a clinic (requires clinicId and membership)
router.get("/today-queue", auth, requireClinicRole(["doctor","admin","staff"]), doctor.todayQueue);

// Summary metrics
router.get("/summary", auth, requireClinicRole(["doctor","admin"]), doctor.summary);

// Recent patients
router.get("/patients", auth, requireClinicRole(["doctor","admin","staff"]), doctor.patients);

module.exports = router;
