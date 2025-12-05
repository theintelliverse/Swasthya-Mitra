// routes/patient.routes.js
const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const patient = require("../controllers/patient.controller");

// Book appointment (patient)
router.post("/book", auth, patient.book);

// My appointments
router.get("/appointments", auth, patient.myAppointments);

// Queue status
router.get("/queue-status", auth, patient.queueStatus);

module.exports = router;
