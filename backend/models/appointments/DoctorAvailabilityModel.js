// models/appointments/DoctorAvailabilityModel.js
const mongoose = require('../../configuration/mongoose_connection');

const slotSchema = new mongoose.Schema({
  start: { type: String, required: true }, // "09:00"
  end: { type: String, required: true },   // "13:00"
}, { _id: false });

const doctorAvailabilitySchema = new mongoose.Schema({
  doctorUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  clinicId: { type: mongoose.Schema.Types.ObjectId, ref: "Clinic", required: true },
  dayOfWeek: { type: Number, min: 0, max: 6, required: true }, // 0 = Sunday
  slots: { type: [slotSchema], default: [] },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("DoctorAvailability", doctorAvailabilitySchema);
