// models/appointments/DoctorAvailabilityOverrideModel.js
const mongoose = require("../configuration/mongoose_connection");

const overrideSchema = new mongoose.Schema({
  doctorUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  clinicId: { type: mongoose.Schema.Types.ObjectId, ref: "Clinic", required: true },
  date: { type: String, required: true }, // "YYYY-MM-DD"
  type: { type: String, enum: ["holiday", "custom"], default: "custom" },
  customSlots: { type: [{ start: String, end: String }], default: [] },
  reason: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("DoctorAvailabilityOverride", overrideSchema);
