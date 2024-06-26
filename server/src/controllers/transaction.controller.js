const Transaction = require('../models/transaction.model');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/apiError');
const ApiResponse = require('../utils/apiResponse');
const crypto = require('crypto');
const razorpay = require('../utils/razorpay');
const User = require('../models/user.model');
const Bank = require('../models/bank.model');
const mongoose = require('mongoose');

const createDepositOrder = asyncHandler(async (req, res) => {
    //get the details and validate
    const { amount, currency } = req.body;
    if (!amount || isNaN(amount) || amount <= 0) {
        throw new ApiError(400, 'Invalid amount');
    }
    if (!currency) {
        throw new ApiError(400, 'Currency is required');
    }

    // Create an order in Razorpay
    const options = {
        amount: amount * 100, // Amount in the smallest currency unit
        currency,
        receipt: crypto.randomBytes(10).toString("hex"),
    };
    const razorpayRes = await razorpay.orders.create(options);

    console.log(razorpayRes); ///////////////////

    //send the response
    const orderDetails = {
        orderId: razorpayRes.id,
        amount: razorpayRes.amount,
        currency: razorpayRes.currency,
        receipt: razorpayRes.receipt
    }
    res.status(200).json(new ApiResponse(201, orderDetails, 'Payment Order created successfully'));
});

//this will be called after successful payment
const depositCallback = asyncHandler(async (req, res) => {
    //verify the payment
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(sign.toString())
        .digest("hex");
        console.log(expectedSign);

    if (razorpay_signature !== expectedSign) {
        throw new ApiError(401, 'Invalid razorpay signature');
    }

    //get the payment details
    const paymentDetails = await razorpay.payments.fetch(razorpay_payment_id);
    console.log(paymentDetails); ///////////////////////

    //create the transaction
    const deposit = await Transaction.create({
        user: req.user._id,
        type: 'deposit',
        amount: paymentDetails.amount, //might do amount*100 or amount/100
        status: 'completed'
    });
    
    //push the transaction in the user
    const updatedUser = await User.findByIdAndUpdate(req.user._id, {
        $inc: {
            wallet: paymentDetails.amount/100
        },
        $push: {
            transactions: deposit._id
        }
    });

    //return the response
    return res.status(200).json(new ApiResponse(
        201,
        deposit,
        'Deposit successful'
    ));
}); 

const depositErrorCallback = asyncHandler(async(req, res) => {
    //get error from request
    const { depositError } = req.body;
    if(!depositError) {
        throw new ApiError(400, 'Deposit Error not found');
    }
    console.log(depositError); ////////////////////////////////

    //create a failed deposit transaction
    const failedDeposit = await Transaction.create({
        user: req.user._id,
        type: 'deposit',
        amount: paymentDetails.amount, //might do amount*100 or amount/100
        status: 'failed'
    });
    
    //push the transaction into user
    const updatedUser = await User.findByIdAndUpdate(req.user._id, {
        $push: {
            transactions: failedDeposit._id
        }
    });

    //return the response (no need to return the error because it will come from razorpay API directly to client side)
    return res.status(200).json(new ApiResponse(
        201,
        failedDeposit,
        'Deposit failed'
    ));
});

//test withdraw controller for client side (until I figure out a solution for razorpay)
//deposit will work out in test mode as usual
const testWithdraw = asyncHandler(async (req, res) => {
    //get the details from request
    const { amount, bankId } = req.body;
    if(!amount || !bankId) {
        throw new ApiError(400, 'Bank id or amount not found');
    }

    //get the Bank
    const bank = await Bank.findById(bankId);
    if(!bank) {
        throw new ApiError(404, 'Bank not found');
    }

    //get the user
    const user = await User.findById(req.user._id);

    //validate if the bank is linked with the user
    if(!bank.user.equals(user._id)) {
        throw new ApiError(401, 'Bank not linked with the user');
    }

    //validate the amount
    if(amount > user.wallet) {
        throw new ApiError(400, 'Insufficient balance in user wallet');
    }

    //session is done so that creation of transaction and deduction from user wallet happens atomically
    const session = await mongoose.startSession();
    session.startTransaction();
    let withdrawal;
    try {
        //create the transaction
        withdrawal = await Transaction.create([{
            user: user._id,
            amount,
            type: 'withdrawal',
            status: 'completed'
        }], { session });
        //this time it would return an array because we passed an array

        //update user wallet and it's transactions
        user.wallet -= amount;
        user.transactions.push(withdrawal[0]._id);
        await user.save({ session });

        await session.commitTransaction();
        session.endSession();
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw new ApiError(500, 'Transaction failed', error);
    }

    return res.status(201).json(new ApiResponse(
        201,
        withdrawal[0],
        'Withdrawal completed successfully'
    ));
});

module.exports = { createDepositOrder, depositCallback, depositErrorCallback, testWithdraw }