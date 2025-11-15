const mongoose = require('../configuration/mongoose_connection');

const userProfileSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: false
    },
    gender: {
        type: String,
        required: false
    },
    patientType: {
        type: String,     // "patient" | "doctor" | "staff" | "admin"
        required: true
    },
    specialization: {
        type: String
    },
    licenseNumber: {
        type: String
    },
    experienceYears: {
        type: Number
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model("UserProfile", userProfileSchema);
