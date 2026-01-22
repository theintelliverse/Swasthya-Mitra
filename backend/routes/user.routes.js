/**
 * ROUTE FILE: user.routes.js
 *
 * PURPOSE:
 * This route file handles user-related endpoints.
 * Currently, it exposes an endpoint to fetch
 * the details of the currently logged-in user.
 */

const router = require("express").Router();

/**
 * CONTROLLER:
 * user.controller.js
 * Contains the business logic for user-related operations
 */
const user = require("../controllers/user.controller");

/**
 * MIDDLEWARE:
 * auth.middleware.js
 *
 * PURPOSE:
 * - Verifies authentication token (JWT or similar)
 * - Extracts user identity from token
 * - Attaches authenticated user data to `req.user`
 * - Blocks request if token is missing or invalid
 */
const auth = require("../middlewares/auth.middleware");

/**
 * =====================================================
 * ROUTE #1
 * =====================================================
 */

/**
 * GET /me
 *
 * PURPOSE:
 * - Fetch details of the currently authenticated user
 * - Used for:
 *   • Profile page
 *   • Dashboard initialization
 *   • Session validation on frontend refresh
 *
 * AUTH:
 * - REQUIRED
 * - Uses `auth` middleware
 *
 * REQUEST:
 * - Headers:
 *   Authorization: Bearer <JWT_TOKEN>
 *
 * - Params:
 *   None
 *
 * - Body:
 *   None
 *
 * INTERNAL FLOW:
 * 1. `auth` middleware verifies token
 * 2. `auth` middleware attaches user info to `req.user`
 * 3. `user.me` controller reads `req.user`
 * 4. User data is fetched and returned
 *
 * RESPONSE (200 - Success):
 * {
 *   "_id": "user_id",
 *   "name": "John Doe",
 *   "email": "john@example.com",
 *   "role": "doctor",
 *   "clinicId": "clinic_id",
 *   ...
 * }
 *
 * RESPONSE (401 - Unauthorized):
 * {
 *   "error": "Unauthorized"
 * }
 *
 * RESPONSE (500 - Server Error):
 * {
 *   "error": "Server error"
 * }
 */
router.get("/me", auth, user.me);

/**
 * Export router to be used in app.js
 */
module.exports = router;
