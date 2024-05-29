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
    return res.status(200).json(new ApiResponse(
        201,
        createdBattle,
        "Battle created successfully"
    ));
});

const getBattleDetails = asyncHandler(async (req, res) => {
    //get the battle id from the request
    // const { battleId } = req.body;
    const { battleId } = req.params;

    //validate
    if (!battleId) {
        throw new ApiError(400, "Battle id not found");
    }

    //get the battle details
    const battle = await Battle.findById(battleId).populate('players');
    if (!battle) {
        throw new ApiError(400, 'Battle corresponding to ID not found');
    }

    //return the response with battle data
    return res.status(200).json(new ApiResponse(
        200,
        battle,
        'Battle details fetched successfully'
    ));
});

const startBattle = asyncHandler(async (req, res) => {
    // Get the battle id from req.body and validate
    const { battleId } = req.body;
    if (!battleId) {
        throw new ApiError(400, 'Battle id not found in request');
    }

    // Get the battle and validate
    const battle = await Battle.findById(battleId).populate('players');
    if (!battle) {
        throw new ApiError(404, 'Battle corresponding to id not found');
    }

    // Verify if the organiser made the request
    if (!req.user || !req.user._id.equals(battle.organiser)) {
        throw new ApiError(403, 'Battle organiser does not match');
    }

    // Verify if sufficient funds have been collected
    if (!battle.players || battle.players.length === 0) {
        throw new ApiError(400, 'No players found in the battle');
    }
    for (let player of battle.players) {
        if (player.playerAmount !== battle.battleAmount) {
            throw new ApiError(400, 'Sufficient amount not collected so far');
        }
    }

    //check if battle is already started or over
    if (battle.status !== 'inactive') {
        throw new ApiError(400, 'battle already started or over');
    }

    // Start the battle i.e. update battle status
    battle.status = 'active';
    await battle.save();

    // Return successful response
    return res.status(200).json(new ApiResponse(
        204,
        'Battle created successfully'
    ));
});

const finishBattle = asyncHandler(async (req, res) => {
    //get details from req and validate
    const { result, battleId } = req.body;
    if (!battleId) {
        throw new ApiError(400, 'Battle id not found in request');
    }

    //get the battle and validate
    const battle = await Battle.findById(battleId);
    if (!battle) {
        throw new ApiError(400, 'Battle corresponding to the ID does not exist');
    }

    // Verify if the organiser made the request
    if (!req.user || !req.user._id.equals(battle.organiser)) {
        throw new ApiError(403, 'Battle organiser does not match');
    }

    //check if the battle has been started or not or already over
    if (battle.status !== 'active') {
        throw new ApiError(400, 'Battle not started or already over');
    }

    //update the battle
    battle.status = 'over';
    battle.result = result;
    await battle.save();

    //return the response
    return res.status(200).json(new ApiResponse(
        204,
        'Battle finished successfully'
    ));
});

module.exports = { createBattle, getBattleDetails, startBattle, finishBattle };