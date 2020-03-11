const { check } = require('express-validator');

module.exports = {
  user_create: [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Include a valid email').isEmail(),
    check('password', 'Please, enter a password with 6 or more characters').isLength({ min: 6 })
  ],
  auth_login: [
    check('email', 'Include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  profile_create: [
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Skills is required').not().isEmpty()
  ]
};