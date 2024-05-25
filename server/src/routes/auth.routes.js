const authRouter = require('express').Router();
const { registerUser, loginUser } = require('../controllers/user.controller');

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);

module.exports = authRouter;