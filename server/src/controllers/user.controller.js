const User = require('../models/user.model');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/apiError');
const ApiResponse = require('../utils/apiResponse');
const Bet = require('../models/bet.model');

const registerUser = asyncHandler(async (req, res) => {
    // Get the user details from the request
    const { email, username, password, confirmPassword } = req.body;

    // Validate the details
    if ([username, email, password].some(field => !field || field.trim() === '')) {
        throw new ApiError(400, 'All fields are required');
    }

    // Email format can be verified using regex
    
    // Check if user already exists
    if (await User.findOne({ email })) {
        throw new ApiError(409, 'User already exists');
    }

    // Match the passwords (can be done in frontend, but it's good to double-check on the server side)
    if (password !== confirmPassword) {
        throw new ApiError(400, 'Passwords do not match');
    }

    // Create the user (hashing of password done by pre hook)
    const user = await User.create({
        username,
        email,
        password
    });

    // Fetch the created user (to exclude the password)
    const createdUser = await User.findById(user._id).select('-password');

    return res.status(201).json(
        new ApiResponse(201, createdUser, 'User registered successfully'),
    );
});

const loginUser = asyncHandler(async (req, res) => {
    // Get the details from the user
    const { email, password, rememberMe } = req.body;

    // Validate
    if (!email || !password) {
        throw new ApiError(400, 'All fields are required');
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(401, 'User not registered');
    }

    // Compare the passwords
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(401, 'Incorrect password');
    }

    // Generate token and update it in user
    const token = user.generateToken();
    user.token = token;
    await user.save();

    // Get the final user document to return in the response
    const loggedInUser = await User.findById(user._id).select('-password');

    // Return response with the cookie tokens
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' // Ensure secure cookies in production
    };

    return res.status(200)
        .cookie('token', token, cookieOptions)
        .json(new ApiResponse(200, {
            user: loggedInUser,
            token
        }, 'User logged in successfully'));
});

const logoutUser = asyncHandler(async (req, res) => {
    // Logging out involves deleting the token from the database and clearing the auth cookies
    await User.findByIdAndUpdate(req.user._id, { token: null }, { new: true });

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' // Ensure secure cookies in production
    };

    return res.status(200)
        .clearCookie('token', cookieOptions)
        .json(new ApiResponse(200, {}, 'User logged out successfully'));
});

const getAllBets = asyncHandler(async (req,res) => {
    //get the user id and validate
    const userId = req.user._id;
    if(!userId) {
        throw new ApiError(404, 'User id not found');
    }

    //get the user from DB and validate
    const user = await User.findById(userId);
    if(!user) {
        throw new ApiError(404, 'User corresponding top ID not found');
    }

    //retreive all the bets of user with proper population and validate
    const userBets = await Bet.find({
        _id: { $in: user.bets }
    }).populate({
        path: 'battle',
        populate: {
            path: 'players'
        }
    }).populate('player');
    //another optimal method: Promise.all --> concurrent fetching
    if(userBets.length === 0) {
        throw new ApiError(404, 'No bets found');
    }

    //return response
    return res.status(200).json(new ApiResponse(
        200,
        userBets,
        'All bets of user fetched successfully'
    ));
});

module.exports = { registerUser, loginUser, logoutUser, getAllBets };
