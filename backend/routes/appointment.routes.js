/**
 * ROUTE FILE: appointment.routes.js
 *
 * PURPOSE:
 * Handles appointment lifecycle including creation,
 * retrieval, rescheduling, cancellation, check-in,
 * completion, and no-show marking.
 */

const router = require("express").Router();

/**
 * MIDDLEWARE:
 * auth.middleware.js
 *
 * Ensures request is authenticated.
 */
const auth = require("../middlewares/auth.middleware");

/**
 * CONTROLLER:
 * appointment.controller.js
 *
 * Contains appointment-related business logic.
 */
const appt = require("../controllers/appointment.controller");

/**
 * MIDDLEWARE:
 * clinicRole.middleware.js
 *
 * Enforces clinic-level role access.
 */
const { requireClinicRole } = require("../middlewares/clinicRole.middleware");

/**
 * =====================================================
 * ROUTE #10.1
 * =====================================================
 */

/**
 * POST /
 *
 * PURPOSE:
 * Create a new appointment.
 *
 * AUTH:
 * Required
 *
 * ROLES:
 * patient, staff
 *
 * BODY:
 * {
 *   "clinicId": string,
 *   "doctorId": string,
 *   "date": string,
 *   "time": string
 * }
 *
 * RESPONSE:
 * 201 → appointment created
 */
router.post("/", auth, appt.create);

/**
 * =====================================================
 * ROUTE #10.2
 * =====================================================
 */

/**
 * GET /:appointmentId
 *
 * PURPOSE:
 * Fetch details of a single appointment.
 *
 * AUTH:
 * Required
 *
 * PARAMS:
 * - appointmentId (string)
 *
 * RESPONSE:
 * 200 → appointment details
 * 404 → not found
 */
router.get("/:appointmentId", auth, appt.get);

/**
 * =====================================================
 * ROUTE #10.3
 * =====================================================
 */

/**
 * GET /
 *
 * PURPOSE:
 * List appointments for the authenticated user.
 *
 * AUTH:
 * Required
 *
 * QUERY PARAMS:
 * Optional (date, clinicId, doctorId)
 *
 * RESPONSE:
 * 200 → list of appointments
 */
router.get("/", auth, appt.list);

/**
 * =====================================================
 * ROUTE #10.4
 * =====================================================
 */

/**
 * PUT /:appointmentId/reschedule
 *
 * PURPOSE:
 * Reschedule an existing appointment.
 *
 * AUTH:
 * Required
 *
 * ROLES:
 * admin, staff, doctor
 *
 * PARAMS:
 * - appointmentId (string)
 *
 * BODY:
 * {
 *   "date": string,
 *   "time": string
 * }
 *
 * RESPONSE:
 * 200 → appointment rescheduled
 */
router.put(
  "/:appointmentId/reschedule",
  auth,
  requireClinicRole(["admin", "staff", "doctor"]),
  appt.reschedule
);

/**
 * =====================================================
 * ROUTE #10.5
 * =====================================================
 */

/**
 * POST /:appointmentId/cancel
 *
 * PURPOSE:
 * Cancel an appointment.
 *
 * AUTH:
 * Required
 *
 * ROLES:
 * admin, staff, doctor, patient
 *
 * PARAMS:
 * - appointmentId (string)
 *
 * RESPONSE:
 * 200 → appointment cancelled
 */
router.post(
  "/:appointmentId/cancel",
  auth,
  requireClinicRole(["admin", "staff", "doctor", "patient"]),
  appt.cancel
);

/**
 * =====================================================
 * ROUTE #10.6
 * =====================================================
 */

/**
 * POST /checkin
 *
 * PURPOSE:
 * Check-in a patient for an appointment or walk-in.
 *
 * AUTH:
 * Required
 *
 * ROLES:
 * admin, staff
 *
 * BODY:
 * {
 *   "clinicId": string,
 *   "appointmentId": string (optional),
 *   "patientId": string (for walk-in)
 * }
 *
 * RESPONSE:
 * 200 → patient checked in
 */
router.post(
  "/checkin",
  auth,
  requireClinicRole(["admin", "staff"]),
  appt.checkIn
);

/**
 * =====================================================
 * ROUTE #10.7
 * =====================================================
 */

/**
 * POST /:appointmentId/complete
 *
 * PURPOSE:
 * Mark an appointment as completed.
 *
 * AUTH:
 * Required
 *
 * ROLES:
 * doctor, admin, staff
 *
 * PARAMS:
 * - appointmentId (string)
 *
 * RESPONSE:
 * 200 → appointment completed
 */
router.post(
  "/:appointmentId/complete",
  auth,
  requireClinicRole(["doctor", "admin", "staff"]),
  appt.complete
);

/**
 * =====================================================
 * ROUTE #10.8
 * =====================================================
 */

/**
 * POST /:appointmentId/no-show
 *
 * PURPOSE:
 * Mark an appointment as no-show.
 *
 * AUTH:
 * Required
 *
 * ROLES:
 * admin, staff
 *
 * PARAMS:
 * - appointmentId (string)
 *
 * RESPONSE:
 * 200 → appointment marked no-show
 */
router.post(
  "/:appointmentId/no-show",
  auth,
  requireClinicRole(["admin", "staff"]),
  appt.markNoShow
);

module.exports = router;
