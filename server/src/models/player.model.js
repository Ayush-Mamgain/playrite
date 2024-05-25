const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    playerName: {
        type: String,
        required: true,
        trim: true
    },
    playerAmount: {
        type: Number,
        required: true,
        default: 0
    }
}, { timestamps: true });

const Player = mongoose.model('Player', playerSchema);
module.exports = Player;