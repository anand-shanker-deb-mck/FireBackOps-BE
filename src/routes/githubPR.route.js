const express = require('express');
const { authenticateJwt } = require('../middlewares/auth.middleware');
const { githubPRHandler } = require('../handlers/githubPR.handler');
const { githubPRValidator } = require('../middlewares/githubPush.validator');

const router = express.Router();

router.post('', authenticateJwt, githubPRValidator, githubPRHandler);

module.exports = {
  router,
};
