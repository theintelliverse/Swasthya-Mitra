const mongoose = require('../../configuration/mongoose_connection');

const QueueHistorySchema = new mongoose.Schema({
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

  checkInTime: Date,
  calledAt: Date,
  completedAt: Date,

  // For AI:
  actualWaitTime: Number,        // minutes
  consultationDuration: Number,   // minutes
  date: {
    type: Date,
    default: () => new Date()
  }

}, { timestamps: true });

module.exports = mongoose.model("QueueHistory", QueueHistorySchema);
