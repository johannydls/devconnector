
class AuthController {
  test(req, res) {
    return res.send({ API: 'Auth', endpoint: '/api/auth/test' });
  }
}

module.exports = new AuthController();