const User = require("../models/user.model");
const ApiError = require("../utils/apiError");
const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');

//AuthN --> to check whether the user is logged in or not because then only he would be able to access the user routes
const auth = asyncHandler(async (req, res, next) => {
    //get the token from user
    const token = req.cookies?.token || req.body?.token || req.header('Authorization')?.replace('Bearer ','');

    //validate the token
    if(!token)
        throw new ApiError(401, 'Token not found');

    //decode the token
    let decodedToken;
    try {
        decodedToken = await jwt.verify(token, process.env.TOKEN_SECRET);

    } catch(error) {
        console.error('Error in verifying token\n',error);
        throw new ApiError(401, 'Invalid Token', error);
    }

    //get the user from DB
    const user = await User.findById(decodedToken._id).select('-password');

    //verify the token
    if(!user) 
        throw new ApiError(401, 'User corresponding to token not found (Invalid)');

    //check if both tokens match
    if(user.token !== token)
        throw new ApiError(401, 'Token expired or already used');

    //append the user to the request object so that we can prevent furthur DB calls
    req.user = user;
    //call next MW
    next();
}); 

module.exports = auth;