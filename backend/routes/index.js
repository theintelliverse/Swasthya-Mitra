/**
 * ROUTE AGGREGATOR
 *
 * PURPOSE:
 * Central router that mounts all feature-specific
 * route modules under their respective base paths.
 */

const router = require("express").Router();

/**
 * IMPORT ROUTES
 */
const authRoutes = require("./auth.routes");
const clinicRoutes = require("./clinic.routes");
const userRoutes = require("./user.routes");
const queueRoutes = require("./queue.routes");
const clinicUserRoutes = require("./clinicUser.routes");
const appointmentRoutes = require("./appointment.routes");
const doctorRoutes = require("./doctor.routes");
const patientRoutes = require("./patient.routes");
const adminRoutes = require("./admin.routes");
const notificationRoutes = require("./notification.routes");
const queueDisplayRoutes = require("./queueDisplay.routes");
const aiRoutes = require("./ai.routes");

router.use("/auth", authRoutes);
router.use("/clinics", clinicRoutes);
router.use("/users", userRoutes);
router.use("/queue", queueRoutes);
// Note: /clinics is used twice (for clinic mgmt and clinic users). 
// Express allows this. Ensure paths don't conflict or usually we mount clinic users under /clinics/:id/users
// But based on previous code, it was mounted on /clinics. Let's keep it.
router.use("/clinics", clinicUserRoutes);
router.use("/appointments", appointmentRoutes);
router.use("/doctor", doctorRoutes);
router.use("/patient", patientRoutes);
router.use("/admin", adminRoutes);
router.use("/notifications", notificationRoutes);
router.use("/queue-display", queueDisplayRoutes);
router.use("/ai", aiRoutes);

module.exports = router;
