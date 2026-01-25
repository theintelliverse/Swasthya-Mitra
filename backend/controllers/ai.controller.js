const axios = require('axios');

/**
 * POST /api/ai/predict
 * Body: {
 *   emergency: "yes"|"no",
 *   doctor_id: string,
 *   doctor_type: string,
 *   visit_type: "new"|"followup",
 *   day: string,
 *   time: "HH:MM",
 *   clinic_type: string,
 *   age: number,
 *   gender: string,
 *   token_no: number,
 *   problem: string
 * }
 */
exports.predictWaitTime = async (req, res) => {
    try {
        // Forward to Python Service
        const pythonServiceUrl = 'http://localhost:8000/predict';

        const response = await axios.post(pythonServiceUrl, req.body);

        return res.json(response.data);
    } catch (error) {
        console.error("AI Service Error:", error.message);
        if (error.code === 'ECONNREFUSED') {
            return res.status(503).json({ error: "AI Service Unavailable" });
        }
        return res.status(500).json({ error: "AI Prediction Failed" });
    }
};
