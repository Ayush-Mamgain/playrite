const mongoose = require('mongoose');

const battleSchema = new mongoose.Schema({
    players: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Player'
        }
    ],
    battleAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['inactive', 'active', 'over'],
        required: true,
        default: 'inactive'
    },
    result: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        default: null
    }
}, { timestamps: true });

const Battle = mongoose.model('Battle', battleSchema);
module.exports = Battle;