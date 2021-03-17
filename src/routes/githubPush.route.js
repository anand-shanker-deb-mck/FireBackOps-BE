const express = require('express');
const { githubPushValidator } = require('../middlewares/githubPush.validator');

const router = express.Router();
const { githubPushHandler } = require('../handlers/githubPush.handler');

router.post('', githubPushValidator, githubPushHandler);

module.exports = {
  router,
};
