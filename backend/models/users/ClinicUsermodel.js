const mongoose = require('../../configuration/mongoose_connection');

const clinicUserSchema = mongoose.Schema({
    clinicId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clinic",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    role: {
        type: String,     // "patient" | "doctor" | "staff" | "admin"
        required: true
    },
    permissions: {
        type: [String],
        default: []
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model("ClinicUser", clinicUserSchema);
