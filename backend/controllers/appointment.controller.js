// controllers/appointment.controller.js
const Appointment = require("../models/appointments/AppointmentModel");
const AppointmentHistory = require("../models/appointments/AppointmentHistoryModel");
const Queue = require("../models/queue/QueueModel");
const { getNextQueueNumber } = require("../utils/queue.utils");
const { hasConflict, addHistory } = require("../utils/appointment.utils");
const mongoose = require("mongoose");

/**
 * Create appointment (patient or staff)
 * Body: { clinicId, doctorUserId, patientProfileId, startTime (ISO), durationMinutes, type, notes, createdBy }
 */
exports.create = async (req, res) => {
  try {
    const data = req.body;
    const { clinicId, doctorUserId, patientProfileId, startTime, durationMinutes } = data;

    if (!clinicId || !doctorUserId || !patientProfileId || !startTime) {
      return res.status(400).json({ error: "clinicId, doctorUserId, patientProfileId and startTime required" });
    }

    const start = new Date(startTime);
    const end = new Date(start.getTime() + ((durationMinutes || 15) * 60000));

    const conflict = await hasConflict(doctorUserId, clinicId, start, end);
    if (conflict) return res.status(409).json({ error: "Doctor not available at this time (conflict)" });

    const appt = await Appointment.create({
      clinicId,
      doctorUserId,
      patientProfileId,
      startTime: start,
      durationMinutes: durationMinutes || 15,
      type: data.type || "online",
      createdBy: data.createdBy || "patient",
      notes: data.notes || ""
    });

    await addHistory(appt._id, null, appt.status, req.user ? req.user.id : null, "Created appointment");

    return res.json({ message: "Appointment created", appointment: appt });
  } catch (err) {
    console.error("create appointment error", err);
    return res.status(500).json({ error: "Server error" });
  }
};

/**
 * Get single appointment (with history)
 */
exports.get = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    if (!mongoose.isValidObjectId(appointmentId)) return res.status(400).json({ error: "Invalid id" });

    const appt = await Appointment.findById(appointmentId)
      .populate("clinicId")
      .populate("doctorUserId", "-passwordHash")
      .populate("patientProfileId");

    if (!appt) return res.status(404).json({ error: "Appointment not found" });

    const history = await AppointmentHistory.find({ appointmentId }).sort({ createdAt: 1 });

    return res.json({ appointment: appt, history });
  } catch (err) {
    console.error("get appointment error", err);
    return res.status(500).json({ error: "Server error" });
  }
};

/**
 * List appointments with basic filters:
 * query: clinicId, doctorUserId, patientProfileId, dateFrom, dateTo, status
 */
exports.list = async (req, res) => {
  try {
    const q = {};
    const { clinicId, doctorUserId, patientProfileId, status, dateFrom, dateTo, limit = 50, page = 1 } = req.query;

    if (clinicId) q.clinicId = clinicId;
    if (doctorUserId) q.doctorUserId = doctorUserId;
    if (patientProfileId) q.patientProfileId = patientProfileId;
    if (status) q.status = status;

    if (dateFrom || dateTo) {
      q.startTime = {};
      if (dateFrom) q.startTime.$gte = new Date(dateFrom);
      if (dateTo) q.startTime.$lte = new Date(dateTo);
    }

    const skip = (Math.max(1, page) - 1) * Math.min(100, limit);
    const items = await Appointment.find(q)
      .sort({ startTime: 1 })
      .skip(skip)
      .limit(Math.min(100, limit))
      .populate("doctorUserId patientProfileId clinicId");

    const total = await Appointment.countDocuments(q);

    return res.json({ items, total, page: Number(page), limit: Number(limit) });
  } catch (err) {
    console.error("list appointment error", err);
    return res.status(500).json({ error: "Server error" });
  }
};

/**
 * Reschedule appointment (only allowed if not checked_in/in_consultation/completed)
 * body: { startTime, durationMinutes }
 */
exports.reschedule = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { startTime, durationMinutes } = req.body;

    const appt = await Appointment.findById(appointmentId);
    if (!appt) return res.status(404).json({ error: "Appointment not found" });

    if (["checked_in", "in_consultation", "completed"].includes(appt.status)) {
      return res.status(400).json({ error: "Cannot reschedule checked-in/in-consultation/completed appointment" });
    }

    const start = new Date(startTime);
    const end = new Date(start.getTime() + ((durationMinutes || appt.durationMinutes) * 60000));

    const conflict = await hasConflict(appt.doctorUserId, appt.clinicId, start, end, appt._id);
    if (conflict) return res.status(409).json({ error: "Conflict at new time" });

    const oldStart = appt.startTime;
    appt.startTime = start;
    appt.durationMinutes = durationMinutes || appt.durationMinutes;
    appt.endTime = end;
    await appt.save();

    await addHistory(appt._id, "scheduled", appt.status, req.user ? req.user.id : null, `Rescheduled from ${oldStart} to ${start}`);

    return res.json({ message: "Rescheduled", appointment: appt });
  } catch (err) {
    console.error("reschedule error", err);
    return res.status(500).json({ error: "Server error" });
  }
};

