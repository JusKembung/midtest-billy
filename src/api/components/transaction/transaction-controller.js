const transactionsService = require('./transaction-service');
const { errorResponder, errorTypes } = require('../../../core/errors');
const { transaction } = require('../../../models');
/**
 * Handle create transaction request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function createTransaction(request, response, next) {
  try {
    const userId = request.body.userId;
    const amount = request.body.amount;
    const description = request.body.description;

    const success = await transactionsService.createTransaction(userId, amount, description);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to create transaction'
      );
    }

    return response.status(200).json({ userId, amount, description });
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle get transaction detail request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function getTransaction(request, response, next) {
  try {
    const transactionId = request.params.transactionId;
    const transaction = await transactionsService.getTransaction(transactionId);

    if (!transaction) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Unknown transaction');
    }

    return response.status(200).json(transaction);
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle update transaction request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function updateTransaction(request, response, next) {
  try {
    const transactionId = request.params.transactionId;
    const amount = request.body.amount;
    const description = request.body.description;

    const success = await transactionsService.updateTransaction(transactionId, amount, description);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to update transaction'
      );
    }

    return response.status(200).json({ transactionId });
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle delete transaction request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function deleteTransaction(request, response, next) {
  try {
    const transactionId = request.params.transactionId;

    const success = await transactionsService.deleteTransaction(transactionId);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to delete transaction'
      );
    }

    return response.status(200).json({ transactionId });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  createTransaction,
  getTransaction,
  updateTransaction,
  deleteTransaction,
};