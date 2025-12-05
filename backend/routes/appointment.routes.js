// routes/appointment.routes.js
const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const appt = require("../controllers/appointment.controller");
const { requireClinicRole } = require("../middlewares/clinicRole.middleware");

// Public (authenticated) actions
router.post("/", auth, appt.create); // patient or staff create
router.get("/:appointmentId", auth, appt.get);
router.get("/", auth, appt.list);

// Staff/clinic protected actions (use requireClinicRole when appropriate)
router.put("/:appointmentId/reschedule", auth, requireClinicRole(["admin","staff","doctor"]), appt.reschedule);
router.post("/:appointmentId/cancel", auth, requireClinicRole(["admin","staff","doctor","patient"]), appt.cancel);

// Check-in (staff or front desk) OR walk-in checkin (staff)
router.post("/checkin", auth, requireClinicRole(["admin","staff"]), appt.checkIn);

// Mark complete / no-show (doctor or staff)
router.post("/:appointmentId/complete", auth, requireClinicRole(["doctor","admin","staff"]), appt.complete);
router.post("/:appointmentId/no-show", auth, requireClinicRole(["admin","staff"]), appt.markNoShow);

module.exports = router;
