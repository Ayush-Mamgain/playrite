const mongoose = require('mongoose');

const betSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    battle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Battle',
        required: true
    },
    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['active', 'settled'],
        default: 'active'
    },
    betAmount: {
        type: Number,
        required: true,
        min: 1
    },
    payout: {
        type: Number,
    }
}, { timestamps: true });

const Bet = mongoose.model('Bet', betSchema);
module.exports = Bet;