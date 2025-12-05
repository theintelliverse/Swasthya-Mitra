// controllers/notification.controller.js
const { scheduleNotification, dispatch, Notification } = require("../services/notification.service");

/**
 * POST /notifications/send - immediate or scheduled
 * body: { clinicId, to, channel, template, payload, scheduledAt }
 */
exports.send = async (req, res) => {
  try {
    const { clinicId, to, channel, template, payload, scheduledAt } = req.body;
    if (!to || !template) return res.status(400).json({ error: "to & template required" });

    const n = await scheduleNotification({ clinicId, to, channel, template, payload, scheduledAt });
    return res.json({ message: "Scheduled", notification: n });
  } catch (err) {
    console.error("notification send error", err);
    return res.status(500).json({ error: "Server error" });
  }
};

/**
 * POST /notifications/dispatch/:id - manual dispatch
 */
exports.dispatchNow = async (req, res) => {
  try {
    const { id } = req.params;
    const r = await dispatch(id);
    return res.json(r);
  } catch (err) {
    console.error("dispatchNow error", err);
    return res.status(500).json({ error: "Server error" });
  }
};

/**
 * GET /notifications/:id
 */
exports.get = async (req, res) => {
  try {
    const n = await Notification.findById(req.params.id);
    if (!n) return res.status(404).json({ error: "Not found" });
    return res.json(n);
  } catch (err) {
    console.error("get notification error", err);
    return res.status(500).json({ error: "Server error" });
  }
};
