const express = require('express');

const router = express.Router();

const { generateCodeHandler } = require('../handlers/generate.handler');

router.get('', generateCodeHandler);

module.exports = {
  router,
};
