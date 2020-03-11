const { Router } = require('express');
const routes = new Router();

const validators = require('../config/validators');
const authMiddleware = require('./app/middlewares/auth');

const user = require('./app/controllers/UserController');
const post = require('./app/controllers/PostController');
const auth = require('./app/controllers/AuthController');
const profile = require('./app/controllers/ProfileController');

routes.get('/', (req, res) => res.send({ ok: true, api: 'v1' }));

routes.post('/users', validators.user_create, user.create);

routes.get('/posts/test', post.test);

routes.get('/auth', authMiddleware, auth.getUser);
routes.post('/auth', validators.auth_login, auth.login);

routes.post('/profile', [authMiddleware, validators.profile_create], profile.create);
routes.get('/profile', profile.all);
routes.get('/profile/me', authMiddleware, profile.userProfile);

module.exports = routes;