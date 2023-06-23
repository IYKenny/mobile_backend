const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    fullName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 255
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    meterNumber: {
        type: String,
        required: true,
        maxLength: 6,
        unique: 6
    },
    district: {
        type: String,
        required: true
    },
    sector: {
        type: String,
        required: true
    },
    cell: {
        type: String,
        required: true
    },
    village: {
        type: String,
        required: true
    },
}, { timestamps: true });

const User = mongoose.model("users", usersSchema);
module.exports = User;