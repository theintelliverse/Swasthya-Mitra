require("dotenv").config();
const mongoose = require("./configuration/mongoose_connection");
const OTP = require("./models/users/OTPmodel");

const phone = "9825450543";

setTimeout(async () => {
    try {
        console.log(`Checking OTP for ${phone}...`);
        const otps = await OTP.find({ phone }).sort({ createdAt: -1 }).limit(5);
        console.log("Found OTPs:", JSON.stringify(otps, null, 2));

        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
}, 3000);
