/**
 * ROUTE FILE: queue.routes.js
 *
 * PURPOSE:
 * Handles all queue-related operations for doctors/staff,
 * including token creation, status checks, and queue flow control.
 */

const router = require("express").Router();

/**
 * MIDDLEWARE:
 * auth.middleware.js
 *
 * Ensures request is authenticated.
 * Attaches authenticated user info to req.user.
 */
const auth = require("../middlewares/auth.middleware");

/**
 * CONTROLLER:
 * queue.controller.js
 *
 * Contains business logic for queue manipulation.
 */
const queue = require("../controllers/queue.controller");

/**
 * =====================================================
 * ROUTE #3.1
 * =====================================================
 */

/**
 * POST /add
 *
 * PURPOSE:
 * Add a patient to the queue and generate a token.
 *
 * AUTH:
 * Required
 *
 * BODY:
 * {
 *   "clinicId": string,
 *   "doctorId": string,
 *   "patientId": string
 * }
 *
 * RESPONSE:
 * 201 → token created
 * 400 → invalid input
 */
router.post("/add", auth, queue.addToQueue);

/**
 * =====================================================
 * ROUTE #3.2
 * =====================================================
 */

/**
 * GET /status
 *
 * PURPOSE:
 * Fetch current queue status for a doctor/clinic.
 *
 * AUTH:
 * Required
 *
 * QUERY PARAMS:
 * - clinicId (string)
 * - doctorId (string)
 *
 * RESPONSE:
 * 200 → queue state
 */
router.get("/status", auth, queue.getStatus);

/**
 * =====================================================
 * ROUTE #3.3
 * =====================================================
 */

/**
 * POST /next
 *
 * PURPOSE:
 * Move queue to the next token.
 * Marks current token as completed.
 *
 * AUTH:
 * Required
 *
 * BODY:
 * {
 *   "clinicId": string,
 *   "doctorId": string
 * }
 *
 * RESPONSE:
 * 200 → next token activated
 */
router.post("/next", auth, queue.moveNext);

/**
 * =====================================================
 * ROUTE #3.4
 * =====================================================
 */

/**
 * POST /skip
 *
 * PURPOSE:
 * Skip the current token without completing it.
 *
 * AUTH:
 * Required
 *
 * BODY:
 * {
 *   "tokenId": string
 * }
 *
 * RESPONSE:
 * 200 → token skipped
 */
router.post("/skip", auth, queue.skip);

/**
 * =====================================================
 * ROUTE #3.5
 * =====================================================
 */

/**
 * POST /recall
 *
 * PURPOSE:
 * Recall a previously skipped token.
 *
 * AUTH:
 * Required
 *
 * BODY:
 * {
 *   "tokenId": string
 * }
 *
 * RESPONSE:
 * 200 → token recalled
 */
router.post("/recall", auth, queue.recall);

/**
 * =====================================================
 * ROUTE #3.6
 * =====================================================
 */

/**
 * POST /complete
 *
 * PURPOSE:
 * Mark current token as completed.
 *
 * AUTH:
 * Required
 *
 * BODY:
 * {
 *   "tokenId": string
 * }
 *
 * RESPONSE:
 * 200 → token completed
 */
router.post("/complete", auth, queue.complete);

module.exports = router;
