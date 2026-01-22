/**
 * ROUTE AGGREGATOR
 *
 * PURPOSE:
 * Central router that mounts all feature-specific
 * route modules under their respective base paths.
 */

const router = require("express").Router();

/**
 * AUTH ROUTES
 * Handles OTP, registration, and login.
 */
router.use("/auth", require("./auth.routes"));

/**
 * CLINIC ROUTES
 * Handles clinic creation, retrieval, update, and deletion.
 */
router.use("/clinics", require("./clinic.routes"));

/**
 * USER ROUTES
 * Handles user profile and logged-in user operations.
 */
router.use("/users", require("./user.routes"));

/**
 * QUEUE ROUTES
 * Handles queue operations like add, next, skip, recall, complete.
 */
router.use("/queue", require("./queue.routes"));

/**
 * CLINIC USER ROUTES
 * Handles clinic membership and role management.
 */
router.use("/clinics", require("./clinicUser.routes"));

/**
 * APPOINTMENT ROUTES
 * Handles appointment lifecycle and check-in flow.
 */
router.use("/appointments", require("./appointment.routes"));

/**
 * DOCTOR ROUTES
 * Handles doctor dashboards, queues, and patient views.
 */
router.use("/doctor", require("./doctor.routes"));

/**
 * PATIENT ROUTES
 * Handles patient bookings, appointments, and queue status.
 */
router.use("/patient", require("./patient.routes"));

/**
 * ADMIN ROUTES
 * Handles clinic-level analytics and administrative views.
 */
router.use("/admin", require("./admin.routes"));

/**
 * NOTIFICATION ROUTES
 * Handles notification creation, dispatch, and retrieval.
 */
router.use("/notifications", require("./notification.routes"));

/**
 * QUEUE DISPLAY ROUTES
 * Provides display-safe queue data for screens/TVs.
 */
router.use("/queue-display", require("./queueDisplay.routes"));

/**
 * AI ROUTES
 * Integrates with AI service for wait-time prediction.
 */
router.use("/ai", require("./ai.routes"));

module.exports = router;
