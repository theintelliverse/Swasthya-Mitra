/**
 * ROUTE FILE: doctor.routes.js
 *
 * PURPOSE:
 * Handles doctor-facing and clinic-related endpoints
 * such as appointments, queue view, summary metrics,
 * and recent patient access.
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
 * MIDDLEWARE:
 * clinicRole.middleware.js
 *
 * Ensures the user has required clinic-level role.
 */
const { requireClinicRole } = require("../middlewares/clinicRole.middleware");

/**
 * CONTROLLER:
 * doctor.controller.js
 *
 * Contains doctor-related business logic.
 */
const doctor = require("../controllers/doctor.controller");

/**
 * =====================================================
 * ROUTE #6.1
 * =====================================================
 */

/**
 * GET /today-appointments
 *
 * PURPOSE:
 * Fetch today's appointments for the authenticated doctor.
 *
 * AUTH:
 * Required
 *
 * QUERY PARAMS:
 * - clinicId (string)
 *
 * RESPONSE:
 * 200 → list of today's appointments
 */
router.get("/today-appointments", auth, doctor.todayAppointments);

/**
 * =====================================================
 * ROUTE #6.2
 * =====================================================
 */

/**
 * GET /today-queue
 *
 * PURPOSE:
 * Fetch today's active queue for a clinic.
 *
 * AUTH:
 * Required
 *
 * ROLES:
 * doctor, admin, staff
 *
 * QUERY PARAMS:
 * - clinicId (string)
 *
 * RESPONSE:
 * 200 → current queue data
 */
router.get(
  "/today-queue",
  auth,
  requireClinicRole(["doctor", "admin", "staff"]),
  doctor.todayQueue
);

/**
 * =====================================================
 * ROUTE #6.3
 * =====================================================
 */

/**
 * GET /summary
 *
 * PURPOSE:
 * Fetch summary metrics for a doctor or clinic.
 *
 * AUTH:
 * Required
 *
 * ROLES:
 * doctor, admin
 *
 * QUERY PARAMS:
 * - clinicId (string)
 *
 * RESPONSE:
 * 200 → summary statistics
 */
router.get(
  "/summary",
  auth,
  requireClinicRole(["doctor", "admin"]),
  doctor.summary
);

/**
 * =====================================================
 * ROUTE #6.4
 * =====================================================
 */

/**
 * GET /patients
 *
 * PURPOSE:
 * Fetch recent patients associated with the doctor.
 *
 * AUTH:
 * Required
 *
 * ROLES:
 * doctor, admin, staff
 *
 * QUERY PARAMS:
 * - clinicId (string)
 *
 * RESPONSE:
 * 200 → patient list
 */
router.get(
  "/patients",
  auth,
  requireClinicRole(["doctor", "admin", "staff"]),
  doctor.patients
);

module.exports = router;
