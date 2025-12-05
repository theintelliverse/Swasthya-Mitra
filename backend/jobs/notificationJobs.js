// jobs/notificationJobs.js
// requires `npm i node-cron` in your project
const cron = require("node-cron");
const Notification = require("../models/NotificationModel");
const { dispatch } = require("../services/notification.service");

/**
 * Cron job: every minute check for pending scheduled notifications and dispatch them.
 * Add to your server startup (require this file in app.js or server.js).
 */
function startNotificationJob() {
  cron.schedule("* * * * *", async () => {
    try {
      const now = new Date();
      const pending = await Notification.find({ status: "pending", scheduledAt: { $lte: now } }).limit(50);
      for (const n of pending) {
        try {
          await dispatch(n._id);
        } catch (err) {
          console.error("dispatch job error", err);
        }
      }
    } catch (err) {
      console.error("notification cron error", err);
    }
  }, { timezone: process.env.CRON_TZ || "UTC" });
}

module.exports = { startNotificationJob };