/**
 * Cancel appointment
 * body: { reason }
 */
exports.cancel = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { reason } = req.body;

    const appt = await Appointment.findById(appointmentId);
    if (!appt) return res.status(404).json({ error: "Appointment not found" });

    if (["completed"].includes(appt.status)) {
      return res.status(400).json({ error: "Cannot cancel completed appointment" });
    }

    const old = appt.status;
    appt.status = "cancelled";
    await appt.save();

    await addHistory(appt._id, old, appt.status, req.user ? req.user.id : null, reason || "Cancelled");

    return res.json({ message: "Cancelled", appointment: appt });
  } catch (err) {
    console.error("cancel appointment error", err);
    return res.status(500).json({ error: "Server error" });
  }
};

/**
 * Check-in: convert appointment into queue entry (or if walk-in, create appointment then queue)
 * body: { appointmentId } OR (walk-in) { clinicId, doctorUserId, patientProfileId, startTime, durationMinutes, type }
 */
exports.checkIn = async (req, res) => {
  try {
    let appt;
    if (req.body.appointmentId) {
      appt = await Appointment.findById(req.body.appointmentId);
      if (!appt) return res.status(404).json({ error: "Appointment not found" });

      if (appt.status !== "scheduled" && appt.type !== "walkin") {
        return res.status(400).json({ error: "Only scheduled appointments can be checked-in" });
      }
    } else {
      // create walk-in appointment and immediately check-in
      const { clinicId, doctorUserId, patientProfileId, startTime, durationMinutes } = req.body;
      if (!clinicId || !doctorUserId || !patientProfileId || !startTime) {
        return res.status(400).json({ error: "clinicId, doctorUserId, patientProfileId and startTime required for walk-in" });
      }

      const start = new Date(startTime);
      const end = new Date(start.getTime() + ((durationMinutes || 15) * 60000));
      const conflict = await hasConflict(doctorUserId, clinicId, start, end);
      if (conflict) return res.status(409).json({ error: "Doctor not available at this time (conflict)" });

      appt = await Appointment.create({
        clinicId,
        doctorUserId,
        patientProfileId,
        startTime: start,
        durationMinutes: durationMinutes || 15,
        type: "walkin",
        createdBy: req.user ? (req.user.id ? "staff" : "system") : "system",
        status: "scheduled"
      });

      await addHistory(appt._id, null, appt.status, req.user ? req.user.id : null, "Walk-in created then checked-in");
    }

    if (appt.queueEntryId) return res.status(400).json({ error: "Already checked-in (linked to queue)" });

    // create queue entry
    const queueNumber = await getNextQueueNumber(appt.clinicId, appt.doctorUserId);

    const queueEntry = await Queue.create({
      clinicId: appt.clinicId,
      doctorUserId: appt.doctorUserId,
      patientProfileId: appt.patientProfileId,
      appointmentId: appt._id,
      queueNumber,
      status: "waiting",
      checkInTime: new Date()
    });

    appt.queueEntryId = queueEntry._id;
    appt.status = "checked_in";
    await appt.save();

    await addHistory(appt._id, "scheduled", "checked_in", req.user ? req.user.id : null, "Patient checked in -> queue entry created");

    return res.json({ message: "Checked in", appointment: appt, queueEntry });
  } catch (err) {
    console.error("checkIn error", err);
    return res.status(500).json({ error: "Server error" });
  }
};

/**
 * Mark appointment as completed (used after consultation finishes)
 */
exports.complete = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const appt = await Appointment.findById(appointmentId);
    if (!appt) return res.status(404).json({ error: "Appointment not found" });

    const old = appt.status;
    appt.status = "completed";
    await appt.save();

    await addHistory(appt._id, old, appt.status, req.user ? req.user.id : null, "Marked completed");

    return res.json({ message: "Completed", appointment: appt });
  } catch (err) {
    console.error("complete appointment error", err);
    return res.status(500).json({ error: "Server error" });
  }
};

/**
 * Mark no-show
 */
exports.markNoShow = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const appt = await Appointment.findById(appointmentId);
    if (!appt) return res.status(404).json({ error: "Appointment not found" });

    if (["checked_in", "in_consultation", "completed"].includes(appt.status)) {
      return res.status(400).json({ error: "Cannot mark no-show for checked-in/in-consultation/completed appointment" });
    }

    const old = appt.status;
    appt.status = "no_show";
    await appt.save();

    await addHistory(appt._id, old, appt.status, req.user ? req.user.id : null, "Marked no-show");

    return res.json({ message: "No-show marked", appointment: appt });
  } catch (err) {
    console.error("mark no-show error", err);
    return res.status(500).json({ error: "Server error" });
  }
};
