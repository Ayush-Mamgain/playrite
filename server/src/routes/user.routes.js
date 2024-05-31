const userRouter = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const { logoutUser, getAllBets, getBattleStatus, getUserInfo } = require('../controllers/user.controller');

userRouter.post('/logout', auth, logoutUser);
userRouter.get('/getAllBets', auth, getAllBets);
userRouter.get('/getBattleStatus/:battleId', auth, getBattleStatus);
userRouter.get('/getUserInfo', auth, getUserInfo);

module.exports = userRouter;