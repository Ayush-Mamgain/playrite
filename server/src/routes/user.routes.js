const userRouter = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const { logoutUser, getAllBets } = require('../controllers/user.controller');

userRouter.post('/logout', auth, logoutUser);
userRouter.get('/getAllBets', auth, getAllBets);

module.exports = userRouter;