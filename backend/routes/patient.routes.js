/**
 * ROUTE FILE: patient.routes.js
 *
 * PURPOSE:
 * Handles patient-facing operations such as
 * appointment booking, viewing appointments,
 * and checking queue status.
 */

const router = require("express").Router();

/**
 * MIDDLEWARE:
 * auth.middleware.js
 *
 * Ensures the request is authenticated
 * and identifies the patient user.
 */
const auth = require("../middlewares/auth.middleware");

/**
 * CONTROLLER:
 * patient.controller.js
 *
 * Contains patient-specific business logic.
 */
const patient = require("../controllers/patient.controller");

/**
 * =====================================================
 * ROUTE #4.1
 * =====================================================
 */

/**
 * POST /book
 *
 * PURPOSE:
 * Book an appointment for the authenticated patient.
 *
 * AUTH:
 * Required
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
 * 201 → appointment booked
 * 400 → validation error
 */
router.post("/book", auth, patient.book);

/**
 * =====================================================
 * ROUTE #4.2
 * =====================================================
 */

/**
 * GET /appointments
 *
 * PURPOSE:
 * Fetch all appointments of the authenticated patient.
 *
 * AUTH:
 * Required
 *
 * QUERY PARAMS:
 * None
 *
 * RESPONSE:
 * 200 → list of appointments
 */
router.get("/appointments", auth, patient.myAppointments);

/**
 * =====================================================
 * ROUTE #4.3
 * =====================================================
 */

/**
 * GET /queue-status
 *
 * PURPOSE:
 * Fetch current queue status of the authenticated patient.
 *
 * AUTH:
 * Required
 *
 * QUERY PARAMS:
 * - clinicId (string)
 * - doctorId (string)
 *
 * RESPONSE:
 * 200 → queue position and token info
 */
router.get("/queue-status", auth, patient.queueStatus);

module.exports = router;
