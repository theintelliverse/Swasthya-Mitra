/**
 * app.js
 * Swasthya-Mitra Backend (Identity Layer + Basic Auth)
 *
 * Uses:
 * - configuration/mongoose_connection.js  → DB connection
 * - models/users/*model.js               → All Mongoose models
 *
 * This file contains:
 *  ✔ Express setup
 *  ✔ JWT auth
 *  ✔ OTP login (send + verify)
 *  ✔ Password login
 *  ✔ Session storage (refresh tokens)
 *  ✔ User + Clinic + ClinicUser basic routes
 *
 * Next step: Move routes into /routes folder (optional)
 */

require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// DB connection
require("./configuration/mongoose_connection");

// Import Models
const User = require("./models/users/Usermodel");
const UserProfile = require("./models/users/UserProfilemodel");
const Clinic = require("./models/users/Clinicmodel");
const ClinicUser = require("./models/users/ClinicUsermodel");
const AuthProvider = require("./models/users/AuthProvidermodel");
const OTP = require("./models/users/OTPmodel");
const Session = require("./models/users/Sessionmodel");

const app = express();
app.use(express.json());
app.use(cookieParser());

/* ---------------------------------------------------
   JWT UTILITIES
--------------------------------------------------- */

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "access_secret_change";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "refresh_secret_change";

// Access Token — 15 minutes
function generateAccessToken(userId) {
  return jwt.sign({ sub: userId }, JWT_ACCESS_SECRET, { expiresIn: "15m" });
}

// Refresh Token — 30 days
function generateRefreshToken(userId) {
  return jwt.sign({ sub: userId }, JWT_REFRESH_SECRET, { expiresIn: "30d" });
}

// Hashing for storing refresh tokens securely
function sha256(str) {
  return crypto.createHash("sha256").update(str).digest("hex");
}

// Generate numeric OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/* ---------------------------------------------------
   AUTH MIDDLEWARE (Verify Access Token)
--------------------------------------------------- */

async function authMiddleware(req, res, next) {
  const header = req.headers.authorization;

  if (!header) return res.status(401).json({ error: "Missing Authorization header" });

  const [bearer, token] = header.split(" ");
  if (bearer !== "Bearer" || !token) return res.status(401).json({ error: "Invalid header" });

  try {
    const payload = jwt.verify(token, JWT_ACCESS_SECRET);
    req.user = { id: payload.sub };
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired access token" });
  }
}

/* ---------------------------------------------------
   AUTH ROUTES — SEND OTP
--------------------------------------------------- */

app.post("/auth/send-otp", async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ error: "Phone number required" });

  try {
    // Find or create user
    let user = await User.findOne({ phone });
    if (!user) {
      user = await User.create({ phone, isPhoneVerified: false });
    }

    // Create AuthProvider for OTP if not exists
    await AuthProvider.updateOne(
      { userId: user._id, providerType: "otp" },
      { $set: { lastUsedAt: new Date() } },
      { upsert: true }
    );

    const otp = generateOTP();
    const expiry = new Date(Date.now() + 5 * 60 * 1000);

    const otpDoc = await OTP.create({
      userId: user._id,
      phone,
      otpCode: otp,
      expiresAt: expiry,
    });

    // MOCK SEND — replace with WhatsApp/SMS API later
    console.log(`OTP for ${phone}: ${otp}`);

    return res.json({ message: "OTP sent", otpId: otpDoc._id });
  } catch (err) {
    console.error("send-otp error", err);
    return res.status(500).json({ error: "Server error" });
  }
});

/* ---------------------------------------------------
   AUTH ROUTES — VERIFY OTP
--------------------------------------------------- */

app.post("/auth/verify-otp", async (req, res) => {
  const { phone, otpCode, otpId } = req.body;

  if (!phone || !otpCode)
    return res.status(400).json({ error: "phone & otpCode required" });

  try {
    let otp;
    if (otpId) otp = await OTP.findById(otpId);
    else otp = await OTP.findOne({ phone }).sort({ createdAt: -1 });

    if (!otp) return res.status(400).json({ error: "OTP not found" });
    if (otp.isUsed) return res.status(400).json({ error: "OTP already used" });
    if (otp.expiresAt < new Date()) return res.status(400).json({ error: "OTP expired" });
    if (otp.otpCode !== otpCode) return res.status(400).json({ error: "Invalid OTP" });

    // Mark OTP used
    otp.isUsed = true;
    await otp.save();

    // Verify user
    const user = await User.findById(otp.userId);
    user.isPhoneVerified = true;
    await user.save();

    // Issue tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    await Session.create({
      userId: user._id,
      refreshTokenHash: sha256(refreshToken),
      deviceInfo: req.headers["user-agent"],
      ipAddress: req.ip,
      expiresAt: new Date(Date.now() + 30 * 86400000),
    });

    return res.json({
      message: "OTP verified",
      accessToken,
      refreshToken,
      userId: user._id,
    });
  } catch (err) {
    console.error("verify-otp error", err);
    return res.status(500).json({ error: "Server error" });
  }
});

