const userRouter = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const { logoutUser, getAllBets, getBattleStatus, getUserInfo, getAllTransactions, getUserStatus, getAllBanks, getUserStats, getAllBattles } = require('../controllers/user.controller');

userRouter.post('/logout', auth, logoutUser);
userRouter.get('/getAllBets', auth, getAllBets);
userRouter.get('/getBattleStatus/:battleId', auth, getBattleStatus);
userRouter.get('/getUserInfo', auth, getUserInfo);
userRouter.get('/getAllTransactions', auth, getAllTransactions);
userRouter.get('/getUserStatus', getUserStatus);
userRouter.get('/getUserStats', auth, getUserStats);
userRouter.get('/getAllBattles', auth, getAllBattles);
// userRouter.get('/getAllBanks', auth, getAllBanks);

module.exports = userRouter;