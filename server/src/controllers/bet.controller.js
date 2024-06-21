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

    //check if user has sufficient amount in it's wallet
    const better = await User.findById(req.user._id);
    if(better.wallet < betAmount) {
        throw new ApiError(400, 'Insufficient wallet amount');
    }

    // Place the bet (atomic operations should be considered)
    player.playerAmount += betAmount;
    await player.save();

    // Create a new bet for the user
    const bet = await Bet.create({
        user: better._id,
        battle: battle._id,
        player: player._id,
        betAmount
    });

    // Push the bet to the user and update it's wallet
    await User.findByIdAndUpdate(better._id, {
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
        bet,
        'Bet placed successfully'
    ));
});

const settleBet = asyncHandler(async (req, res) => {
    //get the details from req and validate
    const { betId } = req.body;
    if(!betId) {
        throw new ApiError(404, 'bet id not found');
    }

    //get the bet and validate
    const bet = await Bet.findById(betId).populate('battle');
    if(!bet) {
        throw new ApiError(404, 'Bet corresponding to ID not found');
    }

    //check if the battle is over
    if(bet.battle.status !== 'over') {
        throw new ApiError(400, 'Battle not over yet');
    }

    //check if the bet is already settled
    if(bet.status === 'settled') {
        throw new ApiError(400, 'Bet already settled');
    }

    //check if request comes from the stake holder
    if(!bet.user.equals(req.user._id)) {
        throw new ApiError(401, 'Bet does not exists in user account');
    }

    //update bet payout and status
    if(bet.battle.result === null) {
        bet.payout = bet.betAmount;
    } else if(bet.battle.result.equals(bet.player)) {
        bet.payout = 2*bet.betAmount;
    } else {
        bet.payout = 0;
    }
    bet.status = 'settled';
    await bet.save();

    //concurrency safe way
    // let payout;
    // if(bet.battle.result === null) {
    //     payout = bet.betAmount;
    // } else if(bet.battle.result.equals(bet.player)) {
    //     payout = 2*bet.betAmount;
    // } else {
    //     payout = 0;
    // }
    // await Bet.findByIdAndUpdate(bet._id, {
    //     payout,
    //     status: 'settled'
    // }, { new: true }, { runValidators: true});

    //update user wallet
    await User.findByIdAndUpdate(bet.user, {
        $inc: {
            wallet: bet.payout
        }
    }, { new: true, runValidators: true });
    
    //return successful response
    return res.status(200).json(new ApiResponse(
        204,
        bet,
        'Bet settled successfully',
    ));
});
module.exports = { placeBet, settleBet };