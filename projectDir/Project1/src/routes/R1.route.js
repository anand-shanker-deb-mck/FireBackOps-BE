const express = require('express');
const R1Handler = require('../handlers/R1.handler.js');

const R1Router = express.Router();

R1Router.get('/', R1Handler.R1getHandler);

module.exports = {
  R1Router,
};
