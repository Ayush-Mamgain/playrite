const mongoose = require('mongoose');

const bankSchema = new mongoose.Schema({
    accountNumber: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    ifscCode: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

const Bank = mongoose.model('Bank', bankSchema);
module.exports = Bank;