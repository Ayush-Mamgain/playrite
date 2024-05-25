const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    type: {
        type: String,
        required: true,
        enum: ['deposit', 'withdrawal']
    },
    amount: {
        type: Number,
        required: true,
        min: 100
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        required: true,
        default: 'pending'
    },
}, { timestamps: true });

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;