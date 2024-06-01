const transactionRouter = require('express').Router();
const { createDepositOrder, depositCallback, depositErrorCallback } = require('../controllers/transaction.controller');
const auth = require('../middlewares/auth.middleware');

transactionRouter.post('/createDepositOrder', auth, createDepositOrder);
transactionRouter.post('/depositCallback', auth, depositCallback);
transactionRouter.post('/depositErrorCallback', auth, depositErrorCallback);

module.exports = transactionRouter;