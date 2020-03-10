const User = require('../models/user');
const { validationResult } = require('express-validator');
class UserController {
  /**
   * @route  POST api/users
   * @desc   Register user
   * @access Public
   */
  register(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    
    return res.send();
  }
}

module.exports = new UserController();