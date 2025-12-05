const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "access_secret_change";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "refresh_secret_change";

function generateAccessToken(userId) {
  return jwt.sign({ sub: userId }, JWT_ACCESS_SECRET, { expiresIn: "15m" });
}

function generateRefreshToken(userId) {
  return jwt.sign({ sub: userId }, JWT_REFRESH_SECRET, { expiresIn: "30d" });
}

function sha256(str) {
  return crypto.createHash("sha256").update(str).digest("hex");
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  sha256
};
