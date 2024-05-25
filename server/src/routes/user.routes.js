const userRouter = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const { logoutUser } = require('../controllers/user.controller');

userRouter.post('/logout', auth, logoutUser);

module.exports = userRouter;