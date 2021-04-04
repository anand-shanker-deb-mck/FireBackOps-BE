const express = require('express');
const R2Handler = require('../handlers/R2.handler.js');

const R2Router = express.Router();

R2Router.post('/R2', R2Handler.R2postHandler);
module.exports = {
  R2Router,
  };
  