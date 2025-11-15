const mongoose = require('../configuration/mongoose_connection');

const userSchema = mongoose.Schema({
    phone: {
        type: String,
        required: false,
        unique: false
    },
    email: {
        type: String,
        required: false,
        unique: false
    },
    passwordHash: {
        type: String,
        required: false
    },
    isPhoneVerified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
