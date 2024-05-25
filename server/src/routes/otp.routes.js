const otpRouter = require('express').Router();
const { sendOtp, verifyOtp } = require('../controllers/otp.controller');

otpRouter.post('/sendOtp', sendOtp);
otpRouter.post('/verifyOtp', verifyOtp);

module.exports = otpRouter;