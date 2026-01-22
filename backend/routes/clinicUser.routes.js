/**
 * ROUTE FILE: clinicUser.routes.js
 *
 * PURPOSE:
 * Manages user membership within a clinic,
 * including adding, listing, updating, and removing users.
 * All routes are clinic-scoped.
 */

const router = require("express").Router({ mergeParams: true });

/**
 * CONTROLLER:
 * clinicUser.controller.js
 *
 * Contains logic for managing clinic-user relationships.
 */
const userCtrl = require("../controllers/clinicUser.controller");

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
 * Ensures user has required clinic-level role.
 */
const { requireClinicRole } = require("../middlewares/clinicRole.middleware");

/**
 * =====================================================
 * ROUTE #7.1
 * =====================================================
 */

/**
 * POST /:clinicId/users
 *
 * PURPOSE:
 * Add a new user to a clinic or update existing membership.
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
 *   "userId": string,
 *   "role": string
 * }
 *
 * RESPONSE:
 * 200 → user added/updated
 */
router.post(
  "/:clinicId/users",
  auth,
  requireClinicRole(["admin"]),
  userCtrl.addUser
);

/**
 * =====================================================
 * ROUTE #7.2
 * =====================================================
 */

/**
 * GET /:clinicId/users
 *
 * PURPOSE:
 * List all users associated with a clinic.
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
 * 200 → list of clinic users
 */
router.get(
  "/:clinicId/users",
  auth,
  requireClinicRole(["admin", "staff"]),
  userCtrl.listUsers
);

/**
 * =====================================================
 * ROUTE #7.3
 * =====================================================
 */

/**
 * PUT /:clinicId/users/:clinicUserId
 *
 * PURPOSE:
 * Update role or details of a clinic user.
 *
 * AUTH:
 * Required
 *
 * ROLES:
 * admin
 *
 * PARAMS:
 * - clinicId (string)
 * - clinicUserId (string)
 *
 * BODY:
 * {
 *   "role": string
 * }
 *
 * RESPONSE:
 * 200 → membership updated
 */
router.put(
  "/:clinicId/users/:clinicUserId",
  auth,
  requireClinicRole(["admin"]),
  userCtrl.updateUser
);

/**
 * =====================================================
 * ROUTE #7.4
 * =====================================================
 */

/**
 * DELETE /:clinicId/users/:clinicUserId
 *
 * PURPOSE:
 * Remove a user from a clinic.
 *
 * AUTH:
 * Required
 *
 * ROLES:
 * admin
 *
 * PARAMS:
 * - clinicId (string)
 * - clinicUserId (string)
 *
 * RESPONSE:
 * 200 → user removed
 */
router.delete(
  "/:clinicId/users/:clinicUserId",
  auth,
  requireClinicRole(["admin"]),
  userCtrl.removeUser
);

module.exports = router;
