const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const hashPassword = require('../utils/hashPassword');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true,
        lowercase: true
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true,
        maxLength: 10
    },
    wallet: {
        type: Number,
        default: 0,
        required: true
    },
    banks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Bank'
        }
    ],
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        required: true
    },
    token: {
        type: String
    },
    transactions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Transaction'
        }
    ],
    bets: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Bet'
        }
    ]
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    //function to hash and save password when user registers for the first time or when he/she changes the password
    if(this.isModified('password')) {
        try {
            this.password = await hashPassword(this.password);
        } catch(error) {
            console.error('Error in hashing password:\n',error);
            throw error;
        }
    }
    next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
} //this method will be used when user logs in!

userSchema.methods.generateToken = function() {
    console.log('Printing user id and email');
    console.log(this._id);
    console.log(this.email);
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
        }, 
        process.env.TOKEN_SECRET, 
        {
            expiresIn: process.env.TOKEN_EXPIRY
        }
    );
}

const User = mongoose.model('User', userSchema);
module.exports = User;