const mongoose = require('../../configuration/mongoose_connection');

const clinicSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    ownerUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Clinic", clinicSchema);
