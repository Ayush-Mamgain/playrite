const mongoose = require('mongoose');
const mailSender = require('../utils/nodemailer');

const otpSchema = new mongoose.Schema({
    otp: {
        type: String, //it can consist of characters
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        //this would be used for sorting the otp's
        type: Date,
        required: true,
        default: Date.now, //this might cause error?
        expires: 5*60*1000 //used to expire the OTP after 5 minutes
    }
});

otpSchema.pre('save', async function (next) {
    //send the verification email
    await mailSender(this.email, 'Email Verification', `${this.otp}`)
    .then(mailResponse => console.log('Email verification mail sent successfully:\n',mailResponse));
    next();
});

const Otp = mongoose.model('Otp', otpSchema);
module.exports = Otp;