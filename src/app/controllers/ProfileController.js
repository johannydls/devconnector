const { validationResult } = require('express-validator');
const request = require('request');
const config = require('config');

const Profile = require('../models/Profile');
const User = require('../models/User');

class ProfileController {

  /**
   * @route  POST api/profile
   * @desc   Create or update user profile
   * @access Private
   */
  async create(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company, website, location, bio, status, github_username, skills,
      youtube, facebook, twitter, instagram, linkedin
    } = req.body;

    // Build profile object
    const profileFields = {};

    profileFields.user = req.user.id;

    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (github_username) profileFields.github_username = github_username;
    if (skills) {
      profileFields.skills = skills.split(',').map(skill => skill.trim());
    }
    
    // Build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        // Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      profile = new Profile(profileFields);

      await profile.save();

      return res.json(profile);

    } catch (error) {
      console.log(error.message);
      return res.status(500).send('Server error');
    }
  }

  /**
   * @route  GET api/profile
   * @desc   Get all profiles
   * @access Public
   */
  async getAll(req, res) {
    try {
      const profiles = await Profile.find().populate('user', ['name', 'avatar']);
      return res.json(profiles);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send('Server Error');
    }
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

  /**
   * @route  GET api/profile/u/:user_id
   * @desc   Get current user's profile (test)
   * @access Private
   */
  async getProfile(req, res) {
    try {
      const profile = await Profile.findOne({ user: req.params.user_id })
            .populate('user', ['name', 'avatar']);

      if (!profile) {
        return res.status(400).json({ msg: 'Profile not found' });
      }

      return res.send(profile);
    } catch (error) {
      if (error.kind && error.kind === 'ObjectId') {
        return res.status(400).json({ msg: 'Profile not found' });
      }
      console.error(error.message);
      return res.status(500).send('Server Error');
    }
  }

  /**
   * @route  DELETE api/profile
   * @desc   Delete profile, user and posts
   * @access Private
   */
  async deleteLoggedProfile(req, res) {
    try {
      // @todo - Remove user's posts

      //Remove profile
      await Profile.findOneAndRemove({ user: req.user.id });

      //Remove user
      await User.findOneAndRemove({ _id: req.user.id });

      return res.json({ msg: 'User deleted' });
    } catch (error) {
      console.error(error.message);
      return res.status(500).send('Server Error');
    }
  }

   /**
   * @route  PUT api/profile/experience
   * @desc   Add profile experience
   * @access Private
   */
  async addProfileExperience(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, company, location, from, to, current, description } = req.body;

    const newExp = {
      title, company, location, from, to, current, description
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExp);
      await profile.save();

      return res.json(profile);

    } catch (error) {
      console.error(error.message);
      return res.status(500).send('Server Error');
    }
  }

  /**
   * @route  DELETE api/profile/experience/:exp_id
   * @desc   Delete experience from profile
   * @access Private
   */
  async deleteProfileExperience(req, res) {
    try {
      const profile = await Profile.findOne({ user: req.user.id });

      // Get remove index
      const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);

      profile.experience.splice(removeIndex, 1);

      await profile.save();

      return res.json(profile);

    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ msg: 'Server Error', errMsg: error.message });
    }
  }

  /**
   * @route  PUT api/profile/education
   * @desc   Add profile education
   * @access Private
   */
  async addProfileEducation(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { school, degree, study_field, from, to, current, description } = req.body;

    const newEducation = {
      school, degree, study_field, from, to, current, description
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newEducation);
      await profile.save();

      return res.json(profile);

    } catch (error) {
      console.error(error.message);
      return res.status(500).send('Server Error');
    }
  }

  /**
   * @route  DELETE api/profile/education/:education_id
   * @desc   Delete education from profile
   * @access Private
   */
  async deleteProfileEducation(req, res) {
    try {
      const profile = await Profile.findOne({ user: req.user.id });

      // Get remove index
      const removeIndex = profile.education.map(item => item.id).indexOf(req.params.education_id);

      profile.education.splice(removeIndex, 1);

      await profile.save();

      return res.json(profile);

    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ msg: 'Server Error', errMsg: error.message });
    }
  }

  /**
   * @route  GET api/profile/github/:username
   * @desc   Get user repos from Github
   * @access Public
   */
  getGithubRepos(req, res) {
    try {
      const options = {
        uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('github_client_id')}&client_secret=${config.get('github_client_secret')}`,
        method: 'GET',
        headers: { 'user-agent': 'node.js' }
      }

      request(options, (error, response, body) => {
        if (error) console.error(error);
        if (response.statusCode !== 200) {
          return res.status(404).json({ msg: 'No Github profile found' });
        }
        return res.json(JSON.parse(body));
      });

    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ msg: 'Server Error', errMsg: error.message });
    }
  }
}

module.exports = new ProfileController();