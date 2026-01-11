// models/appointments/AppointmentModel.js
const mongoose = require('../../configuration/mongoose_connection');

const appointmentSchema = new mongoose.Schema({
  clinicId: { type: mongoose.Schema.Types.ObjectId, ref: "Clinic", required: true },
  doctorUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  patientProfileId: { type: mongoose.Schema.Types.ObjectId, ref: "UserProfile", required: true },

  // For flexible, slotless booking we store exact timestamps
  startTime: { type: Date, required: true },       // appointment intended start
  durationMinutes: { type: Number, default: 15 },  // flexible duration

  // derived convenience fields
  endTime: { type: Date }, // set in pre-save middleware or controller

  type: { type: String, enum: ["walkin", "online", "followup", "emergency"], default: "online" },

  status: {
    type: String,
    enum: ["scheduled", "checked_in", "in_consultation", "completed", "cancelled", "no_show"],
    default: "scheduled",
  },

  createdBy: { type: String, enum: ["patient", "staff", "system"], default: "patient" },
  notes: { type: String, default: "" },

  queueEntryId: { type: mongoose.Schema.Types.ObjectId, ref: "Queue", default: null },

}, { timestamps: true });

appointmentSchema.pre("save", function (next) {
  if (this.startTime && this.durationMinutes) {
    this.endTime = new Date(this.startTime.getTime() + this.durationMinutes * 60000);
  }
  next();
});

module.exports = mongoose.model("Appointment", appointmentSchema);
