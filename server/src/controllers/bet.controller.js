const Battle = require('../models/battle.model');
const Bet = require('../models/bet.model');
const Player = require('../models/player.model');
const ApiResponse = require('../utils/apiResponse');
const ApiError = require('../utils/apiError');
const User = require('../models/user.model');
const asyncHandler = require('../utils/asyncHandler');

const placeBet = asyncHandler(async (req, res) => {
    // Get the details from request and validate
    const { battleId, playerId, betAmount } = req.body;
    if (!battleId || !playerId || !betAmount) {
        throw new ApiError(400, 'Battle ID, player ID, or bet amount not found');
    }

    // Validate the battle
    const battle = await Battle.findById(battleId).populate('players');
    if (!battle) {
        throw new ApiError(404, 'Battle corresponding to ID not found');
    }

    // Validate if the player is participating in that battle
    if (!battle.players.some(player => player.equals(playerId))) {
        throw new ApiError(400, 'Player not participating in this battle');
    }

    // Get the player
    const player = await Player.findById(playerId);
    if (!player) {
        throw new ApiError(404, 'Player not found');
    }

    // Validate the amount
    if(player.playerAmount + betAmount > battle.battleAmount || betAmount < 1) {
        throw new ApiError(400, 'Invalid bet amount, outside of range');
    }

    // Place the bet (atomic operations should be considered)
    player.playerAmount += betAmount;
    await player.save();

    // Create a new bet for the user
    const bet = await Bet.create({
        user: req.user._id,
        battle: battle._id,
        betAmount
    });

    // Push the bet to the user
    await User.findByIdAndUpdate(req.user._id, {
        $inc: {
            wallet: -betAmount
        },
        $push: {
            bets: bet._id
        }
    }, { new: true, runValidators: true });

    // Return successful response along with bet
    return res.status(201).json(new ApiResponse(
        201,
        'Bet placed successfully',
        bet
    ));
});


module.exports = { placeBet };