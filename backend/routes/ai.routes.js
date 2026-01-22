/**
 * ROUTE FILE: ai.routes.js
 *
 * PURPOSE:
 * Exposes backend endpoint to fetch AI-based
 * wait-time prediction by communicating with
 * the external Python AI microservice.
 */

const express = require("express");
const router = express.Router();

/**
 * CONTROLLER:
 * ai.controller.js
 *
 * Handles forwarding request data to the
 * Python AI service and returning predictions.
 */
const aiController = require("../controllers/ai.controller");

/**
 * =====================================================
 * ROUTE #11.1
 * =====================================================
 */

/**
 * POST /predict-wait-time
 *
 * PURPOSE:
 * Predict estimated patient wait time using AI model.
 *
 * AUTH:
 * Not enforced at route level
 * (can be added if required by system policy)
 *
 * BODY:
 * {
 *   "doctor_id": string,
 *   "doctor_type": string,
 *   "visit_type": string,
 *   "day": string,
 *   "time": string,
 *   "clinic_type": string,
 *   "age": number,
 *   "gender": string,
 *   "token_no": number,
 *   "problem": string,
 *   "emergency": string
 * }
 *
 * RESPONSE (200):
 * {
 *   "estimated_wait_time": number
 * }
 *
 * RESPONSE (500):
 * {
 *   "error": "AI service unavailable"
 * }
 */
router.post("/predict-wait-time", aiController.predictWaitTime);

module.exports = router;
