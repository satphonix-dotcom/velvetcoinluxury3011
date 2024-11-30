const { validationResult } = require('express-validator');
const httpStatus = require('http-status');
const { ApiError } = require('./errorHandler');

const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const extractedErrors = errors.array().map(err => ({
      field: err.param,
      message: err.msg
    }));

    throw new ApiError(httpStatus.BAD_REQUEST, 'Validation Error', extractedErrors);
  };
};

module.exports = validate;