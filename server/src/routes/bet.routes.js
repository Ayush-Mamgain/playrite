const betRouter = require('express').Router();
const { placeBet } = require('../controllers/bet.controller');
const auth = require('../middlewares/auth.middleware');

betRouter.post('/placeBet', auth, placeBet);

module.exports = betRouter;