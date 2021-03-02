const express = require('express');

const router = express.Router();

const { loginHandler, oauthLoginHandler } = require('../handlers/login.handler');

router.post('', loginHandler);
router.get('/oauth-callback', oauthLoginHandler);

module.exports = {
  router,
};
