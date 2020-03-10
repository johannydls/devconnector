const { check } = require('express-validator');

module.exports = {
  registerUser: [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Include a valid email').isEmail(),
    check('password', 'Please, enter a password with 6 or more characters').isLength({ min: 6 })
  ],
};