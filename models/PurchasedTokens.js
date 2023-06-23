const mongoose = require("mongoose");

const tokensSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true,
        maxLength: 8
    },
    tokenStatus: {
        type: String,
        enum: ['USED', 'NEW', 'EXPIRED'],
        required: true
    },
    tokenValueDays: {
        type: Number,
        maxLength: 11
    },
    amount: {
        type: Number,
        maxLength: 11
    },
    meterNumber: {
        type: String,
        required: true,
        maxLength: 6
    },
}, { timestamps: true });

const PurchasedTokens = mongoose.model("purchased_tokens", tokensSchema);
module.exports = PurchasedTokens;