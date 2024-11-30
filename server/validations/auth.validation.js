const { body } = require('express-validator');

const register = [
  body('username')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long'),
  body('email')
    .isEmail()
    .withMessage('Must be a valid email address'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];

const login = [
  body('email')
    .isEmail()
    .withMessage('Must be a valid email address'),
  body('password')
    .exists()
    .withMessage('Password is required')
];

module.exports = {
  register,
  login
};