const express = require('express');
const { githubHandler } = require('../handlers/github.handler');

const router = express.Router();
router.post('', githubHandler);

module.exports = {
  router,
};
