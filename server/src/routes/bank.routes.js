const bankRouter = require('express').Router();
const auth = require('../middlewares/auth.middleware');

const { registerBank } = require('../controllers/bank.controller');

bankRouter.post('/registerBank', auth, registerBank);

module.exports = bankRouter;