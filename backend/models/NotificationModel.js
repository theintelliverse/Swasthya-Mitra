// models/NotificationModel.js
const mongoose = require('../configuration/mongoose_connection');

const notificationSchema = new mongoose.Schema({
  clinicId: { type: mongoose.Schema.Types.ObjectId, ref: "Clinic" },
  to: { type: String, required: true },      // phone number (E.164) or chat id
  channel: { type: String, enum: ["whatsapp","sms","push"], default: "whatsapp" },
  template: { type: String }, // template key
  payload: { type: Object, default: {} },
  status: { type: String, enum: ["pending","sent","failed"], default: "pending" },
  scheduledAt: { type: Date, default: null },
  sentAt: { type: Date, default: null },
  error: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model("Notification", notificationSchema);
