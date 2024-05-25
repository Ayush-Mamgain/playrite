const User = require('../models/user.model');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/apiError');
const ApiResponse = require('../utils/apiResponse');

const registerUser = asyncHandler(async (req, res) => {
    // Get the user details from the request
    const { email, username, password, confirmPassword } = req.body;

    // Validate the details
    if ([username, email, password].some(field => !field || field.trim() === '')) {
        throw new ApiError(400, 'All fields are required');
    }

    // Validate email format (simple regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new ApiError(400, 'Invalid email format');
    }

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

module.exports = { registerUser, loginUser, logoutUser };
