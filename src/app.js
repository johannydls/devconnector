const express = require('express');
const routes = require('./routes.js');

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json({ extended: false }));
  }

  routes() {
    this.server.use('/api', routes);
  }
}

module.exports = new App().server;