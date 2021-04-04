const express = require('express');
const { githubPushValidator } = require('../middlewares/githubPush.validator');
const { authenticateJwt } = require('../middlewares/auth.middleware');
const { githubPushHandler } = require('../handlers/githubPush.handler');

const router = express.Router();

router.post('', authenticateJwt, githubPushValidator, githubPushHandler);

module.exports = {
  router,
};
