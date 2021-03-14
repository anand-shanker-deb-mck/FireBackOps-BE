const express = require('express');
const { githubPushValidator } = require('../middlewares/githubPush.validator');
const { authenticateJwt } = require('../middlewares/auth.middleware');

const router = express.Router();
const { githubPushHandler } = require('../handlers/githubPush.handler');

router.post('', githubPushValidator, authenticateJwt, githubPushHandler);

module.exports = {
  router,
};
