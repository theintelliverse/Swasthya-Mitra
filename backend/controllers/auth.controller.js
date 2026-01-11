const User = require("../models/users/Usermodel");
const UserProfile = require("../models/users/UserProfilemodel");
const AuthProvider = require("../models/users/AuthProvidermodel");
const OTP = require("../models/users/OTPmodel");
const Session = require("../models/users/Sessionmodel");
const bcrypt = require("bcrypt");

const { generateAccessToken, generateRefreshToken, sha256 } = require("../utils/jwt.utils");
const { generateOTP } = require("../utils/otp.utils");

module.exports = {

  // -------------------------------- SEND OTP
  sendOtp: async (req, res) => {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ error: "Phone required" });

    try {
      let user = await User.findOne({ phone });
      if (!user) user = await User.create({ phone, isPhoneVerified: false });

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
        expiresAt: expiry
      });

      console.log(`OTP for ${phone}: ${otp}`);

      res.json({ message: "OTP sent", otpId: otpDoc._id });
    } catch (err) {
      console.error("sendOtp error", err);
      res.status(500).json({ error: "Server error" });
    }
  },

  // -------------------------------- VERIFY OTP
  verifyOtp: async (req, res) => {
    const { phone, otpCode, otpId } = req.body;
    if (!phone || !otpCode)
      return res.status(400).json({ error: "phone & otpCode required" });

    try {
      let otp = otpId
        ? await OTP.findById(otpId)
        : await OTP.findOne({ phone }).sort({ createdAt: -1 });

      if (!otp) return res.status(400).json({ error: "OTP not found" });
      if (otp.isUsed) return res.status(400).json({ error: "OTP used" });
      if (otp.expiresAt < new Date()) return res.status(400).json({ error: "OTP expired" });
      if (otp.otpCode !== otpCode) return res.status(400).json({ error: "Invalid OTP" });

      otp.isUsed = true;
      await otp.save();

      const user = await User.findById(otp.userId);
      user.isPhoneVerified = true;
      await user.save();

      const accessToken = generateAccessToken(user._id);
      const refreshToken = generateRefreshToken(user._id);

      await Session.create({
        userId: user._id,
        refreshTokenHash: sha256(refreshToken),
        deviceInfo: req.headers["user-agent"],
        ipAddress: req.ip,
        expiresAt: new Date(Date.now() + 30 * 86400000)
      });

      res.json({ message: "OTP verified", accessToken, refreshToken, userId: user._id });
    } catch (err) {
      console.error("verifyOtp error", err);
      res.status(500).json({ error: "Server error" });
    }
  },

  // -------------------------------- REGISTER
  register: async (req, res) => {
    const { phone, email, password, name } = req.body;
    if (!password || !name) return res.status(400).json({ error: "Name & password required" });

    try {
      let user = await User.findOne({ $or: [{ phone }, { email }] });
      if (!user) user = await User.create({ phone, email });

      const hash = await bcrypt.hash(password, 10);

      await AuthProvider.updateOne(
        { userId: user._id, providerType: "password" },
        { $set: { passwordHash: hash, lastUsedAt: new Date() } },
        { upsert: true }
      );

      const profile = await UserProfile.create({
        userId: user._id,
        name,
        patientType: "patient"
      });

      res.json({ message: "Registered", userId: user._id, profileId: profile._id });
    } catch (err) {
      console.error("register error", err);
      res.status(500).json({ error: "Server error" });
    }
  },

  // -------------------------------- LOGIN
  login: async (req, res) => {
    const { phoneOrEmail, password } = req.body;
    if (!phoneOrEmail || !password)
      return res.status(400).json({ error: "phoneOrEmail & password required" });

    try {
      const user = await User.findOne({
        $or: [{ phone: phoneOrEmail }, { email: phoneOrEmail }]
      });

      if (!user) return res.status(401).json({ error: "Invalid credentials" });

      const provider = await AuthProvider.findOne({
        userId: user._id,
        providerType: "password"
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
        expiresAt: new Date(Date.now() + 30 * 86400000)
      });

      res.json({
        message: "Login successful",
        accessToken,
        refreshToken,
        userId: user._id
      });
    } catch (err) {
      console.error("login error", err);
      res.status(500).json({ error: "Server error" });
    }
  }
};
