/**
 * ROUTE FILE: clinic.routes.js
 *
 * PURPOSE:
 * Handles clinic-level lifecycle operations such as
 * creation, retrieval, update, and deletion of clinics.
 */

const router = require("express").Router();

/**
 * CONTROLLER:
 * clinic.controller.js
 *
 * Contains business logic for clinic management.
 */
const clinicCtrl = require("../controllers/clinic.controller");

/**
 * MIDDLEWARE:
 * clinicRole.middleware.js
 *
 * Enforces clinic-level roles and permissions.
 */
const {
  requireClinicRole,
  requireClinicPermission
} = require("../middlewares/clinicRole.middleware");

/**
 * MIDDLEWARE:
 * auth.middleware.js
 *
 * Ensures request is authenticated.
 */
const auth = require("../middlewares/auth.middleware");

/**
 * =====================================================
 * ROUTE #8.1
 * =====================================================
 */

/**
 * POST /
 *
 * PURPOSE:
 * Create a new clinic and associate the creator as admin.
 *
 * AUTH:
 * Required
 *
 * BODY:
 * {
 *   "name": string,
 *   "address": string,
 *   "type": string
 * }
 *
 * RESPONSE:
 * 201 → clinic created
 */
router.post("/", auth, clinicCtrl.createClinic);

/**
 * =====================================================
 * ROUTE #8.2
 * =====================================================
 */

/**
 * GET /my-clinics
 *
 * PURPOSE:
 * Fetch all clinics associated with the authenticated user.
 *
 * AUTH:
 * Required
 *
 * RESPONSE:
 * 200 → list of clinics
 */
router.get("/my-clinics", auth, clinicCtrl.getMyClinics);

/**
/**
 * GET /all
 * Fetch all clinics
 */
router.get("/all", auth, clinicCtrl.getAllClinics);

/**
 * =====================================================
 * ROUTE #8.3
 * =====================================================
 */

/**
 * GET /:clinicId
 *
 * PURPOSE:
 * Fetch details of a single clinic.
 *
 * AUTH:
 * Required
 *
 * PARAMS:
 * - clinicId (string)
 *
 * RESPONSE:
 * 200 → clinic details
 * 404 → clinic not found
 */
router.get("/:clinicId", auth, clinicCtrl.getClinic);

/**
 * GET /:clinicId/doctors
 * Fetch doctors of a clinic
 */
router.get("/:clinicId/doctors", auth, clinicCtrl.getClinicDoctors);

/**
 * =====================================================
 * ROUTE #8.4
 * =====================================================
 */

/**
 * PUT /:clinicId
 *
 * PURPOSE:
 * Update clinic details.
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
 * BODY:
 * {
 *   "name": string,
 *   "address": string,
 *   "type": string
 * }
 *
 * RESPONSE:
 * 200 → clinic updated
 */
router.put(
  "/:clinicId",
  auth,
  requireClinicRole(["admin"]),
  clinicCtrl.updateClinic
);

/**
 * =====================================================
 * ROUTE #8.5
 * =====================================================
 */

/**
 * DELETE /:clinicId
 *
 * PURPOSE:
 * Delete a clinic.
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
 * 200 → clinic deleted
 */
router.delete(
  "/:clinicId",
  auth,
  requireClinicRole(["admin"]),
  clinicCtrl.deleteClinic
);

module.exports = router;
