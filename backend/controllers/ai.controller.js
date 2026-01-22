// controllers/ai.controller.js

const axios = require("axios");

exports.predictWaitTime = async (req, res) => {
    try {
        const response = await axios.post(
            "http://localhost:8000/predict",
            req.body
        );

        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({
            message: "AI prediction failed"
        });
    }
};
