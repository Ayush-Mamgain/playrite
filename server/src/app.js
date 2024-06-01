const express = require('express');
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');

//create an instance of express server
const app = express();

//Just mount the middlewares here
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({
    limit: '16kb'
}));

app.use(express.urlencoded({
    limit: '16kb',
    extended: true
}));

app.use(express.static('public'));

app.use(cookieParser());

//setup default route
app.get('/', (req, res) => res.send('Welcome to Play rite'));

//mount API routes on the app
//otp routes
const otpRouter = require('./routes/otp.routes');
app.use('/api/otp',otpRouter);

//auth router
const authRouter = require('./routes/auth.routes');
app.use('/api/auth', authRouter);

//user router
const userRouter = require('./routes/user.routes');
app.use('/api/user',userRouter);

//battle router
const battleRouter = require('./routes/battle.routes');
app.use('/api/battle', battleRouter);

//bet router
const betRouter = require('./routes/bet.routes');
app.use('/api/bet', betRouter);

//user router
const bankRouter = require('./routes/bank.routes');
app.use('/api/bank', bankRouter);

//transaction router
const transactionRouter = require('./routes/transaction.routes');
app.use('/api/transaction', transactionRouter);

module.exports = app;