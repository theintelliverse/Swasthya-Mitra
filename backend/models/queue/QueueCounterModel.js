const mongoose = require("mongoose");

const QueueCounterSchema = new mongoose.Schema({
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

  currentNumber: {
    type: Number,
    default: 0
  },

  date: {
    type: String,   // "YYYY-MM-DD"
    required: true
  }
}, { timestamps: true });

QueueCounterSchema.index({ clinicId: 1, doctorUserId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("QueueCounter", QueueCounterSchema);
