const mongoose = require('../../configuration/mongoose_connection');

const otpSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false
    },
    phone: {
        type: String,
        required: true
    },
    otpCode: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    },
    attempts: {
        type: Number,
        default: 0
    },
    isUsed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model("OTP", otpSchema);
