const battleRouter = require('express').Router();
const { createBattle, getBattleDetails, startBattle, finishBattle } = require('../controllers/battle.controller');
const auth = require('../middlewares/auth.middleware');

battleRouter.post('/createBattle', auth, createBattle);
battleRouter.get('/getBattleDetails/:battleId', auth, getBattleDetails);
battleRouter.patch('/startBattle', auth, startBattle);
battleRouter.patch('/finishBattle', auth, finishBattle);

module.exports = battleRouter;