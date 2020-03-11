const Profile = require('../models/Profile');
const User = require('../models/User');

class ProfileController {

  /**
   * @route  GET api/profile
   * @desc   Get all profiles
   * @access Private
   */
  all(req, res) {
    return res.send({ API: 'Profile', endpoint: '/api/profile/test' });
  }

  /**
   * @route  GET api/profile/me
   * @desc   Get current user's profile (test)
   * @access Private
   */
  async userProfile(req, res) {
    try {
      const profile = await Profile.findOne({ user: req.user.id })
            .populate('user', ['name', 'avatar']);
      
      if (!profile) {
        return res.status(400).json({ msg: 'There is no profile for this user' });
      }

      return res.send(profile);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send('Server Error');
    }
  }
}

module.exports = new ProfileController();