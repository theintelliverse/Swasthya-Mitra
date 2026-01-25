require("dotenv").config();
const mongoose = require("./configuration/mongoose_connection");
const User = require("./models/users/Usermodel");
const OTP = require("./models/users/OTPmodel");

console.log("Starting debug check...");

setTimeout(async () => {
    try {
        console.log("Checking MongoDB connection state:", mongoose.connection.readyState);
        // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting

        if (mongoose.connection.readyState !== 1) {
            console.error("MongoDB not connected yet. Waiting...");
        }

        const testPhone = "1234567890";
        console.log("Attempting to find user with phone:", testPhone);
        const user = await User.findOne({ phone: testPhone });
        console.log("User query result:", user);

        console.log("Attempting to create OTP dummy...");
        // Just dry run or validate model
        console.log("OTP Model loaded:", !!OTP);

        console.log("Debug check complete. No crash!");
        process.exit(0);
    } catch (error) {
        console.error("Debug check failed with error:", error);
        process.exit(1);
    }
}, 3000); // Wait 3s for connection