/* ---------------------------------------------------
   PASSWORD REGISTER
--------------------------------------------------- */

app.post("/auth/register", async (req, res) => {
  const { phone, email, password, name } = req.body;

  if (!password || !name) return res.status(400).json({ error: "Name & password required" });

  try {
    let user = await User.findOne({ $or: [{ phone }, { email }] });

    if (!user) {
      user = await User.create({ phone, email });
    }

    const hash = await bcrypt.hash(password, 10);

    await AuthProvider.updateOne(
      { userId: user._id, providerType: "password" },
      { $set: { passwordHash: hash, lastUsedAt: new Date() } },
      { upsert: true }
    );

    const profile = await UserProfile.create({
      userId: user._id,
      name,
      patientType: "patient",
    });

    return res.json({ message: "Registered", userId: user._id, profileId: profile._id });
  } catch (err) {
    console.error("register error", err);
    return res.status(500).json({ error: "Server error" });
  }
});

/* ---------------------------------------------------
   PASSWORD LOGIN
--------------------------------------------------- */

app.post("/auth/login", async (req, res) => {
  const { phoneOrEmail, password } = req.body;
  if (!phoneOrEmail || !password)
    return res.status(400).json({ error: "phoneOrEmail & password required" });

  try {
    const user = await User.findOne({
      $or: [{ phone: phoneOrEmail }, { email: phoneOrEmail }],
    });

    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const provider = await AuthProvider.findOne({
      userId: user._id,
      providerType: "password",
    });

    if (!provider) return res.status(401).json({ error: "Password login not enabled" });

    const match = await bcrypt.compare(password, provider.passwordHash);
    if (!match) return res.status(401).json({ error: "Invalid password" });

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    await Session.create({
      userId: user._id,
      refreshTokenHash: sha256(refreshToken),
      deviceInfo: req.headers["user-agent"],
      ipAddress: req.ip,
      expiresAt: new Date(Date.now() + 30 * 86400000),
    });

    return res.json({
      message: "Login successful",
      accessToken,
      refreshToken,
      userId: user._id,
    });
  } catch (err) {
    console.error("login error", err);
    return res.status(500).json({ error: "Server error" });
  }
});

/* ---------------------------------------------------
   CREATE CLINIC
--------------------------------------------------- */

app.post("/clinics", authMiddleware, async (req, res) => {
  const { name, address } = req.body;

  if (!name) return res.status(400).json({ error: "Clinic name required" });

  try {
    const clinic = await Clinic.create({
      name,
      address: address || "",
      ownerUserId: req.user.id,
    });

    // Assign owner as admin
    await ClinicUser.create({
      clinicId: clinic._id,
      userId: req.user.id,
      role: "admin",
      permissions: ["all"],
    });

    return res.json({ message: "Clinic created", clinicId: clinic._id });
  } catch (err) {
    console.error("clinic create error", err);
    return res.status(500).json({ error: "Server error" });
  }
});

/* ---------------------------------------------------
   GET USER INFO
--------------------------------------------------- */

