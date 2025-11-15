const mongoose = require('../configuration/mongoose_connection');

const authProviderSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    providerType: {
        type: String,   // "password" | "otp" | "whatsapp" | "google"
        required: true
    },
    passwordHash: {
        type: String,   // only for password login
        required: false
    },
    lastUsedAt: {
        type: Date
    }
}, { timestamps: true });

module.exports = mongoose.model("AuthProvider", authProviderSchema);
