const mongoose = require('../configuration/mongoose_connection');

const sessionSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    deviceInfo: {
        type: String
    },
    ipAddress: {
        type: String
    },
    refreshTokenHash: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    },
    isRevoked: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model("Session", sessionSchema);
