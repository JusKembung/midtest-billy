const express = require('express');

const authenticationMiddleware = require('../../middlewares/authentication-middleware');
const celebrate = require('../../../core/celebrate-wrappers');
const transactionsControllers = require('./transaction-controller');
const transactionsValidator = require('./transaction-validator');

const route = express.Router();

module.exports = (app) => {
  app.use('/transactions', route);

  // Get list of transactions
  route.get('/', authenticationMiddleware, transactionsControllers.getTransaction);

  // Create transaction
  route.post(
    '/',
    authenticationMiddleware,
    celebrate(transactionsValidator.createTransaction),
    transactionsControllers.createTransaction
  );

  // Get transaction detail
  route.get('/transactions/:Id', authenticationMiddleware, transactionsControllers.getTransaction);

  // Update transaction
  route.put(
    '/:id',
    authenticationMiddleware,
    celebrate(transactionsValidator.updateTransaction),
    transactionsControllers.updateTransaction
  );

  // Delete transaction
  route.delete('/:id', authenticationMiddleware, transactionsControllers.deleteTransaction);
};