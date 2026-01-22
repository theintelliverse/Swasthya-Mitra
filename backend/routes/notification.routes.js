/**
 * ROUTE FILE: notification.routes.js
 *
 * PURPOSE:
 * Handles notification management including
 * sending, manual dispatch, and retrieval.
 * Access is restricted to clinic staff and admins.
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
 * notification.controller.js
 *
 * Contains notification scheduling,
 * dispatch, and retrieval logic.
 */
const notif = require("../controllers/notification.controller");

/**
 * MIDDLEWARE:
 * clinicRole.middleware.js
 *
 * Ensures user has required clinic-level role.
 */
const { requireClinicRole } = require("../middlewares/clinicRole.middleware");

/**
 * =====================================================
 * ROUTE #5.1
 * =====================================================
 */

/**
 * POST /send
 *
 * PURPOSE:
 * Create and send (or schedule) a notification.
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
 *   "to": string,
 *   "channel": string,
 *   "template": string,
 *   "payload": object,
 *   "scheduledAt": string | null
 * }
 *
 * RESPONSE:
 * 200 → notification created / scheduled
 * 400 → validation error
 */
router.post(
  "/send",
  auth,
  requireClinicRole(["admin", "staff"]),
  notif.send
);

/**
 * =====================================================
 * ROUTE #5.2
 * =====================================================
 */

/**
 * POST /dispatch/:id
 *
 * PURPOSE:
 * Manually dispatch a previously created notification.
 *
 * AUTH:
 * Required
 *
 * ROLES:
 * admin, staff
 *
 * PARAMS:
 * - id (string) → notification ID
 *
 * RESPONSE:
 * 200 → dispatch result
 * 404 → notification not found
 */
router.post(
  "/dispatch/:id",
  auth,
  requireClinicRole(["admin", "staff"]),
  notif.dispatchNow
);

/**
 * =====================================================
 * ROUTE #5.3
 * =====================================================
 */

/**
 * GET /:id
 *
 * PURPOSE:
 * Fetch a notification by ID.
 *
 * AUTH:
 * Required
 *
 * ROLES:
 * admin, staff
 *
 * PARAMS:
 * - id (string) → notification ID
 *
 * RESPONSE:
 * 200 → notification data
 * 404 → not found
 */
router.get(
  "/:id",
  auth,
  requireClinicRole(["admin", "staff"]),
  notif.get
);

module.exports = router;
