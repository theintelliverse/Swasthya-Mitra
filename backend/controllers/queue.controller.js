// controllers/queue.controller.js

const Queue = require("../models/queue/QueueModel");
const QueueHistory = require("../models/queue/QueueHistoryModel");
const { getNextQueueNumber } = require("../utils/queue.utils");
const { emitQueueUpdate } = require("../socket"); // <-- IMPORTANT

/**
 * Helper: Broadcast updated queue state to display board(s)
 */
async function broadcastQueue(clinicId, doctorUserId) {
  const waiting = await Queue.find({
    clinicId,
    doctorUserId,
    status: "waiting"
  })
    .sort({ queueNumber: 1 })
    .populate("patientProfileId");

  const current = await Queue.findOne({
    clinicId,
    doctorUserId,
    status: "in_consultation"
  }).populate("patientProfileId");

  emitQueueUpdate(clinicId, doctorUserId, {
    current,
    waiting,
    waitingCount: waiting.length
  });
}

module.exports = {

  // --------------------------------------------------
  // 1️⃣ ADD PATIENT TO QUEUE
  // --------------------------------------------------
  addToQueue: async (req, res) => {
    try {
      const { clinicId, doctorUserId, patientProfileId, appointmentId } = req.body;

      if (!clinicId || !doctorUserId || !patientProfileId) {
        return res.status(400).json({
          error: "clinicId, doctorUserId & patientProfileId required"
        });
      }

      const queueNumber = await getNextQueueNumber(clinicId, doctorUserId);

      const entry = await Queue.create({
        clinicId,
        doctorUserId,
        patientProfileId,
        appointmentId: appointmentId || null,
        queueNumber,
        status: "waiting"
      });

      // 🔥 UPDATE DISPLAY IN REAL-TIME
      await broadcastQueue(clinicId, doctorUserId);

      res.json({ message: "Added to queue", queueNumber, entry });
    } catch (err) {
      console.error("queue/add error", err);
      res.status(500).json({ error: "Server error" });
    }
  },

  // --------------------------------------------------
  // 2️⃣ GET CURRENT QUEUE STATUS
  // --------------------------------------------------
  getStatus: async (req, res) => {
    try {
      const { clinicId, doctorId } = req.query;

      if (!clinicId || !doctorId) {
        return res.status(400).json({ error: "clinicId and doctorId required" });
      }

      const waiting = await Queue.find({
        clinicId,
        doctorUserId: doctorId,
        status: "waiting"
      }).populate("patientProfileId");

      const inConsultation = await Queue.findOne({
        clinicId,
        doctorUserId: doctorId,
        status: "in_consultation"
      }).populate("patientProfileId");

      res.json({
        waiting,
        current: inConsultation,
        count: waiting.length + (inConsultation ? 1 : 0)
      });
    } catch (err) {
      console.error("queue/status error", err);
      res.status(500).json({ error: "Server error" });
    }
  },

  // --------------------------------------------------
  // 3️⃣ MOVE TO NEXT PATIENT
  // --------------------------------------------------
  moveNext: async (req, res) => {
    try {
      const { clinicId, doctorUserId } = req.body;

      // 1. Mark current patient as done
      const current = await Queue.findOne({
        clinicId,
        doctorUserId,
        status: "in_consultation"
      });

      if (current) {
        current.status = "done";
        current.completedAt = new Date();
        await current.save();

        await QueueHistory.create({
          clinicId: current.clinicId,
          doctorUserId: current.doctorUserId,
          patientProfileId: current.patientProfileId,
          appointmentId: current.appointmentId,
          queueNumber: current.queueNumber,
          checkInTime: current.checkInTime,
          calledAt: current.calledAt,
          completedAt: current.completedAt,
          actualWaitTime: current.calledAt
            ? (current.calledAt - current.checkInTime) / 60000
            : null,
          consultationDuration: current.completedAt
            ? (current.completedAt - current.calledAt) / 60000
            : null
        });

        await Queue.deleteOne({ _id: current._id });
      }

      // 2. Bring next patient
      const next = await Queue.findOne({
        clinicId,
        doctorUserId,
        status: "waiting"
      }).sort({ queueNumber: 1 });

      if (!next) {
        // 🔥 UPDATE DISPLAY (no patients)
        await broadcastQueue(clinicId, doctorUserId);

        return res.json({ message: "Queue empty", next: null });
      }

      next.status = "in_consultation";
      next.calledAt = new Date();
      await next.save();

      // 🔥 UPDATE DISPLAY IN REAL-TIME
      await broadcastQueue(clinicId, doctorUserId);

      res.json({ message: "Next patient", next });
    } catch (err) {
      console.error("queue/next error", err);
      res.status(500).json({ error: "Server error" });
    }
  },

  // --------------------------------------------------
  // 4️⃣ SKIP PATIENT
  // --------------------------------------------------
  skip: async (req, res) => {
    try {
      const { queueId } = req.body;

      const entry = await Queue.findById(queueId);
      if (!entry) return res.status(404).json({ error: "Entry not found" });

      entry.status = "skipped";
      await entry.save();

      // 🔥 UPDATE DISPLAY
      await broadcastQueue(entry.clinicId, entry.doctorUserId);

      res.json({ message: "Patient skipped", entry });
    } catch (err) {
      console.error("queue/skip error", err);
      res.status(500).json({ error: "Server error" });
    }
  },

  // --------------------------------------------------
  // 5️⃣ RECALL PATIENT
  // --------------------------------------------------
  recall: async (req, res) => {
    try {
      const { queueId } = req.body;

      const entry = await Queue.findById(queueId);
      if (!entry) return res.status(404).json({ error: "Entry not found" });

      entry.status = "waiting";
      await entry.save();

      // 🔥 UPDATE DISPLAY
      await broadcastQueue(entry.clinicId, entry.doctorUserId);

      res.json({ message: "Patient recalled", entry });
    } catch (err) {
      console.error("queue/recall error", err);
      res.status(500).json({ error: "Server error" });
    }
  },

  // --------------------------------------------------
  // 6️⃣ COMPLETE CONSULTATION
  // --------------------------------------------------
  complete: async (req, res) => {
    try {
      const { queueId } = req.body;

      const entry = await Queue.findById(queueId);
      if (!entry) return res.status(404).json({ error: "Entry not found" });

      entry.status = "done";
      entry.completedAt = new Date();
      await entry.save();

      await QueueHistory.create({
        clinicId: entry.clinicId,
        doctorUserId: entry.doctorUserId,
        patientProfileId: entry.patientProfileId,
        appointmentId: entry.appointmentId,
        queueNumber: entry.queueNumber,
        checkInTime: entry.checkInTime,
        calledAt: entry.calledAt,
        completedAt: entry.completedAt,
        actualWaitTime: entry.calledAt
          ? (entry.calledAt - entry.checkInTime) / 60000
          : null,
        consultationDuration: entry.completedAt
          ? (entry.completedAt - entry.calledAt) / 60000
          : null
      });

      await Queue.deleteOne({ _id: entry._id });

      // 🔥 UPDATE DISPLAY
      await broadcastQueue(entry.clinicId, entry.doctorUserId);

      res.json({ message: "Consultation completed" });
    } catch (err) {
      console.error("queue/complete error", err);
      res.status(500).json({ error: "Server error" });
    }
  }

};
