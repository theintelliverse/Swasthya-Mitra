/**
 * ROUTE FILE: queueDisplay.routes.js
 *
 * PURPOSE:
 * This route file exposes endpoints related to
 * displaying live queue information.
 *
 * These routes are typically consumed by:
 * - TV / monitor displays in clinics
 * - Reception dashboards
 * - Public queue screens
 */

const router = require("express").Router();

/**
 * CONTROLLER:
 * queueDisplay.controller.js
 *
 * PURPOSE:
 * Contains logic to fetch and format
 * queue data in a display-friendly manner.
 * This usually excludes sensitive information.
 */
const controller = require("../controllers/queueDisplay.controller");

/**
 * =====================================================
 * ROUTE #2
 * =====================================================
 */

/**
 * GET /
 *
 * PURPOSE:
 * - Fetch the current live queue for display purposes
 * - Used for:
 *   • Clinic TV display
 *   • Public queue boards
 *   • Reception monitoring screens
 *
 * AUTH:
 * - NOT REQUIRED (usually public within clinic)
 * - Can be protected at network / deployment level if needed
 *
 * REQUEST:
 * - Query Params (optional, based on controller logic):
 *   • clinicId (string)   → filter by clinic
 *   • doctorId (string)   → filter by doctor
 *
 * - URL Params:
 *   None
 *
 * - Body:
 *   None
 *
 * INTERNAL FLOW:
 * 1. Request hits this route
 * 2. `queueDisplay.controller.getDisplay` is executed
 * 3. Controller:
 *    • Fetches active queue entries
 *    • Sorts by token / priority
 *    • Formats minimal fields for display
 *
 * RESPONSE (200 - Success):
 * {
 *   "clinicName": "ABC Clinic",
 *   "doctor": "Dr. Sharma",
 *   "currentToken": 12,
 *   "nextTokens": [13, 14, 15],
 *   "lastUpdated": "2026-01-21T10:30:00Z"
 * }
 *
 * RESPONSE (404 - No Active Queue):
 * {
 *   "message": "No active queue"
 * }
 *
 * RESPONSE (500 - Server Error):
 * {
 *   "error": "Server error"
 * }
 */
router.get("/", controller.getDisplay);

/**
 * Export router to be registered in app.js
 */
module.exports = router;
