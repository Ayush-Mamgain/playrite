const betRouter = require('express').Router();
const { placeBet, settleBet } = require('../controllers/bet.controller');
const auth = require('../middlewares/auth.middleware');

betRouter.post('/placeBet', auth, placeBet);
betRouter.patch('/settleBet', auth, settleBet);

module.exports = betRouter;