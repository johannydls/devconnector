const { Router } = require('express');
const routes = new Router();

const validators = require('../config/validators');
const authMiddleware = require('./app/middlewares/auth');

const user = require('./app/controllers/UserController');
const post = require('./app/controllers/PostController');
const auth = require('./app/controllers/AuthController');
const profile = require('./app/controllers/ProfileController');

routes.get('/', (req, res) => res.send({ ok: true, api: 'v1' }));

// ------------------------------ Auth and User's routes ------------------------------ //
routes.post('/users', validators.user_create, user.create);
routes.get('/auth', authMiddleware, auth.getLoggedInUser);
routes.post('/auth', validators.auth_login, auth.login);

// --------------------------------- Profile's routes --------------------------------- //
routes.post('/profile', [authMiddleware, validators.profile_create], profile.create);
routes.get('/profile', profile.getAll);
routes.get('/profile/me', authMiddleware, profile.userProfile);
routes.get('/profile/u/:user_id', profile.getProfile);
routes.delete('/profile', authMiddleware, profile.deleteLoggedProfile);

routes.put('/profile/experience', [authMiddleware, validators.profile_experience], profile.addProfileExperience)
routes.delete('/profile/experience/:exp_id', authMiddleware, profile.deleteProfileExperience);

routes.put('/profile/education', [authMiddleware, validators.profile_education], profile.addProfileEducation);
routes.delete('/profile/education/:education_id', authMiddleware, profile.deleteProfileEducation);

routes.get('/profile/github/:username', profile.getGithubRepos);

// --------------------------------- Post's routes --------------------------------- //
routes.post('/posts', [ authMiddleware, validators.post_create ], post.create);
routes.get('/posts', authMiddleware, post.getAll);
routes.get('/posts/:id', authMiddleware, post.getPost);
routes.delete('/posts/:id', authMiddleware, post.deletePost);

module.exports = routes;