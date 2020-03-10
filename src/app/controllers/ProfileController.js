
class ProfileController {
  test(req, res) {
    return res.send({ API: 'Profile', endpoint: '/api/profile/test' });
  }
}

module.exports = new ProfileController();