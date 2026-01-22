/**
 * ROUTE FILE: admin.routes.js
 *
 * PURPOSE:
 * Handles admin-level clinic operations such as
 * analytics, appointment oversight, and staff listing.
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
 * Enforces clinic-level role access.
 */
const { requireClinicRole } = require("../middlewares/clinicRole.middleware");

/**
 * CONTROLLER:
 * admin.controller.js
 *
 * Contains admin-level business logic.
 */
const admin = require("../controllers/admin.controller");

/**
 * =====================================================
 * ROUTE #12.1
 * =====================================================
 */

/**
 * GET /clinics/:clinicId/analytics
 *
 * PURPOSE:
 * Fetch analytics and performance metrics for a clinic.
 *
 * AUTH:
 * Required
 *
 * ROLES:
 * admin
 *
 * PARAMS:
 * - clinicId (string)
 *
 * RESPONSE:
 * 200 → clinic analytics data
 */
router.get(
  "/clinics/:clinicId/analytics",
  auth,
  requireClinicRole(["admin"]),
  admin.clinicAnalytics
);

/**
 * =====================================================
 * ROUTE #12.2
 * =====================================================
 */

/**
 * GET /clinics/:clinicId/appointments
 *
 * PURPOSE:
 * Fetch all appointments associated with a clinic.
 *
 * AUTH:
 * Required
 *
 * ROLES:
 * admin, staff
 *
 * PARAMS:
 * - clinicId (string)
 *
 * RESPONSE:
 * 200 → list of clinic appointments
 */
router.get(
  "/clinics/:clinicId/appointments",
  auth,
  requireClinicRole(["admin", "staff"]),
  admin.clinicAppointments
);

/**
 * =====================================================
 * ROUTE #12.3
 * =====================================================
 */

/**
 * GET /clinics/:clinicId/staff
 *
 * PURPOSE:
 * Fetch list of staff members associated with a clinic.
 *
 * AUTH:
 * Required
 *
 * ROLES:
 * admin, owner
 *
 * PARAMS:
 * - clinicId (string)
 *
 * RESPONSE:
 * 200 → list of clinic staff
 */
router.get(
  "/clinics/:clinicId/staff",
  auth,
  requireClinicRole(["admin", "owner"]),
  admin.clinicStaff
);

module.exports = router;
