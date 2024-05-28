const battleRouter = require('express').Router();
const { createBattle } = require('../controllers/battle.controller');
const auth = require('../middlewares/auth.middleware');

battleRouter.post('/createBattle', createBattle);

module.exports = battleRouter;