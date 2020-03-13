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
  ],
  profile_experience: [
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty()
  ],
  profile_education: [
    check('school', 'Scool is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('study_field', 'Study field is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty()
  ],
  post_create: [
    check('text', 'Text is required').not().isEmpty(),
  ]
};