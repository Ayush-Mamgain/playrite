const transactionRouter = require('express').Router();
const { createDepositOrder, depositCallback, depositErrorCallback, testWithdraw } = require('../controllers/transaction.controller');
const auth = require('../middlewares/auth.middleware');

transactionRouter.post('/createDepositOrder', auth, createDepositOrder);
transactionRouter.post('/depositCallback', auth, depositCallback);
transactionRouter.post('/depositErrorCallback', auth, depositErrorCallback);
transactionRouter.post('/testWithdraw', auth, testWithdraw);

module.exports = transactionRouter;