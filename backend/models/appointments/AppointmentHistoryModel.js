// models/appointments/AppointmentHistoryModel.js
const mongoose = require("../configuration/mongoose_connection");

const appointmentHistorySchema = new mongoose.Schema({
  appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment", required: true },
  oldStatus: { type: String },
  newStatus: { type: String },
  changedAt: { type: Date, default: Date.now },
  changedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // who made the change
  remarks: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("AppointmentHistory", appointmentHistorySchema);
