const Battle = require('../models/battle.model');
const Player = require('../models/player.model');
const ApiError = require('../utils/apiError');
const ApiResponse = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');

const createBattle = asyncHandler(async (req, res, next) => {
    // Get the battle details from request
    const { players, battleAmount } = req.body; // array of players and battle amount

    // Validate
    if (!players || players.length < 2 || !battleAmount || battleAmount < 0) {
        throw new ApiError(400, 'Battle details incorrect or insufficient');
    }

    // Create the battle
    const createdBattle = await Battle.create({
        players: [],
        battleAmount,
        organiser: req.user._id
    });
    if (!createdBattle) {
        throw new ApiError(401, 'Error in creating new battle');
    }

    // Create the players
    for (const playerName of players) {
        const createdPlayer = await Player.create({
            playerName
        });
        if (!createdPlayer) {
            throw new ApiError(401, 'Error in creating player');
        }

        // Push the created player in the battle
        await Battle.findByIdAndUpdate(createdBattle._id, {
            $push: { players: createdPlayer._id }
        });
    }

    // Return success response along with player name
    return res.status(201).json(new ApiResponse(
        201,
        createdBattle,
        "Battle created successfully"
    ));
});

module.exports = { createBattle };
