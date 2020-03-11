const { validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/User');

class UserController {
  /**
   * @route  POST api/users
   * @desc   Create a new user
   * @access Public
   */
  async create(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ email: email });

      if (user) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }]});
      }

      // Get users gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });

      user = new User({
        name, email, avatar, password
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        }
      }

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

module.exports = new UserController();