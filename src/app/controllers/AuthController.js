const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/User');

class AuthController {
  /**
   * @route  GET api/auth
   * @desc   Get user (test)
   * @access Private
   */
  async getLoggedInUser(req, res) {
    try {
      const user = await User.findById(req.user.id).select('-password');
      return res.json(user);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send('Server Error');
    }
  }

  /**
   * @route  POST api/auth
   * @desc   Authenticate user & get token
   * @access Public
   */
  async login(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email: email });

      if (!user) {
        return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }]});
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }]});
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        return res.json({ token });
      });
      
    } catch (error) {
      console.log(error.message);
      return res.status(500).send('Server error');
    }
  }
}

module.exports = new AuthController();