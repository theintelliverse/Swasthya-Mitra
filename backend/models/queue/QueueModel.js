const mongoose = require('../../configuration/mongoose_connection');
const QueueSchema = new mongoose.Schema({
  clinicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Clinic",
    required: true
  },

  doctorUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  patientProfileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserProfile",
    required: true
  },

  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
    default: null
  },

  queueNumber: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    enum: ["waiting", "skipped", "in_consultation", "done"],
    default: "waiting"
  },

  checkInTime: {
    type: Date,
    default: Date.now
  },

  calledAt: {
    type: Date,
    default: null
  },

  completedAt: {
    type: Date,
    default: null
  }
}, { timestamps: true });

// Ensure unique queue number per doctor per day
QueueSchema.index({ clinicId: 1, doctorUserId: 1, queueNumber: 1 }, { unique: true });

module.exports = mongoose.model("Queue", QueueSchema);
