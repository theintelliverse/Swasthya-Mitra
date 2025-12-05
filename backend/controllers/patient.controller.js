// controllers/patient.controller.js
const Appointment = require("../models/appointments/AppointmentModel");
const Queue = require("../models/queue/QueueModel");
const { hasConflict } = require("../utils/appointment.utils");
const mongoose = require("mongoose");

/**
 * POST /patient/book
 * Creates an appointment (patient user uses their profileId in body)
 */
exports.book = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = req.body;
    // data must include: clinicId, doctorUserId, patientProfileId, startTime
    if (!data.clinicId || !data.doctorUserId || !data.patientProfileId || !data.startTime) {
      return res.status(400).json({ error: "clinicId, doctorUserId, patientProfileId and startTime required" });
    }

    // conflict check
    const start = new Date(data.startTime);
    const end = new Date(start.getTime() + ((data.durationMinutes || 15) * 60000));
    const conflict = await hasConflict(data.doctorUserId, data.clinicId, start, end);
    if (conflict) return res.status(409).json({ error: "Doctor not available at this time (conflict)" });

    const appt = await Appointment.create({
      clinicId: data.clinicId,
      doctorUserId: data.doctorUserId,
      patientProfileId: data.patientProfileId,
      startTime: start,
      durationMinutes: data.durationMinutes || 15,
      type: data.type || "online",
      createdBy: "patient",
      notes: data.notes || ""
    });

    return res.json({ message: "Appointment booked", appointment: appt });
  } catch (err) {
    console.error("patient.book error", err);
    return res.status(500).json({ error: "Server error" });
  }
};

/**
 * GET /patient/appointments
 * List appointments for current user's profiles (pass patientProfileId optional)
 */
exports.myAppointments = async (req, res) => {
  try {
    const userId = req.user.id;
    const { patientProfileId, clinicId, status, page = 1, limit = 50 } = req.query;

    const q = {};
    if (patientProfileId) q.patientProfileId = patientProfileId;
    else {
      // attempt to find all profiles for user
      // NOTE: your UserProfile model may store userId field; using that:
      const UserProfile = require("../models/users/UserProfilemodel");
      const profiles = await UserProfile.find({ userId });
      q.patientProfileId = { $in: profiles.map(p => p._id) };
    }
    if (clinicId) q.clinicId = clinicId;
    if (status) q.status = status;

    const skip = (Math.max(1, page) - 1) * Math.min(100, limit);
    const items = await Appointment.find(q)
      .sort({ startTime: -1 })
      .skip(skip)
      .limit(Math.min(100, limit))
      .populate("doctorUserId clinicId patientProfileId");

    const total = await Appointment.countDocuments(q);
    return res.json({ items, total, page: Number(page), limit: Number(limit) });
  } catch (err) {
    console.error("myAppointments error", err);
    return res.status(500).json({ error: "Server error" });
  }
};

/**
 * GET /patient/queue-status?clinicId=&doctorId=&patientProfileId=
 * Returns queue position for a given clinic+doctor+patientProfile
 */
exports.queueStatus = async (req, res) => {
  try {
    const { clinicId, doctorId, patientProfileId } = req.query;
    if (!clinicId || !doctorId || !patientProfileId) {
      return res.status(400).json({ error: "clinicId, doctorId & patientProfileId required" });
    }

    const waiting = await Queue.find({
      clinicId,
      doctorUserId: doctorId,
      status: "waiting"
    }).sort({ queueNumber: 1 });

    const current = await Queue.findOne({
      clinicId,
      doctorUserId: doctorId,
      status: "in_consultation"
    });

    // find position
    const idx = waiting.findIndex(w => String(w.patientProfileId) === String(patientProfileId));
    const position = idx === -1 ? null : idx + 1;
    const estimatedWait = null; // could be computed with avg consultation

    return res.json({ position, current, waitingCount: waiting.length, estimatedWaitMinutes: estimatedWait });
  } catch (err) {
    console.error("queueStatus error", err);
    return res.status(500).json({ error: "Server error" });
  }
};
