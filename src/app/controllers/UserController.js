const User = require('../models/user');

class UserController {
  test(req, res) {
    return res.send({ API: 'Users', endpoint: '/api/users' });
  }
}

module.exports = new UserController();