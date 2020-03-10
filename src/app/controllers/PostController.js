class PostController {
  test(req, res) {
    return res.send({ API: 'Posts', endpoint: '/api/posts/test' });
  }
}

module.exports = new PostController();