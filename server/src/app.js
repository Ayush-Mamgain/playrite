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

module.exports = app;