const express = require('express');

const router = express.Router();
const { githubPushHandler } = require('../handlers/githubPush.handler');

router.post('', githubPushHandler);

module.exports = {
  router,
};
