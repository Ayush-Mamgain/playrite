const Bank = require('../models/bank.model');
const User = require('../models/user.model');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const ApiError = require('../utils/apiError');

const registerBank = asyncHandler(async (req, res) => {
    //get details from req.
    const { bankName, accountNumber, ifscCode } = req.body;
    if(!accountNumber || !ifscCode) {
        throw new ApiError(400, 'Account Number or IFSC code not found');
    }

    //validate if the bank already exists
    const oldBank = await Bank.findOne({ accountNumber, ifscCode });
    if(oldBank) {
        throw new ApiError(400, 'Bank already exists');
    }

    //create the bank
    const bank = await Bank.create({
        user: req.user._id,
        bankName,
        accountNumber,
        ifscCode
    });

    //link it with the user
    await User.findByIdAndUpdate(req.user._id, {
        $push: {
            banks: bank._id
        }
    }, { new: true, runValidators: true });

    //return response
    return res.status(200).json(new ApiResponse(
        201,
        bank,
        'Bank registered successfully'
    ));
});

module.exports = { registerBank };