const { Router } = require('express');
const routes = new Router();

routes.get('/', (req, res) => res.send({ ok: true, api: 'v1' }));

module.exports = routes;