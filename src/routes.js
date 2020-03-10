const { Router } = require('express');
const routes = new Router();

const user = require('./app/controllers/UserController');
const post = require('./app/controllers/PostController');
const auth = require('./app/controllers/AuthController');
const profile = require('./app/controllers/ProfileController');

routes.get('/', (req, res) => res.send({ ok: true, api: 'v1' }));

// ============= Public routes ================= //

/**
 * @route  GET api/users/test
 * @desc   Test route
 * @access Public
 */
routes.get('/users/test', user.test);

/**
 * @route  GET api/posts/test
 * @desc   Test route
 * @access Public
 */
routes.get('/posts/test', post.test);

/**
 * @route  GET api/auth/test
 * @desc   Test route
 * @access Public
 */
routes.get('/auth/test', auth.test);

/**
 * @route  GET api/profile/test
 * @desc   Test route
 * @access Public
 */
routes.get('/profile/test', profile.test);

// ============= Protected routes =============== //

module.exports = routes;