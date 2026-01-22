/**
 * ROUTE FILE: auth.routes.js
 *
 * PURPOSE:
 * Handles authentication and onboarding flows
 * including OTP-based verification, registration,
 * and login.
 */

const router = require("express").Router();

/**
 * CONTROLLER:
 * auth.controller.js
 *
 * Contains authentication logic such as
 * OTP handling, user registration, and login.
 */
const auth = require("../controllers/auth.controller");

/**
 * =====================================================
 * ROUTE #9.1
 * =====================================================
 */

/**
 * POST /send-otp
 *
 * PURPOSE:
 * Send OTP to a user for authentication or registration.
 *
 * AUTH:
 * Not required
 *
 * BODY:
 * {
 *   "phone": string
 * }
 *
 * RESPONSE:
 * 200 → OTP sent
 * 400 → invalid phone
 */
router.post("/send-otp", auth.sendOtp);

/**
 * =====================================================
 * ROUTE #9.2
 * =====================================================
 */

/**
 * POST /verify-otp
 *
 * PURPOSE:
 * Verify OTP sent to the user.
 *
 * AUTH:
 * Not required
 *
 * BODY:
 * {
 *   "phone": string,
 *   "otp": string
 * }
 *
 * RESPONSE:
 * 200 → OTP verified
 * 400 → invalid / expired OTP
 */
router.post("/verify-otp", auth.verifyOtp);

/**
 * =====================================================
 * ROUTE #9.3
 * =====================================================
 */

/**
 * POST /register
 *
 * PURPOSE:
 * Register a new user after successful OTP verification.
 *
 * AUTH:
 * Not required
 *
 * BODY:
 * {
 *   "name": string,
 *   "phone": string,
 *   "role": string
 * }
 *
 * RESPONSE:
 * 201 → user registered
 * 400 → validation error
 */
router.post("/register", auth.register);

/**
 * =====================================================
 * ROUTE #9.4
 * =====================================================
 */

/**
 * POST /login
 *
 * PURPOSE:
 * Authenticate user and issue access token.
 *
 * AUTH:
 * Not required
 *
 * BODY:
 * {
 *   "phone": string,
 *   "otp": string
 * }
 *
 * RESPONSE:
 * 200 → login successful, token issued
 * 401 → authentication failed
 */
router.post("/login", auth.login);

module.exports = router;