app.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const profiles = await UserProfile.find({ userId: req.user.id });
    const clinics = await ClinicUser.find({ userId: req.user.id }).populate("clinicId");

    return res.json({ user, profiles, clinics });
  } catch (err) {
    console.error("me error", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// ------------------------------------------------------
// QUEUE MANAGEMENT ROUTES
// ------------------------------------------------------

const Queue = require("./models/queue/QueueModel");
const QueueHistory = require("./models/queue/QueueHistoryModel");
const QueueCounter = require("./models/queue/QueueCounterModel");

const moment = require("moment"); // Optional (for date formatting)

// ------------------------------------------------------
// HELPER: Get next queue number
// ------------------------------------------------------
async function getNextQueueNumber(clinicId, doctorUserId) {
  const today = moment().format("YYYY-MM-DD");

  let counter = await QueueCounter.findOne({ clinicId, doctorUserId, date: today });

  if (!counter) {
    counter = await QueueCounter.create({
      clinicId,
      doctorUserId,
      date: today,
      currentNumber: 0
    });
  }

  counter.currentNumber += 1;
  await counter.save();

  return counter.currentNumber;
}

// ------------------------------------------------------
// 1️⃣ ADD PATIENT TO QUEUE
// ------------------------------------------------------
app.post("/queue/add", authMiddleware, async (req, res) => {
  try {
    const { clinicId, doctorUserId, patientProfileId, appointmentId } = req.body;

    if (!clinicId || !doctorUserId || !patientProfileId) {
      return res.status(400).json({ error: "Missing required fields" });
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

    return res.json({
      message: "Added to queue",
      queueNumber,
      entry
    });
  } catch (err) {
    console.error("queue/add error", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// ------------------------------------------------------
// 2️⃣ GET CURRENT QUEUE STATUS
// ------------------------------------------------------
app.get("/queue/status", authMiddleware, async (req, res) => {
  try {
    const { clinicId, doctorId } = req.query;

    if (!clinicId || !doctorId)
      return res.status(400).json({ error: "clinicId and doctorId required" });

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

    return res.json({
      waiting,
      current: inConsultation,
      count: waiting.length + (inConsultation ? 1 : 0)
    });
  } catch (err) {
    console.error("queue/status error", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// ------------------------------------------------------
// 3️⃣ MOVE TO NEXT PATIENT
// ------------------------------------------------------
app.post("/queue/next", authMiddleware, async (req, res) => {
  try {
    const { clinicId, doctorUserId } = req.body;

    // Mark current consulting patient as done
    const current = await Queue.findOne({
      clinicId,
      doctorUserId,
      status: "in_consultation"
    });

    if (current) {
      current.status = "done";
      current.completedAt = new Date();
      await current.save();

      // Move to history
      await QueueHistory.create({
        clinicId: current.clinicId,
        doctorUserId: current.doctorUserId,
        patientProfileId: current.patientProfileId,
        appointmentId: current.appointmentId,
        queueNumber: current.queueNumber,
        checkInTime: current.checkInTime,
        calledAt: current.calledAt,
        completedAt: current.completedAt,
        actualWaitTime: current.calledAt ? ((current.calledAt - current.checkInTime) / 60000) : null,
        consultationDuration: current.completedAt ? ((current.completedAt - current.calledAt) / 60000) : null
      });

      await Queue.deleteOne({ _id: current._id });
    }

    // Get next waiting patient
    const next = await Queue.findOne({
      clinicId,
      doctorUserId,
      status: "waiting"
    }).sort({ queueNumber: 1 });

    if (!next) {
      return res.json({ message: "Queue empty", next: null });
    }

    next.status = "in_consultation";
    next.calledAt = new Date();
    await next.save();

    return res.json({ message: "Next patient", next });
  } catch (err) {
    console.error("queue/next error", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// ------------------------------------------------------
// 4️⃣ SKIP PATIENT
// ------------------------------------------------------
app.post("/queue/skip", authMiddleware, async (req, res) => {
  try {
    const { queueId } = req.body;

    const entry = await Queue.findById(queueId);
    if (!entry) return res.status(404).json({ error: "Entry not found" });

    entry.status = "skipped";
    await entry.save();

    return res.json({ message: "Patient skipped", entry });
  } catch (err) {
    console.error("queue/skip error", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// ------------------------------------------------------
// 5️⃣ RECALL A SKIPPED PATIENT
// ------------------------------------------------------
app.post("/queue/recall", authMiddleware, async (req, res) => {
  try {
    const { queueId } = req.body;

    const entry = await Queue.findById(queueId);
    if (!entry) return res.status(404).json({ error: "Entry not found" });

    entry.status = "waiting"; // put back in waiting
    await entry.save();

    return res.json({ message: "Patient recalled", entry });
  } catch (err) {
    console.error("queue/recall error", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// ------------------------------------------------------
// 6️⃣ COMPLETE CONSULTATION
// ------------------------------------------------------
app.post("/queue/complete", authMiddleware, async (req, res) => {
  try {
    const { queueId } = req.body;

    const entry = await Queue.findById(queueId);
    if (!entry) return res.status(404).json({ error: "Entry not found" });

    entry.status = "done";
    entry.completedAt = new Date();
    await entry.save();

    // Move to history
    await QueueHistory.create({
      clinicId: entry.clinicId,
      doctorUserId: entry.doctorUserId,
      patientProfileId: entry.patientProfileId,
      appointmentId: entry.appointmentId,
      queueNumber: entry.queueNumber,
      checkInTime: entry.checkInTime,
      calledAt: entry.calledAt,
      completedAt: entry.completedAt,
      actualWaitTime: entry.calledAt ? ((entry.calledAt - entry.checkInTime) / 60000) : null,
      consultationDuration: entry.completedAt ? ((entry.completedAt - entry.calledAt) / 60000) : null
    });

    await Queue.deleteOne({ _id: entry._id });

    return res.json({ message: "Consultation completed" });
  } catch (err) {
    console.error("queue/complete error", err);
    return res.status(500).json({ error: "Server error" });
  }
});


/* ---------------------------------------------------
   HEALTH CHECK
--------------------------------------------------- */

app.get("/health", (req, res) => {
  res.json({ status: "ok", time: new Date() });
});

/* ---------------------------------------------------
   START SERVER
--------------------------------------------------- */

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Swasthya-Mitra backend running on port ${PORT}`);
});
