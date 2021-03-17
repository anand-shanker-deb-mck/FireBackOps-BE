const express = require('express');

const router = express.Router();

const { oauthLoginHandler } = require('../handlers/login.handler');

router.post('', oauthLoginHandler);

module.exports = {
  router,
};
