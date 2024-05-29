const battleRouter = require('express').Router();
const { createBattle } = require('../controllers/battle.controller');
const auth = require('../middlewares/auth.middleware');

battleRouter.post('/createBattle', auth, createBattle);

module.exports = battleRouter;