// controllers/queueDisplay.controller.js
const Queue = require("../models/queue/QueueModel");

exports.getDisplay = async (req, res) => {
  try {
    const { clinicId, doctorId } = req.query;
    if (!clinicId || !doctorId) {
      return res.status(400).json({ error: "clinicId and doctorId required" });
    }

    const waiting = await Queue.find({
      clinicId,
      doctorUserId: doctorId,
      status: "waiting"
    }).sort({ queueNumber: 1 }).populate("patientProfileId");

    const current = await Queue.findOne({
      clinicId,
      doctorUserId: doctorId,
      status: "in_consultation"
    }).populate("patientProfileId");

    return res.json({
      current,
      waiting,
      waitingCount: waiting.length,
    });
  } catch (err) {
    console.error("display error", err);
    return res.status(500).json({ error: "Server error" });
  }
};
