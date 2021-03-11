const express = require('express');

const router = express.Router();

const { loginHandler, oauthLoginHandler } = require('../handlers/login.handler');
const { authenticateJwt } = require('../middlewares/auth.middleware');

router.post('', authenticateJwt, loginHandler);
router.get('/oauth-callback', oauthLoginHandler);

module.exports = {
  router,
};
