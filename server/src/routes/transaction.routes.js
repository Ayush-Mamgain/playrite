const transactionRouter = require('express').Router();
const { createPaymentOrder, paymentCallback } = require('../controllers/transaction.controller');
const auth = require('../middlewares/auth.middleware');

transactionRouter.post('/createPaymentOrder', auth, createPaymentOrder);
transactionRouter.post('/paymentCallback', auth, paymentCallback);

module.exports = transactionRouter;