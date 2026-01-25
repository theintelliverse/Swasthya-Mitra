// controllers/doctor.controller.js
const Appointment = require("../models/appointments/AppointmentModel");
const Queue = require("../models/queue/QueueModel");
const ClinicUser = require("../models/users/ClinicUsermodel");
const moment = require("moment");

/**
 * GET /doctor/today-appointments?clinicId=
 * Returns list of today's appointments for the doctor (sorted)
 */
exports.todayAppointments = async (req, res) => {
  try {
    const doctorUserId = req.user.id;
    const { clinicId } = req.query;

    const startOfDay = moment().startOf("day").toDate();
    const endOfDay = moment().endOf("day").toDate();

    const q = {
      doctorUserId,
      startTime: { $gte: startOfDay, $lte: endOfDay }
    };
    if (clinicId) q.clinicId = clinicId;

    const items = await Appointment.find(q)
      .sort({ startTime: 1 })
      .populate("patientProfileId")
      .populate("clinicId");

    return res.json({ items });
  } catch (err) {
    console.error("todayAppointments error", err);
    try {
      const fs = require('fs');
      const path = require('path');
      fs.appendFileSync(path.join(__dirname, '../logs/error.log'), `${new Date().toISOString()} Doctor Error: ${err.message}\nStack: ${err.stack}\n`);
    } catch (e) { }
    return res.status(500).json({ error: "Server error", details: err.message });
  }
};

/**
 * GET /doctor/today-queue?clinicId=
 * Returns waiting queue entries + current in_consultation for doctor
 */
exports.todayQueue = async (req, res) => {
  try {
    const doctorUserId = req.user.id;
    const { clinicId } = req.query;
    if (!clinicId) return res.status(400).json({ error: "clinicId required" });

    const waiting = await Queue.find({
      clinicId,
      doctorUserId,
      status: "waiting"
    }).populate("patientProfileId appointmentId");

    const current = await Queue.findOne({
      clinicId,
      doctorUserId,
      status: "in_consultation"
    }).populate("patientProfileId appointmentId");

    return res.json({ waiting, current, count: waiting.length + (current ? 1 : 0) });
  } catch (err) {
    console.error("todayQueue error", err);
    return res.status(500).json({ error: "Server error" });
  }
};

/**
 * GET /doctor/summary?clinicId=&days=7
 * returns summary metrics for X days
 */
exports.summary = async (req, res) => {
  try {
    const doctorUserId = req.user.id;
    const { clinicId, days = 7 } = req.query;
    const from = moment().subtract(Number(days), "days").startOf("day").toDate();

    const match = { doctorUserId, createdAt: { $gte: from } };
    if (clinicId) match.clinicId = clinicId;

    const total = await Appointment.countDocuments(match);
    const completed = await Appointment.countDocuments({ ...match, status: "completed" });
    const cancelled = await Appointment.countDocuments({ ...match, status: "cancelled" });
    const no_show = await Appointment.countDocuments({ ...match, status: "no_show" });

    // avg waiting time: compute from QueueHistory or Queue documents if available
    // We'll approximate: average time between checkIn (queue.checkInTime) and calledAt in QueueHistory if exists
    const qHistory = require("../models/queue/QueueHistoryModel");
    const qH = { doctorUserId, clinicId };
    if (!clinicId) delete qH.clinicId;

    const histories = await qHistory.find(qH).sort({ createdAt: -1 }).limit(200);
    let avgWait = null;
    if (histories.length) {
      const waits = histories.map(h => (h.actualWaitTime || 0));
      avgWait = waits.reduce((a, b) => a + b, 0) / waits.length;
    }

    return res.json({ total, completed, cancelled, no_show, avgWaitMinutes: avgWait });
  } catch (err) {
    console.error("summary error", err);
    try {
      const fs = require('fs');
      const path = require('path');
      fs.appendFileSync(path.join(__dirname, '../logs/error.log'), `${new Date().toISOString()} Summary Error: ${err.message}\nStack: ${err.stack}\n`);
    } catch (e) { }
    return res.status(500).json({ error: "Server error", details: err.message });
  }
};

/**
 * GET /doctor/patients?clinicId=&limit=
 * recent distinct patients for the doctor
 */
exports.patients = async (req, res) => {
  try {
    const doctorUserId = req.user.id;
    const { clinicId, limit = 50 } = req.query;

    const q = { doctorUserId };
    if (clinicId) q.clinicId = clinicId;

    const appts = await Appointment.find(q)
      .sort({ startTime: -1 })
      .limit(Number(limit))
      .populate("patientProfileId");

    const seen = new Set();
    const patients = [];
    for (const a of appts) {
      if (!a.patientProfileId) continue;
      const id = String(a.patientProfileId._id);
      if (seen.has(id)) continue;
      seen.add(id);
      patients.push(a.patientProfileId);
    }

    return res.json({ patients });
  } catch (err) {
    console.error("patients error", err);
    return res.status(500).json({ error: "Server error" });
  }
};

/**
 * POST /doctor/queue/action
 * Body: { action: "NEXT" | "COMPLETE" | "SKIP" | "PAUSE", clinicId }
 */
const socketIO = require("../socket");
const emitQueueUpdate = socketIO && socketIO.emitQueueUpdate ? socketIO.emitQueueUpdate : () => console.log("Socket not init");

exports.handleQueueAction = async (req, res) => {
  try {
    const doctorUserId = req.user.id;
    const { action, clinicId } = req.body;

    if (!clinicId) return res.status(400).json({ error: "clinicId required" });

    // 1. Find current active
    const current = await Queue.findOne({
      clinicId,
      doctorUserId,
      status: "in_consultation"
    });

    if (action === "COMPLETE") {
      if (current) {
        current.status = "done";
        current.completedAt = new Date();
        await current.save();

        // Update appointment status if exists
        if (current.appointmentId) {
          const updateData = { status: "completed" };
          // If notes provided, save them
          if (req.body.notes) {
            updateData.notes = req.body.notes;
          }
          await Appointment.findByIdAndUpdate(current.appointmentId, updateData);
        }
      }
    } else if (action === "NEXT") {
      // Complete current if exists
      if (current) {
        current.status = "done";
        current.completedAt = new Date();
        await current.save();
        if (current.appointmentId) {
          await Appointment.findByIdAndUpdate(current.appointmentId, { status: "completed" });
        }
      }

      // Find next waiting
      const nextPatient = await Queue.findOne({
        clinicId,
        doctorUserId,
        status: "waiting"
      }).sort({ queueNumber: 1 });

      if (nextPatient) {
        nextPatient.status = "in_consultation";
        nextPatient.calledAt = new Date();
        await nextPatient.save();
        if (nextPatient.appointmentId) {
          await Appointment.findByIdAndUpdate(nextPatient.appointmentId, { status: "in_consultation" });
        }
      }
    } else if (action === "SKIP") {
      if (current) {
        current.status = "skipped";
        await current.save();
        if (current.appointmentId) {
          await Appointment.findByIdAndUpdate(current.appointmentId, { status: "no_show" }); // or internal skipped status
        }
      }
    }

    // Emit Update
    emitQueueUpdate(clinicId, doctorUserId, { clinicId, doctorId: doctorUserId });

    return res.json({ success: true });
  } catch (err) {
    console.error("handleQueueAction error", err);
    return res.status(500).json({ error: "Server error" });
  }
};
